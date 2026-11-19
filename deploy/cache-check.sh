#!/usr/bin/env bash
# Verify the cache rule on the live site: warm each path, then report the
# second request's cache status and timing.
set -uo pipefail

PATHS=(
  "/" "/csca" "/exam-dates" "/syllabus" "/scholarships" "/requirements"
  "/tips" "/sample-questions" "/free-exam" "/question-papers" "/guides"
  "/glossary" "/pricing" "/about" "/contact" "/syllabus/math"
  "/tools/score-calculator" "/robots.txt" "/sitemap.xml" "/llms.txt"
)

probe() {
  local p="$1"
  # Warm the cache (ignore the result).
  curl -sS -o /dev/null --max-time 90 "https://www.cscamaster.com${p}" 2>/dev/null
  sleep 1
  curl -sS -o /dev/null -D - --max-time 90 -w '%{time_starttransfer}' \
    "https://www.cscamaster.com${p}" 2>/dev/null \
    | tr -d '\r' \
    | awk -v p="$p" 'tolower($1)=="cf-cache-status:"{s=$2} $0 ~ /^[0-9.]+$/{t=$0} END{printf "  %-26s %-9s ttfb=%ss\n", p, (s==""?"(none)":s), (t==""?"?":t)}'
}

export -f probe
printf '%s\n' "${PATHS[@]}" | xargs -P 6 -I{} bash -c 'probe "$@"' _ {}
