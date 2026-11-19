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
# ServerAlive* keeps a stalled connection from hanging the deploy forever — but
# the Docker build is silent for several minutes and saturates the CPU, so the
# window has to be generous: 30s x 20 = 10 minutes of silence tolerated.
SSH="ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=20 -o BatchMode=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=20"
ROOT="root@${HOST}"

log() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }
# Every remote call is wrapped in a timeout. A stalled SSH connection used to
# hang the whole deploy indefinitely — the server was fine, the socket was not.
remote() { timeout "${REMOTE_TIMEOUT:-300}" $SSH "$ROOT" "$@"; }

# Pick up a Cloudflare token from a gitignored file so the cache rule can be
# applied automatically without exporting it in every shell.
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
load_env_file "$SRC/deploy/.env" CLOUDFLARE_API_TOKEN
load_env_file "$SRC/deploy/.cloudflare-token" CLOUDFLARE_API_TOKEN
load_env_file "$HOME/.config/csca/cloudflare.env" CLOUDFLARE_API_TOKEN

log "rsync source -> ${ROOT}:${REMOTE_DIR}/app"
remote "install -d -m 0755 ${REMOTE_DIR}/app"

# The link to this VPS drops under sustained transfer: rsync stalls with an
# "io timeout" or the SSH banner exchange times out, which used to leave a
# half-synced tree and a hung script. Retry three times with --partial so a
# retry resumes instead of restarting, and cap bandwidth when the path is
# clearly degraded.
RSYNC_ARGS=(-az --delete --partial --timeout=60
  --exclude .git/ --exclude node_modules/ --exclude .next/ --exclude .pglite/
  --exclude .vercel/ --exclude deploy/ --exclude .env --exclude .env.local
  --exclude ".env*.local" --exclude "*.tsbuildinfo")
if [[ -n "${RSYNC_BWLIMIT:-}" ]]; then RSYNC_ARGS+=("--bwlimit=${RSYNC_BWLIMIT}"); fi

synced=0
for attempt in 1 2 3; do
  if rsync "${RSYNC_ARGS[@]}" "$SRC/" "$ROOT:${REMOTE_DIR}/app/"; then
    synced=1
    break
  fi
  if [[ "$attempt" == "3" ]]; then break; fi
  log "rsync attempt ${attempt} failed - retrying in 15s with a bandwidth cap"
  sleep 15
  RSYNC_ARGS+=("--bwlimit=1500")
done
if [[ "$synced" != "1" ]]; then
  echo "  rsync failed after 3 attempts. The previous build is still serving." >&2
  echo "  Re-run when the link recovers, or set RSYNC_BWLIMIT=800." >&2
  exit 1
fi
log "source synced"

log "compose file + secrets"
# scp was the step that silently killed a deploy: with `set -e`, a stalled copy
# aborted the script after rsync had already succeeded, leaving the old build in
# place. Retry, then fall back to streaming the file over ssh.
copied=0
for attempt in 1 2 3; do
  if timeout 90 scp -q -o ConnectTimeout=20 "$SRC/deploy/docker-compose.yml" "$ROOT:${REMOTE_DIR}/docker-compose.yml"; then
    copied=1
    break
  fi
  sleep 8
  if timeout 90 ssh -o BatchMode=yes -o ConnectTimeout=20 "$ROOT" "cat > ${REMOTE_DIR}/docker-compose.yml" < "$SRC/deploy/docker-compose.yml"; then
    copied=1
    break
  fi
  sleep 8
done
if [[ "$copied" != "1" ]]; then
  echo "  could not copy docker-compose.yml after 3 attempts" >&2
  exit 1
fi
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

# The schema has to match the code before the new container starts serving.
# `db push` is additive for the changes we make (a new column with a default,
# a new table) and it REFUSES destructive changes without --accept-data-loss,
# so a schema drift that would drop student data stops the deploy instead of
# silently deleting it.
#
# Two traps this step has to avoid:
#   * `prisma db push` has no --skip-generate flag in Prisma 7 — passing it
#     prints the help text and exits 0, which looks like success.
#   * piping the output into `tail` hides the real exit code. Capture the
#     output instead and check the command's own status.
log "database schema"
remote "cd ${REMOTE_DIR} && docker compose up -d db 2>&1 | tail -3"
if push_out=$(remote "cd ${REMOTE_DIR} && docker compose run --rm --no-deps -T app npx prisma db push" 2>&1); then
  echo "  schema in sync"
  printf '%s\n' "$push_out" | grep -iE "sync|in sync|already" | head -2 | sed 's/^/  /'
