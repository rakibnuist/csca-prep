#!/usr/bin/env bash
# Put the static marketing pages into Cloudflare's edge cache.
#
#   bash deploy/cloudflare-cache.sh             # apply (idempotent)
#   bash deploy/cloudflare-cache.sh --dry-run   # inspect only
#   bash deploy/cloudflare-cache.sh --verify    # hit the site twice
#   bash deploy/cloudflare-cache.sh --remove    # delete our rule
#
# Credentials (first one that exists wins):
#   $CLOUDFLARE_API_TOKEN                     environment variable
#   deploy/.cloudflare-token                  raw token, one line
#   deploy/.env                               KEY=value
#   ~/.config/csca/cloudflare.env             KEY=value
#
# Token scope: Zone → Cache Rules → Edit, Zone → Zone → Read, for cscamaster.com.
#
# ── Why this exists ──────────────────────────────────────────────────────
# Next.js prerenders the marketing pages and emits `cache-control: s-maxage=31536000`,
# but Cloudflare does not cache HTML by default — it reported
# `cf-cache-status: DYNAMIC` on every request. That meant every page view went
# Cloudflare → Traefik → Docker → one `next start` process on the KVM-2 VPS,
# and measured TTFB was 1.3–12.4 s (total 5–30 s). One cache rule fixes that.
#
# ── Safety ───────────────────────────────────────────────────────────────
# The rule is scoped by an explicit path allow-list. The student app, the exam
# runner, the admin area, the auth pages and every API route are excluded, so
# a Set-Cookie response can never be stored at the edge. The same paths are
# marked `no-store` in next.config.ts as a second layer.
set -euo pipefail

DOMAIN="${DOMAIN:-cscamaster.com}"
HOST="${HOST:-www.cscamaster.com}"
MODE="${1:-apply}"
API="https://api.cloudflare.com/client/v4"
RULE_DESCRIPTION="CSCA Master — cache marketing pages"
PHASE="http_request_cache_settings"

# ── Credentials ──────────────────────────────────────────────────────────
load_env_file() {
  local file="$1" key="$2" value=""
  [[ -f "$file" ]] || return 0
  if grep -qE "^${key}=" "$file" 2>/dev/null; then
    value=$(grep -E "^${key}=" "$file" | tail -1 | cut -d= -f2- | sed 's/^["'\'']//; s/["'\'']$//')
  else
    # A file containing just the raw token, one per line.
    value=$(tr -d '[:space:]' < "$file")
  fi
  if [[ -n "$value" ]]; then
    printf -v "$key" '%s' "$value"
    export "$key"
  fi
  return 0
}

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
load_env_file "$SRC_DIR/.env" CLOUDFLARE_API_TOKEN
load_env_file "$SRC_DIR/.cloudflare-token" CLOUDFLARE_API_TOKEN
load_env_file "$HOME/.config/csca/cloudflare.env" CLOUDFLARE_API_TOKEN

AUTH=()
if [[ -n "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  AUTH=(-H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}")
elif [[ -n "${CLOUDFLARE_API_KEY:-}" && -n "${CLOUDFLARE_EMAIL:-}" ]]; then
  AUTH=(-H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" -H "X-Auth-Key: ${CLOUDFLARE_API_KEY}")
else
  cat >&2 <<'EOF'
need CLOUDFLARE_API_TOKEN (Zone.Cache Rules Edit), or CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL

Where to get one:
  Cloudflare dashboard -> My Profile -> API Tokens -> Create Custom Token
  Permissions: Zone -> Cache Rules -> Edit   (Zone: cscamaster.com)
  Permissions: Zone -> Zone -> Read          (Zone: cscamaster.com)
Then either:
  export CLOUDFLARE_API_TOKEN='<paste>'              # this shell only
  echo '<paste>' > deploy/.cloudflare-token           # saved, gitignored, auto-loaded
EOF
  exit 1
fi

# ── API helper ───────────────────────────────────────────────────────────
# Fails loudly. The first version of this script piped errors to /dev/null,
# so an invalid payload looked exactly like success.
cf() { # cf <method> <path> [body]
  local method="$1" path="$2" body="${3:-}"
  local raw
  if [[ -n "$body" ]]; then
    raw=$(curl -sS -X "$method" "$API$path" "${AUTH[@]}" \
      -H 'Content-Type: application/json' -d "$body")
  else
    raw=$(curl -sS -X "$method" "$API$path" "${AUTH[@]}")
  fi
  local ok
  ok=$(printf '%s' "$raw" | node -e '
    let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
      try { console.log(JSON.parse(s).success ? "1" : "0"); }
      catch { console.log("0"); }
    });')
  if [[ "$ok" != "1" ]]; then
    echo "Cloudflare API error on ${method} ${path}:" >&2
    printf '%s' "$raw" | node -e '
      let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
        try { const j=JSON.parse(s);
          (j.errors||[]).forEach(e=>console.error("  "+(e.message||JSON.stringify(e))));
          if (!(j.errors||[]).length) console.error("  "+s.slice(0,400));
        } catch { console.error("  "+s.slice(0,400)); }
      });'
    return 1
  fi
  printf '%s' "$raw"
}

