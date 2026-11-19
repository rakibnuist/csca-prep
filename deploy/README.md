# Hostinger VPS deployment (Docker + Traefik)

> **Status: live.** `cscamaster.com` and `www.cscamaster.com` are served from
> `147.93.107.210` since 2026-10-29, via the Cloudflare zone
> `9d5035c870e025eb209a9012d1867ad6` (account: new, NS `dom.ns.cloudflare.com` +
> `haley.ns.cloudflare.com`). Vercel no longer receives traffic; the old zone
> (`hans`/`maleah`) and its records are untouched and remain the rollback.

The app now runs on the existing Hostinger VPS `srv1774770.hstr.cloud`
(`147.93.107.210`, KVM 2) as a Docker Compose project behind the Traefik edge
that already serves `eduexpress`, `crm`, `n8n` on ports 80/443.

No nginx, no certbot, no systemd unit: Traefik owns the ports and issues the
Let's Encrypt certificate via its `letsencrypt` HTTP-01 resolver.

## Live layout

```
/docker/csca-prep/
├── docker-compose.yml     # csca-prep app + csca-db postgres:16
├── .env                   # DB_PASSWORD, JWT_SECRET (generated, 600)
└── app/                   # build context, rsynced from this checkout
```

| Container | Image | Notes |
|---|---|---|
| `csca-prep` | `csca-prep:latest` | Next.js 16, port 3000, healthcheck on `/` |
| `csca-db` | `postgres:16-alpine` | volume `csca-prep_csca-db`, healthcheck `pg_isready` |

Two routers on the app container:

| Router | Rule | Behaviour |
|---|---|---|
| `csca` | `Host(www.cscamaster.com)` | serves the app, adds HSTS (`max-age=31536000`) |
| `csca-apex` | `Host(cscamaster.com)` | 301 to `https://www.cscamaster.com`, path preserved |

Both declare `tls.domains[0].main=cscamaster.com` + `sans=www.cscamaster.com`.
**That is mandatory** — Traefik cannot derive certificate domains from an
OR-ed `Host()` rule, so without the explicit SANs ACME is never attempted and
the edge keeps falling back to `TRAEFIK DEFAULT CERT`.

Certificate: Let's Encrypt via the shared `letsencrypt` HTTP-01 resolver,
stored in the `traefik-gyx5` volume. Renewal is automatic.

## Commands

```bash
bash deploy/deploy.sh                # rsync + docker compose build + up (idempotent)
bash deploy/verify.sh                # containers, routes, db counts, traefik, public dns
PROD_DATABASE_URL='postgresql://…' bash deploy/db-migrate.sh   # import live data (replaces seed)
CLOUDFLARE_API_TOKEN='…' bash deploy/dns-switch.sh            # cut DNS over (needs Zone.DNS Edit)
CLOUDFLARE_API_TOKEN='…' bash deploy/cloudflare-cache.sh      # cache marketing pages (needs Zone.Cache Rules Edit)
```

## AI crawlers and `llms.txt`

The site ships `/llms.txt` and `/llms-full.txt` on purpose — they are the
answer-engine surface, and the SEO strategy in the main README depends on
them.

**But Cloudflare's Managed robots.txt blocks every AI agent by default.** The
live `robots.txt` currently contains Cloudflare's block list for `GPTBot`,
`ClaudeBot`, `Google-Extended`, `PerplexityBot`, `ChatGPT-User`,
`Claude-User` and ~40 others, prepended to our own `src/app/robots.ts`. The
site's own robots.txt allows them; Cloudflare's managed layer overrides it.

This is not scriptable with an API token — it is a zone toggle:

1. Cloudflare dashboard → **cscamaster.com** → **Settings → Bots → AI Crawl
   Control** (older UI: *Settings → Bots → Content Signals*).
2. Either turn off the managed robots.txt, or allow-list the bots you want.

