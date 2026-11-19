#!/usr/bin/env python3
"""Harvest the official CSCA portal (csca.cn) through the `api-anything` operations.

The portal is a Vue SPA over an unauthenticated JSON API under /sv/open/. Three
operations were learned once with the api-anything plugin (site `csca`):

  announcements(xxlx)  GET  /sv/open/getGGXX?xxlx=...        article list by category
  resource(zydm)       POST /sv/open/zyxx/list {zydm}        one policy/notice document
  config(confCode)     GET  /sv/open/getConfByCode?confCode= one config blob (SY_KSRQ = sittings)

This script only *calls* those operations and writes the answers to research/raw/csca/.
Oversized answers are reassembled from api-anything's local result fragments, so the
whole document is recovered without a second request to the site.

Usage:  python3 research/scripts/harvest_csca.py [--dry]
"""

from __future__ import annotations

import json
import pathlib
import subprocess
import sys
import datetime as dt

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "raw" / "csca"
SITE = "csca"
MAX = "200000"

ANNOUNCEMENT_TYPES = ["考试公告", "新闻页面", "滚动通知", "院校风采"]

RESOURCE_CODES = {
    # 关于考试 · 备考资源 (syllabus + sample PDFs)
    "GYKS_BKZY": "about-exam-prep-resources",
    # 考生须知 · 居家网考 (RHT)
    "GYKS_KSXZ_JJWK_BMXZ": "rht-registration-notice",
    "GYKS_KSXZ_JJWK_CJWT": "rht-faq-common-questions",
    "GYKS_KSXZ_JJWK_CJYBG": "rht-score-report",
    "GYKS_KSXZ_JJWK_KSGZ": "rht-test-rules",
    "GYKS_KSXZ_JJWK_KSHJ": "rht-test-environment",
    "GYKS_KSXZ_JJWK_KSJJ": "rht-test-introduction",
    "GYKS_KSXZ_JJWK_KSRLC": "rht-candidate-workflow",
    "GYKS_KSXZ_JJWK_SBYWL": "rht-device-and-network",
    # 考生须知 · 集中机考 (CBT)
    "GYKS_KSXZ_JZJK_BMXZ": "cbt-registration-notice",
    "GYKS_KSXZ_JZJK_CJWT": "cbt-faq-common-questions",
    "GYKS_KSXZ_JZJK_CJYBG": "cbt-score-report",
    "GYKS_KSXZ_JZJK_KSGZ": "cbt-test-rules",
    "GYKS_KSXZ_JZJK_KSJJ": "cbt-test-introduction",
    "GYKS_KSXZ_JZJK_KSRLC": "cbt-candidate-workflow",
    "GYKS_KSXZ_JZJK_TSKSAP": "cbt-special-arrangements",
    # 考生须知 · 纸笔考试 (paper)
    "GYKS_KSXZ_ZBKS_KSJJ": "paper-test-introduction",
    # 平台条款
    "KSBM_YHXY": "platform-terms-of-use",
    "KSBM_YSTK": "platform-privacy-guidelines",
}

CONFIG_CODES = {"SY_KSRQ": "exam-sittings"}


def run(args: list[str]) -> dict:
    proc = subprocess.run(args, capture_output=True, text=True, timeout=240)
    out = proc.stdout.strip()
    if not out:
        raise RuntimeError(f"{' '.join(args)}: no output; stderr={proc.stderr[:400]}")
    return json.loads(out)


def call_full(op: str, args: dict[str, str]) -> tuple[object, int]:
    """Call an op and return (data, fragmentCount), reassembling cut answers."""
    cmd = ["api-anything", "call", SITE, op, *[f"{k}={v}" for k, v in args.items()], "--max-chars", MAX]
    answer = run(cmd)
    if not answer.get("ok"):
        raise RuntimeError(f"{op}({args}) failed: {answer}")
    if not answer.get("truncated"):
        return answer.get("data"), 1

    rid = answer["resultId"]
    parts: list[str] = []
    offset = 0
    for _ in range(50):
        frag = run([
            "api-anything", "result", rid, "--format", "json",
            "--offset", str(offset), "--max-chars", MAX,
        ])
        parts.append(frag.get("data") or "")
        if "more" not in frag:
            break
        offset = frag["more"]["offset"]
    return json.loads("".join(parts)), len(parts)


def write(name: str, payload: dict) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{name}.json"
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")


def main() -> int:
    dry = "--dry" in sys.argv
    stamp = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()
    print(f"harvesting csca.cn via api-anything -> {OUT}")
    if dry:
        print(json.dumps({"announcements": ANNOUNCEMENT_TYPES, "resources": RESOURCE_CODES}, ensure_ascii=False, indent=2))
        return 0

    for kind in ANNOUNCEMENT_TYPES:
        data, frags = call_full("announcements", {"xxlx": kind})
        write(f"announcements-{kind}", {
            "source": f"https://csca.cn/home · GET /sv/open/getGGXX?xxlx={kind}",
            "operation": "csca.announcements",
            "fetchedAt": stamp,
            "category": kind,
            "count": len(data) if isinstance(data, list) else 1,
            "items": data,
        })

    for code, name in RESOURCE_CODES.items():
        data, frags = call_full("resource", {"zydm": code})
        write(f"resource-{name}", {
            "source": f"https://csca.cn/about/* · POST /sv/open/zyxx/list {{zydm:{code}}}",
            "operation": "csca.resource",
            "fetchedAt": stamp,
            "code": code,
            "data": data,
        })

    for code, name in CONFIG_CODES.items():
        data, frags = call_full("config", {"confCode": code})
        content = data.get("confContent") if isinstance(data, dict) else None
        parsed = json.loads(content) if isinstance(content, str) else content
        write(f"config-{name}", {
            "source": f"https://csca.cn/home · GET /sv/open/getConfByCode?confCode={code}",
            "operation": "csca.config",
            "fetchedAt": stamp,
            "code": code,
            "sittings": parsed,
        })

    print("done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
