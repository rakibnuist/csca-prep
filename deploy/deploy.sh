#!/usr/bin/env bash
# Deploy CSCA Master to the Hostinger VPS: rsync the checkout into the build
# context, then `docker compose up -d --build` behind the existing Traefik edge.
#
#   bash deploy/deploy.sh
#   HOST=<ip-or-host> bash deploy/deploy.sh
set -euo pipefail

HOST="${HOST:-147.93.107.210}"
REMOTE_DIR="${REMOTE_DIR:-/docker/csca-prep}"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SSH="ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 -o BatchMode=yes"
ROOT="root@${HOST}"

log() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }
remote() { $SSH "$ROOT" "$@"; }

log "rsync source -> ${ROOT}:${REMOTE_DIR}/app"
remote "install -d -m 0755 ${REMOTE_DIR}/app"
rsync -az --delete \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '.next/' \
  --exclude '.pglite/' \
  --exclude '.vercel/' \
  --exclude 'deploy/' \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude '.env*.local' \
  --exclude '*.tsbuildinfo' \
  "$SRC/" "$ROOT:${REMOTE_DIR}/app/"

log "compose file + secrets"
scp -q "$SRC/deploy/docker-compose.yml" "$ROOT:${REMOTE_DIR}/docker-compose.yml"
remote "bash -s" <<'REMOTE'
set -euo pipefail
cd /docker/csca-prep
if [[ ! -f .env ]]; then
  umask 077
  {
    echo "DB_USER=csca"
    echo "DB_PASSWORD=$(openssl rand -hex 24)"
    echo "DB_NAME=cscamaster"
    echo "JWT_SECRET=$(openssl rand -hex 32)"
    echo "APP_URL=https://www.cscamaster.com"
    echo "SITE_NAME=CSCA Master"
  } > .env
  chmod 600 .env
  echo "  generated .env with fresh secrets"
else
  echo "  .env exists — secrets kept"
fi
awk -F= '/^JWT_SECRET=/{print "  jwt secret length: " length($2)}' .env
REMOTE

log "docker compose build (first run takes several minutes)"
remote "cd ${REMOTE_DIR} && docker compose build 2>&1 | tail -20"

log "docker compose up -d"
remote "cd ${REMOTE_DIR} && docker compose up -d 2>&1 | tail -12"

log "waiting for health"
for i in $(seq 1 45); do
  state=$(remote "docker inspect -f '{{.State.Health.Status}}' csca-prep 2>/dev/null" || echo starting)
  printf '  %s  %s\n' "$(date +%H:%M:%S)" "${state:-starting}"
  [[ "$state" == "healthy" ]] && break
  if [[ "$i" == "45" ]]; then
    remote "cd ${REMOTE_DIR} && docker compose logs --tail 50 app"
    exit 1
  fi
  sleep 6
done

log "in-container origin check"
remote "docker exec csca-prep node -e \"fetch('http://127.0.0.1:3000/').then(async r=>{const t=await r.text();console.log('  http',r.status,'—',(t.match(/<title>([^<]*)/)||[])[1])})\""

log "deployed"
remote "cd ${REMOTE_DIR} && docker compose ps"
