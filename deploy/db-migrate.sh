#!/usr/bin/env bash
# Copy production data from the current host (Neon/Supabase/Vercel Postgres) into
# the csca-db container. Dump happens on the VPS in a throwaway postgres:17
# client container, so no local pg_dump is needed.
#
#   PROD_DATABASE_URL='postgresql://...' bash deploy/db-migrate.sh
set -euo pipefail

HOST="${HOST:-147.93.107.210}"
REMOTE_DIR="${REMOTE_DIR:-/docker/csca-prep}"
SRC_URL="${PROD_DATABASE_URL:?set PROD_DATABASE_URL to the current production database}"
SSH="ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 -o BatchMode=yes"
ROOT="root@${HOST}"

log() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }

log "dump source database (postgres:17 client on the VPS)"
$SSH "$ROOT" "bash -s" <<EOF
set -euo pipefail
cd /root
docker run --rm postgres:17-alpine pg_dump --version
docker run --rm -e PGURL='${SRC_URL}' postgres:17-alpine \\
  sh -c 'pg_dump --no-owner --no-privileges -Fc -d "\$PGURL"' > /root/csca-prod.dump
ls -lh /root/csca-prod.dump
EOF

log "restore into csca-db (existing local database is replaced)"
$SSH "$ROOT" "bash -s" <<'REMOTE'
set -euo pipefail
cd /docker/csca-prep
docker compose stop app >/dev/null 2>&1 || true
# keep the previous database for rollback
docker exec csca-db psql -U csca -d postgres -qc "DROP DATABASE IF EXISTS cscamaster_old" || true
docker exec csca-db psql -U csca -d postgres -qc "ALTER DATABASE cscamaster RENAME TO cscamaster_old" 2>/dev/null || true
docker exec csca-db psql -U csca -d postgres -qc "CREATE DATABASE cscamaster OWNER csca"
docker cp /root/csca-prod.dump csca-db:/tmp/csca-prod.dump
docker exec csca-db pg_restore --no-owner --no-privileges -U csca -d cscamaster /tmp/csca-prod.dump 2>&1 | tail -5 || true
docker exec csca-db psql -U csca -d cscamaster -tAc 'select (select count(*) from "User") || $$ users / $$ || (select count(*) from "Question") || $$ questions / $$ || (select count(*) from "Attempt") || $$ attempts$$'
docker exec csca-db rm -f /tmp/csca-prod.dump
REMOTE

log "schema reconcile (additive) + restart app"
$SSH "$ROOT" "bash -s" <<'REMOTE'
set -euo pipefail
cd /docker/csca-prep
docker compose up -d
sleep 5
docker compose exec -T app npx prisma db push
docker compose restart app
REMOTE

log "done"
echo "rollback: previous data kept in the cscamaster_old database inside csca-db"