**Recommended position — allow reference, block training.** This matches
Cloudflare's own content signal (`search=yes, ai-train=no, use=reference`):

| Bot group | Verdict |
|---|---|
| `ChatGPT-User`, `Claude-User`, `Perplexity-User`, `Google-CloudVertexBot`, `Firecrawl` | **allow** — these fetch pages to answer questions, which is the traffic you want |
| `GPTBot`, `ClaudeBot`, `Google-Extended`, `Amazonbot`, `CCBot`, `Bytespider` | **keep blocked** — these train models |

Until that toggle is flipped, the AI-crawler strategy is switched off. The
site side is ready: `src/app/robots.ts` allows the public pages, and both
`llms.txt` files carry a build-time "Last updated" date so they never go stale.

---

## Capacity: one Node process is enough (measured)

The app runs as a single `next start` process on a 2 vCPU / 8 GB VPS. Before
adding workers or a load balancer, the current setup was measured:

| Test | Result |
|---|---|
| `GET /` through Traefik, from the VPS | **ttfb 26–29 ms**, total 30 ms |
| `GET /` through Cloudflare → origin, from the VPS | **ttfb 77–223 ms** |
| `GET /api/me` (DB-backed route) | **80–110 ms** |
| 60 requests, concurrency 20, DB-backed | 259 ms total · **p50 44 ms · p95 100 ms** · 0 errors |
| 200 requests, concurrency 50, DB-backed | 431 ms total · **p50 62 ms · p95 201 ms · max 242 ms** · 0 errors |
| Sustained **50 req/s for 15 s** | **738 requests, 0 errors** · p50 4 ms · p95 5 ms · worst 79 ms |
| Container CPU during all of the above | **0.00–0.02 %** · load average 0.21 on 2 vCPU |

The single process is nowhere near its limit, so **workers were not added** —
they would have multiplied the Prisma connection pool and the health-check
surface for no measurable gain. Re-run `deploy/loadtest.sh` on the VPS if the
numbers ever change.

The one thing worth watching is the **edge cache**, not the origin: with the
Cache Rule in place the marketing pages are served by Cloudflare and never
touch the VPS at all, which is why the origin can stay this quiet.

> A note on measuring from a laptop or CI runner: a slow link can add 5–30 s
> to a *cached* response because the body download is throttled, which makes
> the origin look far slower than it is. Measure from the VPS, or compare
> `cf-cache-status` rather than wall-clock time.

---

## Deploy gotchas (all three have bitten this pipeline)

**1. `prisma db push` has no `--skip-generate` flag in Prisma 7.** Passing it
prints the help text and exits **0** — which looks exactly like success. The
schema is never applied, and the new code then crashes on every DB-backed
route. `deploy.sh` now captures the output and checks the command's own exit
code:

```bash
if push_out=$(remote "… npx prisma db push" 2>&1); then
```

**2. Piping a remote command into `tail` hides its exit code.** `remote "… | tail -6"`
always returns `tail`'s status (0). Any check that matters must capture the
output and test `$?` of the command itself, not of a pipe.

**3. The edge cache will serve the previous build after a deploy.** The cache
rule stores marketing HTML at the edge, so a deploy is invisible to visitors
until the TTL expires or the cache is purged. Two defences are in place:

- the rule uses `edge_ttl: override_origin, default: 3600` — one hour, not
  the `s-maxage=31536000` Next sends — so a missed purge self-heals within an
  hour instead of stranding the old build for a year;
- `deploy.sh` purges the cache after every deploy.

Purge by wildcard alone (`https://www.cscamaster.com/*`) was observed to leave
the root document cached on some edges, so the purge sends the wildcard **and**
the explicit URLs.

---

## Edge caching (important)

**Constraint: the pages in the cache rule's allow-list must stay static.** A
server-side session read (e.g. `getCurrentUser()`) makes a route dynamic, and
a dynamic response must never be served from a shared cache — it would leak
one visitor's state to the next.

