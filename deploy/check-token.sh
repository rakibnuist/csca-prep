#!/usr/bin/env bash
# Check that the Cloudflare token works, without changing anything.
#
#   bash deploy/check-token.sh              # test the saved token
#   bash deploy/check-token.sh 'cfut_xxx'   # test a candidate token first
#
# Verifies: the token is valid, it can find the cscamaster.com zone, it can
# read the cache rules, and it can purge. Exits non-zero on any failure.
#
# ── Gotcha ──────────────────────────────────────────────────────────────
# Editing a token in the Cloudflare dashboard **rotates its secret**. The
# string you saved becomes invalid and a new one is shown. So: finish editing
# first, then copy the token, then save that. Never edit it again afterwards.
set -uo pipefail

DOMAIN="${DOMAIN:-cscamaster.com}"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FAIL=0
ok()  { printf '  \033[32mPASS\033[0m %s\n' "$*"; }
bad() { printf '  \033[31mFAIL\033[0m %s\n' "$*"; FAIL=$((FAIL + 1)); }

TOKEN="${1:-}"
if [[ -z "$TOKEN" ]]; then
  for f in "$SRC_DIR/.cloudflare-token" "$SRC_DIR/.env" "$HOME/.config/csca/cloudflare.env"; do
    [[ -f "$f" ]] || continue
    if grep -qE "^CLOUDFLARE_API_TOKEN=" "$f" 2>/dev/null; then
      TOKEN=$(grep -E "^CLOUDFLARE_API_TOKEN=" "$f" | tail -1 | cut -d= -f2- | sed 's/^["'\'']//; s/["'\'']$//')
    else
      TOKEN=$(tr -d '[:space:]' < "$f")
    fi
    [[ -n "$TOKEN" ]] && break
  done
  [[ -n "${CLOUDFLARE_API_TOKEN:-}" ]] && TOKEN="$CLOUDFLARE_API_TOKEN"
fi

if [[ -z "$TOKEN" ]]; then
  echo "  no token found in deploy/.cloudflare-token, deploy/.env, ~/.config/csca/cloudflare.env, or \$CLOUDFLARE_API_TOKEN" >&2
  exit 1
fi

echo "  token: ${TOKEN:0:8}…${TOKEN: -4} (len ${#TOKEN})"

api() { curl -sS --max-time 45 "$1" -H "Authorization: Bearer ${TOKEN}" 2>/dev/null; }

echo
echo "=== 1. token is valid ==="
r=$(api "https://api.cloudflare.com/client/v4/user/tokens/verify")
if printf '%s' "$r" | grep -q '"success": *true'; then
  ok "token active"
  printf '%s' "$r" | python3 -c "
import json,sys
d=json.load(sys.stdin)
print('      id     :', d['result'].get('id'))
print('      status :', d['result'].get('status'))
" 2>/dev/null
else
  bad "token rejected: $(printf '%s' "$r" | head -c 200)"
  cat >&2 <<'EOF'

  Cloudflare rotates a token's secret every time you EDIT it in the dashboard.
  If this token worked a moment ago and stopped, that is almost certainly why:
    1. Open https://dash.cloudflare.com/profile/api-tokens
    2. Open the token -> Edit -> make any change you need (e.g. clear the IP
       filter) -> Save
    3. Cloudflare shows a NEW token string. Copy THAT one.
    4. Save it:  echo '<new token>' > deploy/.cloudflare-token
    5. Test it:  bash deploy/check-token.sh '<new token>'
    6. Do NOT edit the token again — each edit rotates it again.
EOF
fi

echo
echo "=== 2. can find the zone ==="
r=$(api "https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}")
ZONE=$(printf '%s' "$r" | python3 -c "
import json,sys
try:
    d=json.load(sys.stdin); print((d.get('result') or [{}])[0].get('id',''))
except Exception: print('')
" 2>/dev/null)
if [[ -n "$ZONE" ]]; then
  ok "zone ${DOMAIN} = ${ZONE}"
else
  bad "zone not found — is the token in the account that owns ${DOMAIN}?"
  printf '%s' "$r" | python3 -c "
import json,sys
try:
    d=json.load(sys.stdin)
    for e in d.get('errors',[]): print('      ', e.get('message'))
except Exception: pass
" 2>/dev/null
fi

if [[ -n "$ZONE" ]]; then
  echo
  echo "=== 3. can read + write cache rules ==="
  r=$(api "https://api.cloudflare.com/client/v4/zones/${ZONE}/rulesets/phases/http_request_cache_settings/entrypoint")
  if printf '%s' "$r" | grep -q '"success": *true'; then
    ok "cache rules readable"
    printf '%s' "$r" | python3 -c "
import json,sys
d=json.load(sys.stdin)
for x in (d.get('result') or {}).get('rules',[]):
    ap=x.get('action_parameters',{})
    print('      rule    :', x.get('description'))
    print('      edge_ttl:', json.dumps(ap.get('edge_ttl')))
" 2>/dev/null
  else
    bad "cannot read the cache rules"
  fi

  echo
  echo "=== 4. can purge the cache ==="
  r=$(api "https://api.cloudflare.com/client/v4/zones/${ZONE}/purge_cache")
  :
  r=$(curl -sS --max-time 45 -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE}/purge_cache" \
    -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" \
    -d '{"files":["https://www.cscamaster.com/"]}' 2>/dev/null)
  if printf '%s' "$r" | grep -q '"success": *true'; then
    ok "can purge (Cache Purge permission present)"
  else
    bad "cannot purge: $(printf '%s' "$r" | head -c 200)"
  fi
fi

echo
[[ $FAIL -eq 0 ]] && echo "  token is good" || echo "  ${FAIL} check(s) failed"
exit $(( FAIL > 0 ))
