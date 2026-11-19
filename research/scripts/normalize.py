#!/usr/bin/env python3
"""Turn the raw harvest into readable, citable notes.

Inputs are what the harvesters wrote; nothing here touches the network.

    research/raw/csca/*.json          -> research/normalized/csca/<slug>.md
    research/raw/guidebook/*.txt      -> research/normalized/guidebook/CSCA-Guidebook.md
    research/raw/sites/<site>/pages/  -> research/normalized/sites/<site>.md

The site notes are for reading during a task; the raw page JSON stays the source of
truth for anything a script needs later.
"""

from __future__ import annotations

import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
RAW = ROOT / "raw"
OUT = ROOT / "normalized"

TAG_BLOCK = re.compile(r"</(p|div|tr|li|h[1-6]|section|article|figure|figcaption|blockquote)>", re.I)


def html_to_text(source: str) -> str:
    if not source:
        return ""
    text = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", source, flags=re.S | re.I)
    text = re.sub(r"<img[^>]*>", "[image]", text, flags=re.I)
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = TAG_BLOCK.sub("\n", text)
    text = re.sub(r"</t[dh]>", " | ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = re.sub(r"[ \t\u00a0]+", " ", text)
    text = re.sub(r"\n\s*\n+", "\n\n", text)
    return text.strip()


def frontmatter(title: str, **fields: str) -> str:
    lines = ["---", f"title: {json.dumps(title, ensure_ascii=False)}"]
    for key, value in fields.items():
        if value:
            lines.append(f"{key}: {json.dumps(value, ensure_ascii=False)}")
    lines.append("---")
    return "\n".join(lines) + "\n\n"


def normalize_csca() -> int:
    target = OUT / "csca"
    target.mkdir(parents=True, exist_ok=True)
    count = 0

    for path in sorted((RAW / "csca").glob("announcements-*.json")):
        doc = json.loads(path.read_text())
        items = doc["items"] if isinstance(doc["items"], list) else [doc["items"]]
        body = [frontmatter(f"CSCA {doc['category']} (official)", source=doc["source"],
                            fetched=doc["fetchedAt"], operation=doc["operation"])]
        for item in items:
            body.append(f"## {item.get('title','(untitled)')}\n")
            if item.get("titleEn"):
                body.append(f"**EN title:** {item['titleEn']}  ")
            body.append(f"**Published:** {str(item.get('date',''))[:10]}  \n")
            body.append(html_to_text(item.get("content") or "") + "\n")
            if item.get("contentEn"):
                body.append("### English\n" + html_to_text(item["contentEn"]) + "\n")
            body.append("---\n")
        slug = path.stem.replace("announcements-", "announcements-")
        (target / f"{slug}.md").write_text("\n".join(body), encoding="utf-8")
        count += 1

    for path in sorted((RAW / "csca").glob("resource-*.json")):
        doc = json.loads(path.read_text())
        data = doc.get("data") or {}
        title = data.get("title") or doc["code"]
        body = [frontmatter(f"CSCA {title} ({data.get('titleEn') or data.get('title')}) (official)",
                            source=doc["source"], fetched=doc["fetchedAt"],
                            operation=doc["operation"], code=doc["code"],
                            published=str(data.get("published", "")))]
        body.append(f"# {title}\n")
        body.append(html_to_text(data.get("content") or data.get("contentEn") or "") + "\n")
        if data.get("contentEn"):
            body.append("## English\n" + html_to_text(data["contentEn"]) + "\n")
        (target / f"{path.stem.replace('resource-', 'resource-')}.md").write_text(
            "\n".join(body), encoding="utf-8")
        count += 1

    return count


def normalize_guidebook() -> int:
    src = RAW / "guidebook" / "CSCA-Guidebook.txt"
    if not src.exists():
        return 0
    text = src.read_text(encoding="utf-8")
    keep = []
    for line in text.splitlines():
        stripped = line.strip()
        if re.fullmatch(r"[–\-]{2,}\s*Guide to the CSCA Exam\s*", stripped):
            continue
        if re.fullmatch(r"\u200b?\s*\d{1,2}\s*", stripped):
            continue
        keep.append(line.replace("\u200b", "").replace("\f", "").rstrip())
    cleaned = re.sub(r"\n{3,}", "\n\n", "\n".join(keep))
    target = OUT / "guidebook"
    target.mkdir(parents=True, exist_ok=True)
    (target / "CSCA-Guidebook.md").write_text(
        frontmatter("Guide to the CSCA Exam (China Admissions, 2025)",
                    source="https://media.china-admissions.com/wp-content/uploads/2025/11/CSCA-Guidebook.pdf",
                    note="Unofficial third-party guide; 31 pages; verify every fact against csca.cn")
        + cleaned, encoding="utf-8")
    return 1


def normalize_rendered() -> int:
    """Static SPA pages on csca.cn carry their copy in the bundle, not in an API.

    They were rendered in a real browser once and saved as plain text; the portal
    is the only place the official subject-selection rules and fees are stated
    verbatim, so they are kept next to the API documents.
    """
    src = RAW / "csca" / "rendered"
    if not src.is_dir():
        return 0
    target = OUT / "csca"
    target.mkdir(parents=True, exist_ok=True)
    count = 0
    for path in sorted(src.glob("*.txt")):
        slug = path.stem
        body = frontmatter(f"csca.cn/{slug.replace('-', '/', 1)} (official, rendered)",
                           source=f"https://csca.cn/{slug.replace('-', '/', 1)}",
                           note="Rendered browser text; the SPA serves no API for this copy")
        (target / f"rendered-{slug}.md").write_text(body + path.read_text(encoding="utf-8"),
                                                    encoding="utf-8")
        count += 1
    return count


def normalize_sites() -> int:
    count = 0
    for site_dir in sorted((RAW / "sites").glob("*")):
        pages_dir = site_dir / "pages"
        if not pages_dir.is_dir():
            continue
        if not (site_dir / "index.json").exists():
            continue  # a harvest that is still running
        index = json.loads((site_dir / "index.json").read_text())
        body = [frontmatter(f"{index['site']} — captured pages",
                            source=index["source"],
                            note="Captured through api-anything's browser; page text only, links kept in raw JSON")]
        for page in index["pages"]:
            page_doc = json.loads((pages_dir / f"{page['slug']}.json").read_text())
            body.append(f"## {page_doc.get('title') or page['url']}\n")
            body.append(f"<{page['url']}>  \n")
            body.append((page_doc.get("text") or "")[:16000] + "\n")
        target = OUT / "sites"
        target.mkdir(parents=True, exist_ok=True)
        (target / f"{site_dir.name}.md").write_text("\n".join(body), encoding="utf-8")
        count += 1
    return count


def main() -> None:
    print(f"csca documents : {normalize_csca()}")
    print(f"csca rendered  : {normalize_rendered()}")
    print(f"guidebook      : {normalize_guidebook()}")
    print(f"site notes     : {normalize_sites()}")


if __name__ == "__main__":
    main()
