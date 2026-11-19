#!/usr/bin/env bash
# Load test the CSCA origin: how far can one Node process go?
set -uo pipefail

stats() { docker stats --no-stream --format "  {{.Name}} CPU={{.CPUPerc}} MEM={{.MemUsage}}" csca-prep csca-db; }
load() { uptime | sed 's/.*load average/  load average/'; }

echo "=== BEFORE ==="; stats; load

hit() { # hit <url> <n> <concurrency>
  local url="$1" n="$2" c="$3"
  local start end
  start=$(date +%s.%N)
  for ((i = 0; i < n; i++)); do
    curl -sS -o /dev/null --max-time 30 "$url" &
    if (( i % c == c - 1 )); then wait -n 2>/dev/null || true; fi
  done
  wait
  end=$(date +%s.%N)
  awk -v s="$start" -v e="$end" -v n="$n" 'BEGIN{printf "  %d reqs in %.2fs = %.0f req/s\n", n, e-s, n/(e-s)}'
}

echo
echo "=== A: 60 concurrent hits -> /api/me (DB-backed, per-user route) ==="
docker exec csca-prep node -e "
const N=60, C=20;
const t=Date.now();
let done=0, worst=0, times=[];
(async () => {
  const worker = async () => {
    while (done < N) {
      done++;
      const s=Date.now();
      const r=await fetch('http://127.0.0.1:3000/api/me');
      await r.text();
      times.push(Date.now()-s);
    }
  };
  await Promise.all(Array.from({length:C}, worker));
  times.sort((a,b)=>a-b);
  console.log('  ' + N + ' reqs, concurrency ' + C + ', total ' + (Date.now()-t) + 'ms');
  console.log('  p50=' + times[Math.floor(times.length*0.5)] + 'ms  p95=' + times[Math.floor(times.length*0.95)] + 'ms  max=' + times[times.length-1] + 'ms');
})();
"
stats; load

echo
echo "=== B: 40 concurrent hits -> / (prerendered marketing page) ==="
docker exec csca-prep node -e "
const N=40, C=20;
const t=Date.now();
let done=0, times=[];
(async () => {
  const worker = async () => {
    while (done < N) {
      done++;
      const s=Date.now();
      const r=await fetch('http://127.0.0.1:3000/');
      await r.text();
      times.push(Date.now()-s);
    }
  };
  await Promise.all(Array.from({length:C}, worker));
  times.sort((a,b)=>a-b);
  console.log('  ' + N + ' reqs, concurrency ' + C + ', total ' + (Date.now()-t) + 'ms');
  console.log('  p50=' + times[Math.floor(times.length*0.5)] + 'ms  p95=' + times[Math.floor(times.length*0.95)] + 'ms  max=' + times[times.length-1] + 'ms');
})();
"
stats; load

echo
echo "=== C: 200 requests at concurrency 50 -> /api/me ==="
docker exec csca-prep node -e "
const N=200, C=50;
const t=Date.now();
let done=0, times=[], errs=0;
(async () => {
  const worker = async () => {
    while (done < N) {
      done++;
      const s=Date.now();
      try { const r=await fetch('http://127.0.0.1:3000/api/me'); await r.text(); times.push(Date.now()-s); }
      catch { errs++; }
    }
  };
  await Promise.all(Array.from({length:C}, worker));
  times.sort((a,b)=>a-b);
  console.log('  ' + N + ' reqs, concurrency ' + C + ', total ' + (Date.now()-t) + 'ms, errors=' + errs);
  console.log('  p50=' + times[Math.floor(times.length*0.5)] + 'ms  p95=' + times[Math.floor(times.length*0.95)] + 'ms  max=' + times[times.length-1] + 'ms');
})();
"
stats; load

echo
echo "=== D: sustained 50 req/s for 15s against /api/me ==="
docker exec csca-prep node -e "
const t=Date.now();
let sent=0, errs=0, worst=0, times=[];
(async () => {
  while (Date.now() - t < 15000) {
    const s=Date.now();
    try { const r=await fetch('http://127.0.0.1:3000/api/me'); await r.text(); times.push(Date.now()-s); }
    catch { errs++; }
    worst=Math.max(worst, Date.now()-s);
    sent++;
    const wait=20 - (Date.now()-s);
    if (wait>0) await new Promise(r=>setTimeout(r,wait));
  }
  times.sort((a,b)=>a-b);
  console.log('  sent=' + sent + ' errors=' + errs + ' worst=' + worst + 'ms');
  console.log('  p50=' + times[Math.floor(times.length*0.5)] + 'ms  p95=' + times[Math.floor(times.length*0.95)] + 'ms');
})();
"
stats; load