`/pricing` needs to know whether the visitor is signed in (the Pro CTA points
at coupon redemption rather than sign-up). It does this with a **client
island** — `src/components/site/pro-cta.tsx` — not a server-side session read,
so the page stays prerendered and edge-cacheable. The marketing navbar uses the
same pattern. If you add a session read to a cached page, remove it from the
allow-list at the same time.

Next.js prerenders the marketing pages and sends
`cache-control: s-maxage=31536000`, but Cloudflare does not cache HTML by
default. Until the cache rule below was applied, every page view went
Cloudflare → Traefik → Docker → a single `next start` process on the VPS, and
measured TTFB was **1.3–12.4 s** (total 5–30 s). The renderer trace itself was
clean (zero long tasks) — the delay was entirely origin-bound.

With the rule in place, all 20 public routes report `cf-cache-status: HIT` at
**0.41–0.81 s TTFB** from a normal connection, and the origin is not involved
at all.```bash
CLOUDFLARE_API_TOKEN='…' bash deploy/cloudflare-cache.sh --dry-run   # inspect
CLOUDFLARE_API_TOKEN='…' bash deploy/cloudflare-cache.sh             # apply
CLOUDFLARE_API_TOKEN='…' bash deploy/cloudflare-cache.sh --verify    # check HIT/DYNAMIC
CLOUDFLARE_API_TOKEN='…' bash deploy/cloudflare-cache.sh --remove    # revert
```

The token can also be saved so you never have to export it again — the script
and `deploy.sh` both read the first of these that exists:

```bash
echo '<token>' > deploy/.cloudflare-token     # gitignored, mode 600
# or
echo 'CLOUDFLARE_API_TOKEN=<token>' > deploy/.env
# or
mkdir -p ~/.config/csca && echo 'CLOUDFLARE_API_TOKEN=<token>' > ~/.config/csca/cloudflare.env
```

> **Gotcha: editing a token rotates its secret.** If you open a token in the
> Cloudflare dashboard, change anything and Save, Cloudflare issues a **new**
> token string and the one you saved stops working ("Invalid API Token",
> code 1000). Finish all edits first, then copy the token, then save it — and
> don't edit it again. Test a candidate without touching the file:
>
> ```bash
> bash deploy/check-token.sh 'cfut_xxx'
> ```
>
> Also note that a token with an **IP address filter** rejects requests from
> other addresses with the same "Invalid API Token" message. If the token
> works from one machine and not another, clear the IP filter.

Token scope: **Zone → Cache Rules → Edit** plus **Zone → Zone → Read**, scoped
to `cscamaster.com`. The API rejects a `cache_key.custom_key` block on this
account, so the rule uses the default cache key (request host + URL) — which is
what we want, since the marketing pages are identical for every visitor and
set no cookie. The edge TTL is `override_origin / 3600s`.

Note that Cloudflare's HTML cache does **not** distinguish the document
response from Next's RSC prefetch payload by header — but it does by query
string (`?_rsc=…`), so the two are cached separately and each is served with
the right content type. Verified: a normal request returns `text/html` with
`<html>`, a prefetch returns `text/x-component` without it.

Two helper scripts are included:

```bash
bash deploy/cache-check.sh   # warm every marketing path, print cache status
bash deploy/cache-ab.sh      # A/B the edge against the origin directly
```

`deploy/deploy.sh` applies the rule automatically at the end of every deploy
when `CLOUDFLARE_API_TOKEN` is available, so a deploy cannot silently leave the
site uncached. `deploy/verify.sh` checks it afterwards and fails if the
marketing pages are still `DYNAMIC` or if `/api/me` is cached at the edge.