jget() { # jget <json> <node expression over `j`>
  node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const j=JSON.parse(s);console.log(eval(process.argv[1]))})" "$1"
}

zone_id=$(cf GET "/zones?name=${DOMAIN}" | jget "j.result?.[0]?.id||''")
if [[ -z "$zone_id" ]]; then
  echo "zone ${DOMAIN} not found — is this token in the right Cloudflare account?" >&2
  exit 1
fi
echo "zone ${DOMAIN}: ${zone_id}"

# ── The rule ─────────────────────────────────────────────────────────────
# Only these paths are cached. Everything else falls through untouched, so a
# Set-Cookie response can never be stored at the edge.
#
# The payload is built with node rather than shell interpolation: the Rules
# expression contains double quotes, which would otherwise break the JSON.
#
# Note: no `cache_key` block. The API rejects the custom-key shape on this
# account, and the default key (request host + URL) is what we want anyway.
#
# The edge TTL is deliberately bounded to one hour rather than "respect_origin".
# Next sends `s-maxage=31536000` on the prerendered pages, so respecting the
# origin would keep HTML at the edge for a year — and a deploy whose cache
# purge failed would leave visitors on the old build until then. One hour is a
# safety net; `deploy.sh` purges after every deploy so content is fresh
# immediately in the normal case.
RULE=$(node -e '
const [host, desc] = process.argv.slice(1);
const exact = [
  "/", "/csca", "/exam-dates", "/scholarships", "/requirements", "/tips",
  "/sample-questions", "/free-exam", "/question-papers", "/guides", "/glossary",
  "/pricing", "/about", "/contact",
  "/llms.txt", "/llms-full.txt",
  // NOT /sitemap.xml or /robots.txt: those follow the origin s-maxage=300 so a
  // deploy reaches crawlers in minutes rather than an hour. deploy.sh purges
  // them explicitly at the end.
];
const inSet = exact.map((p) => `"${p}"`).join(" ");
const expression =
  `(http.host eq "${host}") and (` +
  `http.request.uri.path in {${inSet}} or ` +
  `starts_with(http.request.uri.path, "/syllabus") or ` +
  `starts_with(http.request.uri.path, "/guides") or ` +
  `starts_with(http.request.uri.path, "/tools/")` +
  `)`;
console.log(JSON.stringify({
  description: desc,
  action: "set_cache_settings",
  action_parameters: {
    // override_origin with an explicit 3600s (1 h) edge TTL. respect_origin
    // would honour the s-maxage=31536000 that Next sends and keep HTML at the
    // edge for a year, so a deploy whose cache purge failed would strand
    // visitors on the old build. One hour is the safety net; deploy.sh purges
    // after every deploy, so content is fresh immediately in the normal case.
    edge_ttl: { mode: "override_origin", default: 3600 },
    browser_ttl: { mode: "respect_origin" },
  },
  expression,
}, null, 2));
' "$HOST" "$RULE_DESCRIPTION")

# ── Locate the cache-rules entrypoint ruleset ────────────────────────────
entrypoint=$(cf GET "/zones/${zone_id}/rulesets/phases/${PHASE}/entrypoint" 2>/dev/null || echo '{"result":null}')
ruleset_id=$(printf '%s' "$entrypoint" | jget "j.result?.id||''")
existing_rule_id=$(printf '%s' "$entrypoint" | jget "(j.result?.rules||[]).find(r=>r.description==='${RULE_DESCRIPTION}')?.id||''")

verify_cache() {
  echo
  echo "verifying…"
  for path in "/" "/csca" "/syllabus"; do
    # First request populates the cache, second should be a HIT.
    curl -sS -o /dev/null --max-time 90 "https://${HOST}${path}" 2>/dev/null || true
    sleep 1
    out=$(curl -sS -o /dev/null -D - -w '%{time_starttransfer}' --max-time 90 \
      "https://${HOST}${path}" 2>/dev/null | tr -d '\r' \
      | awk 'tolower($1)=="cf-cache-status:"{s=$2} $0 ~ /^[0-9.]+$/{t=$0} END{printf "%s ttfb=%ss", (s==""?"(none)":s), (t==""?"?":t)}')
    printf "  %-12s %s\n" "$path" "$out"
  done
  echo
  echo "  expected: HIT for the marketing paths, DYNAMIC for /app/* and /api/*"
}

if [[ "$MODE" == "--dry-run" ]]; then
  echo
  echo "current cache rules:"
  printf '%s' "$entrypoint" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const j=JSON.parse(s);const r=j.result?.rules||[];if(!r.length){console.log('  (none)');return}r.forEach(x=>console.log('  -',x.id,'|',x.description,'|',x.enabled===false?'disabled':'enabled'))})"
  echo
  echo "would apply rule:"
  printf '%s\n' "$RULE" | sed 's/^/  /'
  exit 0
