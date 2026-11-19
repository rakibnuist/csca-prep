#!/usr/bin/env bash
# Finish a deploy when the build already completed but the SSH link dropped.
# Runs the same steps as deploy.sh, minus the build.
set -euo pipefail

HOST="${HOST:-147.93.107.210}"
REMOTE_DIR="${REMOTE_DIR:-/docker/csca-prep}"
SSH="ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=25 -o BatchMode=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=20"
ROOT="root@${HOST}"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

log() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }

log "database schema"
if push_out=$($SSH "$ROOT" "cd ${REMOTE_DIR} && docker compose run --rm --no-deps -T app npx prisma db push" 2>&1); then
  echo "  schema in sync"
  printf '%s\n' "$push_out" | grep -iE "in sync|already" | head -2 | sed 's/^/  /'
else
  echo "  schema push FAILED — aborting before the app is replaced" >&2
  printf '%s\n' "$push_out" | tail -20 | sed 's/^/  /' >&2
  exit 1
fi

log "docker compose up -d"
$SSH "$ROOT" "cd ${REMOTE_DIR} && docker compose up -d 2>&1 | tail -8"

log "waiting for health"
for i in $(seq 1 45); do
  state=$($SSH "$ROOT" "docker inspect -f '{{.State.Health.Status}}' csca-prep 2>/dev/null" || echo starting)
  printf '  %s  %s\n' "$(date +%H:%M:%S)" "${state:-starting}"
  [[ "$state" == "healthy" ]] && break
  if [[ "$i" == "45" ]]; then
    $SSH "$ROOT" "cd ${REMOTE_DIR} && docker compose logs --tail 50 app"
    exit 1
  fi
  sleep 6
done

log "in-container origin check"
$SSH "$ROOT" "docker exec csca-prep node -e \"fetch('http://127.0.0.1:3000/').then(async r=>{const t=await r.text();console.log('  http',r.status,'—',(t.match(/<title>([^<]*)/)||[])[1])})\""

log "applying the Cloudflare cache rule + purging the edge"
bash "$SRC/deploy/cloudflare-cache.sh" apply
bash "$SRC/deploy/cloudflare-cache.sh" --purge

log "deployed"
$SSH "$ROOT" "cd ${REMOTE_DIR} && docker compose ps"
