#!/usr/bin/env python3
"""Extracts verified article bodies + metadata from the official InAmigos blog
pages into structured blocks so the new site reproduces real content."""
import html
import json
import re
import sys
import urllib.request

BASE = "https://www.inamigosfoundation.org.in/single/"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"}

TAG = re.compile(r"<(/?)(h2|h3|h4|p|li|ul|ol|br|strong|em|blockquote)\b[^>]*>", re.I)
SKIP = re.compile(r"<(script|style|nav|aside|footer|header)\b", re.I)


def fetch(slug):
    req = urllib.request.Request(BASE + slug, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "ignore")


def scope_of(page):
    start = page.find('<div class="single-blog-wrap">')
    if start < 0:
        return ""
    start += len('<div class="single-blog-wrap">')
    end = page.find('<div class="row pad-top-20 pad-bot-20">', start)
    return page[start:end if end > 0 else start + 40000]


def parse(scope):
    """Tokenise the article region into ordered content blocks."""
    blocks = []
    buf = []
    kind = None
    in_list = False

    def flush():
        nonlocal buf, kind
        text = re.sub(r"\s+", " ", "".join(buf)).strip()
        if text and kind:
            blocks.append({"t": kind, "x": text})
        buf = []
        kind = None

    for m in TAG.finditer(scope):
        closing, name = m.group(1), m.group(2).lower()
        text = scope[m.end():]
        chunk = scope[0:0]

    # simpler: manual scan
    blocks = []
    buf = []
    kind = None
    pos = 0
    for m in TAG.finditer(scope):
        chunk = scope[pos:m.start()]
        if chunk:
            buf.append(html.unescape(re.sub(r"<[^>]+>", "", chunk)))
        pos = m.end()
        closing, name = m.group(1), m.group(2).lower()

        if name == "br":
            if kind == "p":
                txt = re.sub(r"\s+", " ", "".join(buf)).strip()
                if txt:
                    blocks.append({"t": "p", "x": txt})
                buf = []
            continue

        if closing:
            if name in ("h2", "h3", "h4", "p", "li", "blockquote"):
                txt = re.sub(r"\s+", " ", "".join(buf)).strip()
                if txt:
                    blocks.append({"t": name, "x": txt})
                buf = []
                kind = None
            continue

        # opening tag
        if name in ("h2", "h3", "h4"):
            flush()
            kind = name
        elif name == "p":
            flush()
            kind = "p"
        elif name == "blockquote":
            flush()
            kind = "blockquote"
        elif name == "li":
            flush()
            kind = "li"
            in_list = True
        elif name in ("ul", "ol"):
            flush()

    tail = scope[pos:]
    if tail:
        buf.append(html.unescape(re.sub(r"<[^>]+>", "", tail)))

    cleaned = []
    for b in blocks:
        x = b["x"]
        if len(x) < 3:
            continue
        if "Share this post" in x or "inamigosfoundation.org.in" in x or "Visho Infotech" in x:
            continue
        cleaned.append(b)
    return cleaned


def meta(page):
    out = {}
    m = re.search(r'blog-meta.*?<i class="las la-calendar"></i>\s*([^<]+)', page, re.S)
    if m:
        out["date"] = m.group(1).strip()
    m = re.search(r'blog-meta.*?la-list"></i>\s*([^<]+)</a>', page, re.S)
    if m:
        out["category"] = html.unescape(m.group(1).strip())
    m = re.search(r'la-comments"></i>\s*(\d+)\s*Comments', page, re.S)
    if m:
        out["comments"] = int(m.group(1))
    m = re.search(r'la-eye"></i>\s*(\d+)', page, re.S)
    if m:
        out["views"] = int(m.group(1))
    m = re.search(r'<img src="(https://www\.inamigosfoundation\.org\.in/public/storage/post/[^"]+)"\s+alt="([^"]*)"', page)
    if m:
        out["image"] = m.group(1)
        out["title"] = html.unescape(m.group(2))
    m = re.search(r'<h3 class="mt-2"><a[^>]*>(.*?)</a></h3>', page, re.S)
    if m:
        out["title"] = html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m.group(1))).strip())
    tags = re.findall(r'blog/blog/#([^"]+)"', page)
    if tags:
        out["tags"] = [html.unescape(t).strip() for t in tags[0].split("#") if t.strip()]
    return out


def main(target, slugs):
    result = {}
    for slug in slugs:
        try:
            page = fetch(slug)
            body = parse(scope_of(page))
            result[slug] = {"meta": meta(page), "body": body}
            print(f"✓ {slug}: {len(body)} blocks, {sum(len(b['x']) for b in body)} chars")
        except Exception as exc:  # noqa: BLE001
            print(f"✗ {slug}: {exc}")
            result[slug] = {"meta": {}, "body": []}
    with open(target, "w", encoding="utf-8") as fh:
        json.dump(result, fh, ensure_ascii=False, indent=2)
    print(f"\n→ {target}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2:])
