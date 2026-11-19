#!/usr/bin/env bash
# Roll the app back to the image that was running before the current deploy.
#
#   bash deploy/rollback.sh
#
# The previous image is kept on disk by Docker after a rebuild (it becomes
# dangling), so this re-tags it and restarts the service.
set -euo pipefail

HOST="${HOST:-147.93.107.210}"
REMOTE_DIR="${REMOTE_DIR:-/docker/csca-prep}"
PREVIOUS_IMAGE="${PREVIOUS_IMAGE:-sha256:c404953b58934ef4bd72f8a0853d5bc9de9c96f4dbe30b3fb41ae7c40a9e7b03}"
SSH="ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 -o BatchMode=yes"
ROOT="root@${HOST}"

echo "==> rolling back to ${PREVIOUS_IMAGE}"
$SSH "$ROOT" "docker tag ${PREVIOUS_IMAGE} csca-prep:latest && cd ${REMOTE_DIR} && docker compose up -d 2>&1 | tail -6"
echo
echo "==> waiting for health"
for i in $(seq 1 30); do
  state=$($SSH "$ROOT" "docker inspect -f '{{.State.Health.Status}}' csca-prep 2>/dev/null" || echo starting)
  echo "  $state"
  [[ "$state" == "healthy" ]] && break
  sleep 6
done
echo
echo "==> done — run: bash deploy/verify.sh"
