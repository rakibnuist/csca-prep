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
```

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
