#!/usr/bin/env bash
# Smoke-test the VPS deployment; also checks the public domain once DNS is live.
#
#   bash deploy/verify.sh
set -uo pipefail

HOST="${HOST:-147.93.107.210}"
REMOTE_DIR="${REMOTE_DIR:-/docker/csca-prep}"
DOMAIN="${DOMAIN:-cscamaster.com}"
SSH="ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 -o BatchMode=yes"
FAIL=0
ok()    { printf '  \033[32mPASS\033[0m %s\n' "$*"; }
bad()   { printf '  \033[31mFAIL\033[0m %s\n' "$*"; FAIL=$((FAIL+1)); }
head1() { printf '\n\033[1;34m%s\033[0m\n' "$*"; }
r()     { $SSH "root@${HOST}" "$@" 2>/dev/null; }

head1 "containers"
r "cd ${REMOTE_DIR} && docker compose ps --format '  {{.Name}}  {{.Status}}'"
app=$(r "docker inspect -f '{{.State.Health.Status}}' csca-prep" || echo missing)
[[ "$app" == "healthy" ]] && ok "app healthy" || bad "app health: ${app:-missing}"
db=$(r "docker inspect -f '{{.State.Health.Status}}' csca-db" || echo missing)
[[ "$db" == "healthy" ]] && ok "db healthy" || bad "db health: ${db:-missing}"

head1 "routes (inside the app container)"
for p in / /pricing /sign-in /tools/score-calculator /sitemap.xml /robots.txt; do
  code=$(r "docker exec csca-prep node -e \"fetch('http://127.0.0.1:3000${p}').then(r=>console.log(r.status)).catch(()=>console.log(0))\"")
  [[ "$code" == "200" ]] && ok "GET ${p} -> 200" || bad "GET ${p} -> ${code:-no response}"
done

head1 "database"
users=$(r "docker exec csca-db psql -U csca -d cscamaster -tAc 'select count(*) from \"User\"'")
questions=$(r "docker exec csca-db psql -U csca -d cscamaster -tAc 'select count(*) from \"Question\"'")
attempts=$(r "docker exec csca-db psql -U csca -d cscamaster -tAc 'select count(*) from \"Attempt\"'")
if [[ -n "$users" && -n "$questions" ]]; then
  ok "${users} users / ${questions} questions / ${attempts:-0} attempts"
  [[ "$users" == "0" ]] && echo "  (empty database — run deploy/db-migrate.sh with PROD_DATABASE_URL)"
else
  bad "cannot read row counts"
fi

head1 "traefik"
r "docker logs traefik-gyx5-traefik-1 --since 60m 2>&1 | grep -i csca | tail -4" | sed 's/^/  /'
if r "docker logs traefik-gyx5-traefik-1 --since 6h 2>&1 | grep -q 'Unable to obtain ACME certificate for domains.*cscamaster'"; then
  echo "  ACME still pending (expected until the Cloudflare A records point here)"
else
  ok "no certificate errors for cscamaster"
fi

head1 "public DNS + https"
ip=$(getent hosts "www.${DOMAIN}" | head -1 | awk '{print $1}')
echo "  www.${DOMAIN} -> ${ip:-unresolved}"
code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "https://www.${DOMAIN}/" 2>/dev/null || echo 000)
[[ "$code" == "200" ]] && ok "https://www.${DOMAIN} -> 200" || bad "https://www.${DOMAIN} -> ${code}"
if curl -sSI --max-time 20 "https://www.${DOMAIN}/" 2>/dev/null | tr -d '\r' | grep -qi '^x-vercel'; then
  bad "still served by Vercel — Cloudflare DNS not switched yet"
else
  ok "origin is no longer Vercel"
fi

head1 "summary"
[[ $FAIL -eq 0 ]] && echo "  all checks passed" || echo "  ${FAIL} check(s) failed"
exit $(( FAIL > 0 ))
