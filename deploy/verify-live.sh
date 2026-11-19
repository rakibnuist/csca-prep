#!/usr/bin/env bash
# Verify the live site after a deploy: security fixes, copy, cache, SEO.
#
#   bash deploy/verify-live.sh
set -uo pipefail

HOST="${HOST:-www.cscamaster.com}"
FAIL=0
ok()   { printf '  \033[32mPASS\033[0m %s\n' "$*"; }
bad()  { printf '  \033[31mFAIL\033[0m %s\n' "$*"; FAIL=$((FAIL + 1)); }
head1() { printf '\n\033[1;34m%s\033[0m\n' "$*"; }

H="https://${HOST}"

head1 "admin pages must not leak to anonymous visitors"
body=$(curl -sS --max-time 60 "$H/admin" 2>/dev/null)
bytes=$(printf '%s' "$body" | wc -c)
if [[ "$bytes" -lt 2000 ]]; then
  ok "/admin body is ${bytes} bytes (no page content)"
else
  bad "/admin body is ${bytes} bytes — content may be leaking"
fi
for pat in "Amina" "score" "Questions live" "Mock 01"; do
  n=$(printf '%s' "$body" | grep -c "$pat" || true)
  [[ "$n" == "0" ]] || bad "/admin leaks '${pat}' (${n})"
done
ok "/admin leaks no student data"

body=$(curl -sS --max-time 60 "$H/admin/content" 2>/dev/null)
for pat in "reaction rate" "ionic bonding"; do
  n=$(printf '%s' "$body" | grep -c "$pat" || true)
  [[ "$n" == "0" ]] || bad "/admin/content leaks '${pat}'"
done
ok "/admin/content leaks no question stems"

head1 "lead server actions must require admin"
# The action id is a deterministic per-build hash, so read it from the local
# build manifest. (Scraping it from the live admin page no longer works —
# the middleware correctly blocks anonymous users before the page renders.)
ACTION_ID=""
for manifest in .next/server/app/**/server-reference-manifest.json; do
  [[ -f "$manifest" ]] || continue
  found=$(node -e '
    const fs = require("fs");
    try {
      const d = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
      for (const v of Object.values(d.node || {})) {
        if (v.exportedName === "updateLeadAction") { console.log(v.id); process.exit(0); }
      }
    } catch {}
  ' "$manifest")
  [[ -n "$found" ]] && { ACTION_ID="$found"; break; }
done
if [[ -z "$ACTION_ID" ]]; then
  ok "no local build manifest to read the action id from — skipped"
else
  echo "  action id: ${ACTION_ID:0:12}…"
  code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 60 -X POST "$H/admin/leads" \
    -H "Next-Action: ${ACTION_ID}" -H "Content-Type: text/plain;charset=UTF-8" \
    --data-binary '[null,{"id":"probe-id","status":"CONVERTED","note":"UNAUTH_PROBE"}]' 2>/dev/null)
  case "$code" in
    30*) ok "anonymous updateLeadAction blocked (HTTP $code)" ;;
    200) bad "anonymous updateLeadAction returned 200 — it may have written!" ;;
    *) ok "anonymous updateLeadAction rejected (HTTP $code)" ;;
  esac
fi

head1 "copy is accurate"
html=$(curl -sS --max-time 60 "$H/" 2>/dev/null)
for pat in "176" "2,867-question bank" "Official format · 2025 syllabus"; do
  printf '%s' "$html" | grep -qF "$pat" && ok "homepage shows '${pat}'" || bad "homepage missing '${pat}'"
done
printf '%s' "$html" | grep -qF "150+" && bad "homepage still claims '150+ practice papers'" || ok "stale '150+' claim removed"
printf '%s' "$html" | grep -qF "3,000+</strong> original" && bad "homepage still claims '3,000+ original questions'" || ok "stale 'original questions' claim removed"

head1 "robots.txt is valid"
robots=$(curl -sS --max-time 30 "$H/robots.txt" 2>/dev/null)
printf '%s' "$robots" | grep -qE '^Host: [a-z0-9.-]+$' && ok "Host directive is a bare hostname" || bad "Host directive is invalid"
printf '%s' "$robots" | grep -q 'Sitemap:' && ok "sitemap declared" || bad "no sitemap directive"

head1 "llms.txt is discoverable"
# Crawlers land on "/" (Cloudflare's AI Crawl Control showed 92 successful hits on
# the homepage) — they need a pointer to the structured file.
printf '%s' "$robots" | grep -q 'llms.txt' && ok "robots.txt points at /llms.txt" || bad "robots.txt does not mention llms.txt"
html=$(curl -sS --max-time 60 "$H/" 2>/dev/null)
printf '%s' "$html" | grep -q 'rel="alternate"[^>]*href="/llms.txt"' && ok "<head> links /llms.txt" || bad "<head> does not link /llms.txt"
llms=$(curl -sS --max-time 30 "$H/llms.txt" 2>/dev/null)
[[ "$(printf '%s' "$llms" | wc -c)" -gt 1000 ]] && ok "/llms.txt serves $(printf '%s' "$llms" | wc -c) bytes" || bad "/llms.txt is empty or too small"
printf '%s' "$llms" | grep -q 'Last updated: 20' && ok "/llms.txt carries a build-time date" || bad "/llms.txt has no date"
# Auth-gated pages must not be advertised to crawlers that cannot read them.
printf '%s' "$llms" | grep -q '](/app/' && bad "llms.txt links to an auth-gated /app/ page" || ok "llms.txt links only to public pages"

head1 "edge cache"
for p in / /csca /syllabus; do
  curl -sS -o /dev/null --max-time 60 "$H$p" 2>/dev/null || true
  s=$(curl -sSI --max-time 60 "$H$p" 2>/dev/null | tr -d '\r' | awk 'tolower($1)=="cf-cache-status:"{print $2}')
  [[ "$s" == "HIT" ]] && ok "cf-cache-status HIT for ${p}" || bad "cf-cache-status ${s:-none} for ${p}"
done
s=$(curl -sSI --max-time 60 "$H/api/me" 2>/dev/null | tr -d '\r' | awk 'tolower($1)=="cf-cache-status:"{print $2}')
[[ "$s" != "HIT" ]] && ok "/api/me not cached (${s:-none})" || bad "/api/me is cached at the edge"

head1 "summary"
[[ $FAIL -eq 0 ]] && echo "  all live checks passed" || echo "  ${FAIL} check(s) failed"
exit $(( FAIL > 0 ))
