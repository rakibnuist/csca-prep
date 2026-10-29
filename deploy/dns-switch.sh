#!/usr/bin/env bash
# Point cscamaster.com (+ www) at the Hostinger VPS through the Cloudflare API,
# then watch Traefik obtain the Let's Encrypt certificate.
#
#   CLOUDFLARE_API_TOKEN=... bash deploy/dns-switch.sh
#   CLOUDFLARE_API_TOKEN=... bash deploy/dns-switch.sh --rollback
#
# Token scope: Zone → DNS → Edit, Zone → Zone → Read, for zone cscamaster.com.
set -euo pipefail

HOST="${HOST:-147.93.107.210}"
DOMAIN="${DOMAIN:-cscamaster.com}"
MODE="${1:-switch}"
API="https://api.cloudflare.com/client/v4"

# Two accepted credential styles:
#   CLOUDFLARE_API_TOKEN            (scoped token — preferred)
#   CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL   (global key)
AUTH=()
if [[ -n "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  AUTH=(-H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}")
elif [[ -n "${CLOUDFLARE_API_KEY:-}" && -n "${CLOUDFLARE_EMAIL:-}" ]]; then
  AUTH=(-H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" -H "X-Auth-Key: ${CLOUDFLARE_API_KEY}")
else
  echo "need CLOUDFLARE_API_TOKEN (Zone.DNS Edit), or CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL" >&2
  exit 1
fi

cf() { # cf <method> <path> [body]
  local method="$1" path="$2" body="${3:-}"
  if [[ -n "$body" ]]; then
    curl -sS -X "$method" "$API$path" "${AUTH[@]}" \
      -H 'Content-Type: application/json' -d "$body"
  else
    curl -sS -X "$method" "$API$path" "${AUTH[@]}"
  fi
}

zone_id=$(cf GET "/zones?name=${DOMAIN}" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);if(!j.success||!j.result?.[0]){console.error(JSON.stringify(j.errors||j));process.exit(1)}console.log(j.result[0].id)})')
echo "zone ${DOMAIN}: ${zone_id}"

set_record() { # set_record <name> <ip>
  local name="$1" ip="$2" rec rec_id
  rec=$(cf GET "/zones/${zone_id}/dns_records?type=A&name=${name}")
  rec_id=$(echo "$rec" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);console.log(j.result?.[0]?.id??"")})')
  if [[ -n "$rec_id" ]]; then
    cf PATCH "/zones/${zone_id}/dns_records/${rec_id}" \
      "{\"type\":\"A\",\"name\":\"${name}\",\"content\":\"${ip}\",\"proxied\":true,\"ttl\":1}" >/dev/null
    echo "  PATCH ${name} A -> ${ip} (proxied)"
  else
    cf POST "/zones/${zone_id}/dns_records" \
      "{\"type\":\"A\",\"name\":\"${name}\",\"content\":\"${ip}\",\"proxied\":true,\"ttl\":1}" >/dev/null
    echo "  CREATE ${name} A -> ${ip} (proxied)"
  fi
}

ensure_caa() {
  local existing
  existing=$(cf GET "/zones/${zone_id}/dns_records?type=CAA&name=${DOMAIN}")
  if echo "$existing" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const r=JSON.parse(s).result||[];process.exit(r.some(x=>/letsencrypt/.test(x.data?.value||""))?0:1)})'; then
    echo "  CAA already allows letsencrypt"
  else
    cf POST "/zones/${zone_id}/dns_records" \
      "{\"type\":\"CAA\",\"name\":\"${DOMAIN}\",\"data\":{\"flags\":0,\"tag\":\"issue\",\"value\":\"letsencrypt.org\"},\"ttl\":1}" >/dev/null
    echo "  CREATE CAA @ issue letsencrypt.org"
  fi
}

set_ssl_strict() {
  cf PATCH "/zones/${zone_id}/settings/ssl" '{"value":"strict"}' >/dev/null && echo "  SSL/TLS mode -> Full (strict)"
}

if [[ "$MODE" == "--dry-run" ]]; then
  echo "current records (no changes made):"
  cf GET "/zones/${zone_id}/dns_records?per_page=100" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);for(const r of j.result)console.log("  ",r.type.padEnd(6),r.name.padEnd(28),r.content,r.proxied?"proxied":"dns-only")})'
  echo
  echo "would set:  A @ -> ${HOST} (proxied)   A www -> ${HOST} (proxied)"
  exit 0
fi

if [[ "$MODE" == "--rollback" ]]; then
  echo "rolling back to Vercel"
  set_record "${DOMAIN}" "76.76.21.21"
  cf DELETE "/zones/${zone_id}/dns_records/$(cf GET "/zones/${zone_id}/dns_records?type=A&name=www.${DOMAIN}" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{console.log(JSON.parse(s).result?.[0]?.id??"")})')" >/dev/null || true
  cf POST "/zones/${zone_id}/dns_records" \
    "{\"type\":\"CNAME\",\"name\":\"www.${DOMAIN}\",\"content\":\"cname.vercel-dns.com\",\"proxied\":true,\"ttl\":1}" >/dev/null
  echo "  www -> cname.vercel-dns.com (proxied)"
else
  echo "switching to the VPS ${HOST}"
  set_record "${DOMAIN}" "$HOST"
  set_record "www.${DOMAIN}" "$HOST"
  ensure_caa
  set_ssl_strict
  status=$(cf GET "/zones/${zone_id}" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).result?.status??"?"))')
  echo "  zone status: ${status}"
fi

echo
echo "current A records:"
cf GET "/zones/${zone_id}/dns_records?type=A" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{for(const r of JSON.parse(s).result)console.log("  ",r.name,"->",r.content,r.proxied?"proxied":"dns-only")})'

echo
echo "watching for the Traefik certificate (up to 3 min)"
for i in $(seq 1 18); do
  if ssh -o BatchMode=yes -o ConnectTimeout=10 "root@${HOST}" \
      "docker logs traefik-gyx5-traefik-1 --since 3m 2>&1 | grep -qi 'certificate obtained\|csca.*cert'"; then
    echo "  certificate issued"
    break
  fi
  printf '  %s waiting...\n' "$(date +%H:%M:%S)"
  sleep 10
done

echo
echo "verify with: bash deploy/verify.sh"
