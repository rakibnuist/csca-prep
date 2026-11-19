#!/usr/bin/env python3
"""Harvest the CSCA prep competitor sites with the api-anything browser capture.

For every page: `api-anything capture <url>` loads it in the real browser (which is
what gets past the Vercel checkpoint on csca.app), stores the exchange set, and this
script turns the document response into a small, readable record:

    research/raw/sites/<site>/pages/<slug>.json
    { url, finalUrl, status, title, description, headings, text, links, jsonld }

Nothing here writes to the sites; every request is a plain page load.

Usage:
    python3 research/scripts/harvest_sites.py [--only site[,site]] [--limit n]
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import subprocess
import sys
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "raw" / "sites"
HOME = pathlib.Path.home() / ".api-anything" / "captures"

SITES: dict[str, dict] = {
    "cscaprep-academy": {
        "base": "https://cscaprep.academy",
        "source": "https://cscaprep.academy/",
        "pages": ["", "about", "how-to-use", "exam-dates", "china-scholarships", "faq",
                  "guides", "guides/mathematics", "csca/what-is", "csca/scoring-and-cutoffs",
                  "csca/mock-test", "csca/syllabus", "csca/how-to-register", "csca/test-centres",
                  "csca/tutor", "csca/study-plan-12-week", "csca/2027-essentials"],
    },
    "cscaprepare": {
        "base": "https://www.cscaprepare.com",
        "source": "https://www.cscaprepare.com/",
        "pages": ["", "csca-exam", "what-is-csca", "syllabus", "exam-calendar", "subjects",
                  "mock-test", "practice", "ai-assistant", "csca-fees", "csca-results",
                  "csca-technical-requirements", "shop", "shop/mock-packs",
                  "shop/past-paper-bundles", "resources/past-papers-reference-library", "faq"],
    },
    "csca-ai": {
        "base": "https://csca.ai",
        "source": "https://csca.ai/csca-preparation",
        "pages": ["csca-preparation", "about-csca", "csca-syllabus", "practice", "mock-test",
                  "live-classes", "resources", "blogs", "subjects/mathematics",
                  "blogs/csca-exam-format-and-scoring", "blogs/is-csca-mandatory-for-china",
                  "blogs/csca-mock-tests-sample-questions-practice-method",
                  "blogs/csca-home-based-exam-checklist"],
    },
    "csca-space": {
        "base": "https://csca.space",
        "source": "https://csca.space/",
        "pages": ["", "curriculum", "formulas", "subjects", "compare", "diagnostic", "guides",
                  "subjects/math", "subjects/physics", "subjects/chemistry", "subjects/chinese",
                  "formulas/math", "curriculum/math_sets_operations"],
    },
    "csca-app": {
        "base": "https://csca.app",
        "source": "https://csca.app/en",
        "pages": ["/en"],
    },
    "csca-international": {
        "base": "https://cscainternational.com",
        "source": "https://cscainternational.com/",
        "pages": ["", "csca-exams/", "contact/", "legal/",
                  "csca-subjects-explained-what-matters-more-than-memorization/",
                  "why-csca-feels-difficult-even-for-high-scoring-students/",
                  "why-chinese-universities-use-csca-in-international-admissions/"],
    },
}

BLOCK = {"p", "div", "section", "article", "header", "footer", "li", "ul", "ol", "tr", "td",
         "th", "table", "h1", "h2", "h3", "h4", "h5", "h6", "br", "hr", "main", "nav", "blockquote",
         "figure", "figcaption", "form", "label", "button", "aside"}
SKIP = {"script", "style", "noscript", "svg", "template"}


class Extractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.parts: list[str] = []
        self.headings: list[dict] = []
        self.links: list[dict] = []
        self.meta: dict[str, str] = {}
        self.title = ""
        self.jsonld: list[str] = []
        self._in_title = False
        self._heading: dict | None = None
        self._anchor: dict | None = None
        self._jsonld = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in SKIP:
            self.skip += 1
            if tag == "script" and a.get("type") == "application/ld+json":
                self._jsonld = True
            return
        if tag == "title":
            self._in_title = True
        if tag == "meta":
            name = a.get("name") or a.get("property") or ""
            if name and a.get("content"):
                self.meta[name] = a["content"].strip()
            return
        if tag in BLOCK:
            self.parts.append("\n")
        if tag in {"h1", "h2", "h3"}:
            self._heading = {"level": int(tag[1]), "text": ""}
        if tag == "a" and a.get("href"):
            self._anchor = {"href": a["href"], "text": ""}

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip = max(0, self.skip - 1)
            if tag == "script":
                self._jsonld = False
            return
        if tag == "title":
            self._in_title = False
        if tag in {"h1", "h2", "h3"} and self._heading:
            text = " ".join(self._heading["text"].split())
            if text:
                self.headings.append({"level": self._heading["level"], "text": text})
            self._heading = None
        if tag == "a" and self._anchor:
            text = " ".join(self._anchor["text"].split())
            if text:
                self.links.append({"href": self._anchor["href"], "text": text[:120]})
            self._anchor = None
        if tag in BLOCK:
            self.parts.append("\n")

    def handle_data(self, data):
        if self._jsonld:
            self.jsonld.append(data)
            return
        if self.skip:
            return
        if self._in_title:
            self.title += data
            return
        self.parts.append(data)
        if self._heading is not None:
            self._heading["text"] += data
        if self._anchor is not None:
            self._anchor["text"] += data

    def text(self) -> str:
        raw = "".join(self.parts)
        raw = re.sub(r"[ \t\u00a0]+", " ", raw)
        raw = re.sub(r"\n\s*\n+", "\n\n", raw)
        return raw.strip()


def capture(url: str) -> str | None:
    proc = subprocess.run(["api-anything", "capture", url], capture_output=True, text=True, timeout=180)
    out = proc.stdout.strip()
    if not out:
        print(f"    ! no output for {url}: {proc.stderr[:200]}")
        return None
    try:
        answer = json.loads(out)
    except json.JSONDecodeError:
        print(f"    ! unparsable capture output for {url}")
        return None
    if not answer.get("ok", True) and not answer.get("capture"):
        print(f"    ! capture failed for {url}: {str(answer)[:200]}")
        return None
    return answer.get("capture")


def page_record(url: str, cid: str) -> dict | None:
    store = HOME / f"{cid}.json"
    if not store.exists():
        print(f"    ! capture {cid} missing")
        return None
    data = json.loads(store.read_text())
    doc = None
    for ex in data.get("exchanges", []):
        if ex.get("resourceType") != "document":
            continue
        # some CDNs report an empty content-type; the document kind and an HTML body are enough
        body = ex.get("response", {}).get("body") or ""
        if "text/html" in str(ex.get("response", {}).get("contentType", "")) or body.lstrip().startswith("<"):
            doc = ex
            break
    if doc is None:
        return {"url": url, "finalUrl": data.get("finalUrl"), "status": None,
                "error": "no html document exchange", "text": ""}
    body = doc["response"].get("body") or ""
    p = Extractor()
    try:
        p.feed(body)
    except Exception as exc:  # noqa: BLE001 - a broken page must not stop the run
        return {"url": url, "finalUrl": data.get("finalUrl"), "status": doc["response"].get("status"),
                "error": f"parse: {exc}", "text": ""}
    return {
        "url": url,
        "finalUrl": data.get("finalUrl"),
        "status": doc["response"].get("status"),
        "title": " ".join(p.title.split()),
        "description": p.meta.get("description") or p.meta.get("og:description") or "",
        "headings": p.headings[:120],
        "text": p.text(),
        "links": p.links[:400],
        "jsonld": [json.loads(x) if x.strip().startswith(("{", "[")) else x for x in p.jsonld][:6],
    }


def slug_for(path: str) -> str:
    s = path.strip("/").replace("/", "__") or "home"
    return re.sub(r"[^a-zA-Z0-9_.-]", "-", s)[:90]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", default="")
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()
    wanted = [s for s in args.only.split(",") if s] or list(SITES)

    total = 0
    for name in wanted:
        site = SITES[name]
        root = OUT / name
        (root / "pages").mkdir(parents=True, exist_ok=True)
        records = []
        print(f"== {name} ==")
        for path in site["pages"]:
            url = site["base"] + "/" + path.lstrip("/")
            if args.limit and len(records) >= args.limit:
                break
            print(f"  {url}")
            cid = capture(url)
            if not cid:
                continue
            rec = page_record(url, cid)
            if not rec:
                continue
            rec["capture"] = cid
            rec["site"] = name
            slug = slug_for(path)
            (root / "pages" / f"{slug}.json").write_text(
                json.dumps(rec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            records.append({"slug": slug, "url": url, "title": rec.get("title", ""),
                            "status": rec.get("status"), "chars": len(rec.get("text", ""))})
            total += 1
            print(f"    {rec.get('status')} {len(rec.get('text', '')):,} chars :: {rec.get('title','')[:70]}")
        (root / "index.json").write_text(
            json.dumps({"site": name, "source": site["source"], "pages": records},
                       ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"captured {total} pages")
    return 0


if __name__ == "__main__":
    sys.exit(main())