fi

if [[ "$MODE" == "--verify" ]]; then
  verify_cache
  exit 0
fi

if [[ "$MODE" == "--purge" ]]; then
  # The cache rule stores marketing HTML for up to an hour, so a deploy would
  # otherwise leave visitors on the previous build until the TTL expired.
  # Every deploy purges after it ships.
  #
  # Both forms are sent: the wildcard covers every path, the explicit list
  # covers the homepage exactly (the wildcard alone was observed to leave the
  # root document cached on some edges).
  echo "purging the edge cache for ${HOST}…"
  purged=$(cf POST "/zones/${zone_id}/purge_cache" \
    "{\"files\":[\"https://${HOST}/*\",\"https://${HOST}/\",\"https://${DOMAIN}/*\",\"https://${DOMAIN}/\"]}" \
    | jget "j.result?.id||''")
  echo "  purge accepted (${purged:-unknown})"
  echo "  the edge serves the new build within a few seconds"
  exit 0
fi

if [[ "$MODE" == "--remove" ]]; then
  if [[ -z "$existing_rule_id" ]]; then
    echo "no rule named '${RULE_DESCRIPTION}' — nothing to remove"
    exit 0
  fi
  cf DELETE "/zones/${zone_id}/rulesets/${ruleset_id}/rules/${existing_rule_id}" >/dev/null
  echo "removed cache rule ${existing_rule_id}"
  exit 0
fi

if [[ -n "$existing_rule_id" ]]; then
  # Update in place so we never end up with two copies of the rule.
  cf PATCH "/zones/${zone_id}/rulesets/${ruleset_id}/rules/${existing_rule_id}" "$RULE" >/dev/null
  echo "updated cache rule ${existing_rule_id}"
elif [[ -n "$ruleset_id" ]]; then
  cf POST "/zones/${zone_id}/rulesets/${ruleset_id}/rules" "$RULE" >/dev/null
  echo "created cache rule in ruleset ${ruleset_id}"
else
  # No entrypoint ruleset for this phase yet — create one.
  body=$(node -e "
    const rule = JSON.parse(process.argv[1]);
    console.log(JSON.stringify({
      name: 'CSCA Master cache rules',
      kind: 'zone',
      phase: '${PHASE}',
      rules: [rule],
    }));
  " "$RULE")
  created=$(cf POST "/zones/${zone_id}/rulesets" "$body")
  new_id=$(printf '%s' "$created" | jget "j.result?.rules?.[0]?.id||''")
  echo "created cache ruleset with rule ${new_id}"
fi

echo
sleep 3
verify_cache
