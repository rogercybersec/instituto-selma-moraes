# Instituto Selma Moraes — Deployment & Email Configuration Guide

**Domain:** selmamoraes.com.br
**Hosting:** Vercel (project: instituto-selma-moraes-testing-version)
**DNS Provider:** Registro.br (managed via Vercel nameservers)
**Date:** 2026-05-10

---

## Architecture Diagram

```
                    ┌─────────────────────────────────────┐
                    │          REGISTRO.BR                │
                    │   Domain: selmamoraes.com.br        │
                    │   User: SEAMO100                    │
                    │   NS → ns1.vercel-dns.com           │
                    │   NS → ns2.vercel-dns.com           │
                    └──────────────┬──────────────────────┘
                                   │
                          DNS delegation
                                   │
                    ┌──────────────▼──────────────────────┐
                    │         VERCEL DNS                   │
                    │                                      │
                    │  ALIAS  @ → vercel-dns-017.com      │
                    │  ALIAS  * → cname.vercel-dns-017    │
                    │  MX     @ → mx.zoho.com (10)        │
                    │  MX     @ → mx2.zoho.com (20)       │
                    │  MX     @ → mx3.zoho.com (50)       │
                    │  TXT    @ → SPF (zoho+fwdemail)     │
                    │  TXT    _dmarc → DMARC policy       │
                    │  TXT    @ → forward-email config    │
                    │  CAA    → letsencrypt, sectigo, goog │
                    └───────┬──────────────┬──────────────┘
                            │              │
              ┌─────────────▼─┐    ┌───────▼──────────────┐
              │   VERCEL APP  │    │     EMAIL FLOW       │
              │               │    │                      │
              │  Static HTML  │    │  Inbound:            │
              │  index.html   │    │  → Zoho Mail (MX)    │
              │  selma-photo  │    │  → Forward Email     │
              │  slide-*.png  │    │  → Gmail final box   │
              │  earth-texture│    │                      │
              │  three.js 3D  │    │  Outbound:           │
              │               │    │  Gmail → Zoho SMTP   │
              │  HTTPS auto   │    │  → sends as @selma   │
              │  via Let's    │    │                      │
              │  Encrypt      │    │  contato@selma...    │
              └───────────────┘    └──────────────────────┘
```

---

## Step-by-Step: What Was Done

### 1. Website Deployment (Vercel) ✅
- Project: `instituto-selma-moraes-testing-version`
- GitHub repo: `rogercybersec/instituto-selma-moraes`
- Branch: `main`
- Framework: Static HTML (no build)
- Production URL aliases:
  - `selmamoraes.com.br`
  - `www.selmamoraes.com.br`
  - `instituto-selma-moraes-testing-vers.vercel.app`

### 2. Domain Connection (Vercel) ✅
- Added `selmamoraes.com.br` as custom domain
- Vercel auto-configured ALIAS records
- HTTPS via Let's Encrypt (auto after DNS propagation)

### 3. DNS Nameserver Change (Registro.br) ✅
- Logged into Registro.br as SEAMO100
- Changed nameservers from `a.auto.dns.br` / `b.auto.dns.br`
- Set to `ns1.vercel-dns.com` / `ns2.vercel-dns.com`
- Propagation: up to 2 hours from 2026-05-10 ~12:22 AEST

### 4. Email DNS Records (Vercel DNS) ✅

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| MX | @ | `mx.zoho.com` (priority 10) | Primary mail server |
| MX | @ | `mx2.zoho.com` (priority 20) | Secondary mail server |
| MX | @ | `mx3.zoho.com` (priority 50) | Tertiary mail server |
| TXT | @ | `v=spf1 include:zoho.com include:forwardemail.net ~all` | SPF - authorized senders |
| TXT | _dmarc | `v=DMARC1; p=quarantine; rua=mailto:contato@selmamoraes.com.br; pct=100; adkim=s; aspf=s` | DMARC - anti-spoofing |
| TXT | @ | `forward-email=contato:mcseoliverbkp@gmail.com` | Forward Email routing |

### 5. Pending: Email Account Setup
- [ ] Create Zoho Mail free account → add domain → create `contato@selmamoraes.com.br`
- [ ] Get DKIM key from Zoho → add to Vercel DNS as CNAME
- [ ] Register at Forward Email → verify domain
- [ ] Gmail: Settings → Accounts → Send Mail As → add Zoho SMTP (`smtp.zoho.com:587 TLS`)

---

## Email Flow Diagram

```
  INBOUND EMAIL                              OUTBOUND EMAIL
  ─────────────                              ──────────────

  Someone emails                             Selma replies
  contato@selmamoraes.com.br                 from Gmail
       │                                          │
       ▼                                          ▼
  ┌──────────┐                              ┌──────────┐
  │ Zoho MX  │                              │  Gmail   │
  │ receives │                              │ "Send as"│
  └────┬─────┘                              └────┬─────┘
       │                                          │
       ▼                                          ▼
  ┌────────────┐                            ┌──────────┐
  │  Forward   │                            │ Zoho SMTP│
  │  Email     │                            │ smtp.zoho│
  │  encrypts  │                            │ .com:587 │
  └────┬───────┘                            └────┬─────┘
       │                                          │
       ▼                                          ▼
  ┌──────────┐                              Recipient sees:
  │  Gmail   │                              FROM: contato@
  │  final   │                              selmamoraes.com.br
  │  inbox   │
  └──────────┘
```

---

## Security Configuration

- **SPF**: Authorizes only Zoho and Forward Email to send on behalf of domain
- **DKIM**: Pending (Zoho provides key after account setup)
- **DMARC**: Quarantine policy with strict alignment — spoofed emails go to spam
- **HTTPS**: Auto via Let's Encrypt through Vercel
- **Headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`

---

## Costs

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby | Free |
| Registro.br | Domain | ~R$40/year |
| Zoho Mail | Free (1 user) | Free |
| Forward Email | Free tier | Free |
| **Total** | | **~R$40/year** |