The rule is an explicit path allow-list (`/`, `/csca`, `/syllabus*`,
`/guides*`, `/tools/*`, `/pricing`, `/about`, `/contact`, `/llms*.txt`,
`/sitemap.xml`, `/robots.txt`, …). The student app, the exam runner, the admin
area, the auth pages and every API route are **not** matched, so no
`Set-Cookie` response can be stored at the edge. `next.config.ts` marks those
same routes `no-store` as a second layer, and the marketing routes
`s-maxage=86400, stale-while-revalidate=604800`.

Check it worked:

```bash
curl -sSI https://www.cscamaster.com/ | grep -i cf-cache-status   # HIT (after the first request)
curl -sSI https://www.cscamaster.com/app/dashboard | grep -i cf-cache-status   # DYNAMIC
```

If Cloudflare's plan or zone settings prevent the rule from applying, the
fallback is a Worker or the "Cache Everything" toggle — but keep the path
allow-list, never cache the whole zone.

## Fonts are vendored, not fetched

The Inter / Sora / Geist Mono `woff2` files live in `src/fonts/` and are loaded
with `next/font/local`. `next/font/google` downloads them from
fonts.googleapis.com **at build time**, which made `next build` fail outright
whenever the build host could not reach Google — and the Docker build runs on
this VPS. Vendoring the binaries removes that dependency and keeps the fonts
self-hosted (no third-party request, no GDPR surface).

To change a font, drop the new `woff2` into `src/fonts/` and update the
`localFont()` calls in `src/app/layout.tsx`.

## Secrets on the server

`/docker/csca-prep/.env` (mode 600) holds:

| Variable | Notes |
|---|---|
| `DB_PASSWORD` | generated on first deploy |
| `JWT_SECRET` | `openssl rand -hex 32` — **32+ characters**. The app refuses to start with a shorter value, and refuses the published example secret outright. |
| `SEED_ADMIN_PASSWORD` | required before `npm run db:seed` in production. The seed refuses to run without it and never resets an existing admin password. |
| `CLOUDFLARE_API_TOKEN` | optional. If present, `deploy.sh` applies the cache rule on every deploy. |

On the server:

```bash
cd /docker/csca-prep
docker compose ps
docker compose logs -f app
docker compose exec app npx prisma db push        # schema
docker compose exec app npm run db:seed           # content (⚠ resets demo accounts)
docker compose exec -T app npx prisma studio &    # optional
```

## Data

The database starts empty. Import the current production data with
`db-migrate.sh` (`PROD_DATABASE_URL` from Vercel → Settings → Environment
Variables). It dumps through a throwaway `postgres:17` client container, renames
the existing database to `cscamaster_old`, restores, then reconciles the schema.

Only seed (`npm run db:seed`) if you deliberately want the demo dataset instead;
the seed resets `admin@cscamaster.com` and `student@cscamaster.com` to
`password123`.

## Cutover and rollback

1. Cloudflare DNS for `cscamaster.com`: `A @` → `147.93.107.210` (proxied),
   `A www` → `147.93.107.210` (proxied); delete the Vercel records.
2. SSL/TLS mode stays **Full (strict)** — Traefik presents a valid Let's Encrypt cert.
3. `bash deploy/verify.sh` should report 200 and "origin is no longer Vercel".
4. Rollback: point the same records back at Vercel (`76.76.21.21` for `@`,
   `cname.vercel-dns.com` proxied for `www`). The Vercel project and its database
   are untouched.

## Notes

- `NEXT_PUBLIC_*` values are compiled into the bundle — change them in
  `docker-compose.yml` build args and rebuild, not just restart.
- The Docker build runs on the VPS (`npm ci` + `next build`, several minutes);
  the repo's `node_modules` and `.next` are never uploaded.
- Ports stay internal: the containers publish nothing, Traefik reaches them over
  the default bridge network by label discovery (`exposedbydefault=false`).
- Postgres is not exposed to the host; use `docker compose exec csca-db psql`.
- Backups: `docker compose exec -T csca-db pg_dump -U csca -Fc cscamaster > /root/backups/csca-$(date +\%F).dump`