else
  echo "  schema push FAILED — the deploy is aborted before the app is replaced" >&2
  printf '%s\n' "$push_out" | tail -20 | sed 's/^/  /' >&2
  exit 1
fi

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

# Content parity is opt-in: the seed is idempotent and non-destructive, but it
# is a separate decision from shipping code. It needs SEED_ADMIN_PASSWORD in
# production and refuses to reset an existing admin password.
if [[ "${SEED_CONTENT:-0}" == "1" ]]; then
  log "seeding content (SEED_CONTENT=1)"
  remote "cd ${REMOTE_DIR} && docker compose exec -T app npm run db:seed 2>&1 | tail -12"
else
  log "skipping the content seed (set SEED_CONTENT=1 to run it)"
fi

# ── Edge cache ──────────────────────────────────────────────────────────
# Next prerenders the marketing pages, but Cloudflare does not cache HTML by
# default, so every request was reaching this VPS (measured TTFB 1.3–12.4 s).
# The cache rule is applied here so a deploy cannot silently leave the site
# uncached.
#
# Needs CLOUDFLARE_API_TOKEN (Zone → Cache Rules → Edit). If the token is not
# available the deploy still succeeds — it just warns.
if [[ -n "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  log "applying the Cloudflare cache rule"
  if bash "$SRC/deploy/cloudflare-cache.sh" apply; then
    echo "  cache rule applied"
  else
    echo "  WARNING: could not apply the cache rule — the site will be slow" >&2
  fi
  # The rule stores marketing HTML for a long time, so the new build would
  # not reach visitors until the TTL expired. Purge after shipping.
  log "purging the edge cache"
  bash "$SRC/deploy/cloudflare-cache.sh" --purge || \
    echo "  WARNING: cache purge failed — visitors may see the previous build" >&2
else
  log "skipping the Cloudflare cache rule (no CLOUDFLARE_API_TOKEN)"
  echo "  export CLOUDFLARE_API_TOKEN=... to have deploy.sh apply it automatically" >&2
fi

# ── Sitemap freshness ────────────────────────────────────────────────────
# Purging "everything" happens *before* the edge re-caches; a sitemap fetched in
# that window can be cached as the previous build's URL list. Purge the file
# again and assert the count, so a deploy cannot leave crawlers on a stale map.
if [[ -n "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  log "sitemap check"
  ZONE_ID=$(curl -s -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    "https://api.cloudflare.com/client/v4/zones?name=cscamaster.com" \
    | sed -n 's/.*"id":"\([a-f0-9]\{32\}\)".*/\1/p' | head -1)
  if [[ -n "$ZONE_ID" ]]; then
    curl -s -o /dev/null -X POST \
      -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
      -H "Content-Type: application/json" \
      --data '{"files":["https://www.cscamaster.com/sitemap.xml","https://www.cscamaster.com/robots.txt"]}' \
      "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache"
    live=$(curl -s "https://www.cscamaster.com/sitemap.xml" | grep -c "<loc>")
    # Ask the container, not the machine running the deploy — the dev server is
    # not running during a deploy, so a localhost probe always reported 0.
    origin_count=$(remote "docker exec csca-prep node -e \"fetch('http://127.0.0.1:3000/sitemap.xml').then(r=>r.text()).then(t=>console.log((t.match(/<loc>/g)||[]).length))\"" 2>/dev/null | tr -dc '0-9' || echo "?")
    echo "  live sitemap: ${live} URLs (container: ${origin_count:-?})"
    if [[ -n "${origin_count}" && "${origin_count}" != "?" && "${live}" != "${origin_count}" ]]; then
      echo "  WARNING: edge sitemap (${live}) does not match the container (${origin_count}) — purge may be lagging"
    fi
  fi
fi

log "deployed"
remote "cd ${REMOTE_DIR} && docker compose ps"
