# cscamaster.com — Cloudflare account situations

Registrar is Hostinger. Nameservers point at `hans.ns.cloudflare.com` /
`maleah.ns.cloudflare.com`; the Cloudflare account that owns that zone is unknown.
Public DNS is minimal, so any path is cheap:

```
A     @        172.67.188.94 / 104.21.40.205     (proxied, Vercel behind CF)
AAAA  @        2606:4700:303x::…                 (Cloudflare proxy addresses)
A     www      same
CAA   @        0 issue "letsencrypt.org" (plus ssl.com, digicert, sectigo, globalsign, pki.goog, comodoca)
—     no MX, no TXT, no other subdomains
```

Because there is no mail and no other hostname, nothing but `@` and `www` has to
survive the move.

## Path A — recover the existing account (fastest if it works)

https://dash.cloudflare.com/forgot-password → **Recover account by domain** →
`cscamaster.com`: Cloudflare emails the masked owner address of that zone. The
registrant email on the domain is `rakibabdullah01@gmail.com`, so that inbox is
the likely owner. Then log in and edit the two A records (see `README.md`).

## Path B — new Cloudflare account, same registrar

Zero downtime if records are created **before** the nameserver flip.

1. New Cloudflare account → **Add a site** → `cscamaster.com` → plan **Free**.
2. Cloudflare shows the assigned pair, e.g. `xxx.ns.cloudflare.com` +
   `yyy.ns.cloudflare.com`. Write them down.
3. In the new zone create the records, still inert until NS change:

   | Type | Name | Content | Proxy |
   |---|---|---|---|
   | A | `@` | `147.93.107.210` | Proxied |
   | A | `www` | `147.93.107.210` | Proxied |
   | CAA | `@` | `0 issue "letsencrypt.org"` | — |

   SSL/TLS → Overview → **Full (strict)** (Traefik presents a Let's Encrypt cert).
4. Hostinger hPanel → Domains → `cscamaster.com` → **DNS / Nameservers** →
   change nameservers to the new pair. Old pair keeps answering until this flips,
   so the live site stays up.
5. Wait for the zone to go **Active** (usually minutes; allow up to 24 h). Then
   Traefik completes ACME HTTP-01 against the origin and the site is served from
   the VPS.
6. `bash deploy/verify.sh` from the laptop.

## Path C — drop Cloudflare, use Hostinger DNS

Fewer moving parts, no proxy/CDN/WAF, and ACME never traverses a proxy:

1. hPanel → Domains → `cscamaster.com` → DNS / Nameservers → use Hostinger
   nameservers (`ns1.dns-parking.com`, `ns2.dns-parking.com`).
2. In Hostinger DNS add `A @ → 147.93.107.210` and `A www → 147.93.107.210`,
   TTL 300. Nothing else exists, so nothing else to recreate.
3. Traefik issues the certificate as soon as the records resolve.

DNS-only until the cutover: public traffic still lands on Vercel, so any of the
three paths can be prepared without touching the live site.

## Recommendation

Path A first (one email, no NS change). If that inbox has no Cloudflare account,
Path B — it keeps the CDN, WAF and origin masking, and the "new account" is
genuinely safe here because the zone holds only two A records.
