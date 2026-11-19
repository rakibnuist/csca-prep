#!/usr/bin/env bash
# A/B the Cloudflare edge against the origin, from the same machine.
#
#   edge   : normal DNS  -> Cloudflare edge cache
#   origin : --resolve to the VPS IP, bypassing Cloudflare entirely
#
# Both requests carry the same Host/SNI, so the only difference is the CDN.
set -uo pipefail

HOST="www.cscamaster.com"
ORIGIN="${ORIGIN:-147.93.107.210}"
PATHS=("/" "/csca" "/syllabus" "/pricing")

run() { # run <edge|origin> <path> <n>
  local mode="$1" p="$2" n="${3:-3}"
  local out=""
  local i
  for ((i = 0; i < n; i++)); do
    if [[ "$mode" == "edge" ]]; then
      out=$(curl -sS -o /dev/null --max-time 90 \
        -w '%{time_starttransfer} %{time_total}\n' "https://${HOST}${p}" 2>/dev/null | tail -1)
    else
      out=$(curl -sS -o /dev/null --max-time 90 \
        --resolve "${HOST}:443:${ORIGIN}" \
        -w '%{time_starttransfer} %{time_total}\n' "https://${HOST}${p}" 2>/dev/null | tail -1)
    fi
    printf '%s\n' "$out"
  done | awk -v p="$p" -v m="$mode" '
    NF==2 { ttfb += $1; total += $2; n++ }
    END {
      if (n == 0) { printf "  %-7s %-12s (no response)\n", m, p; exit }
      printf "  %-7s %-12s avg ttfb=%6.2fs   avg total=%6.2fs   (n=%d)\n", m, p, ttfb/n, total/n, n
    }'
}

echo "=== timing: Cloudflare edge vs. origin (3 requests each, same machine) ==="
for p in "${PATHS[@]}"; do
  run edge "$p" 3
  run origin "$p" 3
  echo
done
