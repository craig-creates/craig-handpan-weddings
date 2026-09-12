# Deploying Handpan Weddings to Cloudflare (Pages / Workers)

This guide covers exporting the project to GitHub and hosting on Cloudflare.

## Prerequisites

- A GitHub account
- A Cloudflare account
- The domain `handpanweddings.com` (already purchased)

## Build

This is a TanStack Start (Vite) project targeting Cloudflare Workers.

```bash
bun install
bun run build
```

The build output goes to `dist/` (or `.output/` depending on the adapter). The
Vite config already targets the Cloudflare Workers adapter.

## Cloudflare runtime variables / secrets

The enquiry form and email delivery need three runtime bindings in the
Cloudflare **Production** environment (Workers → Settings → Variables and Secrets).
After adding or changing them, deploy again so the active Worker receives them:

| Name | Purpose | Where to get it |
|------|---------|-----------------|
| `RESEND_API_KEY` | Sends enquiry notification + confirmation emails | Resend dashboard (starts `re_`) |
| `HUBSPOT_PRIVATE_APP_TOKEN` | Creates contact + deal in HubSpot | HubSpot Private App (starts `pat-`) |
| `ENQUIRY_NOTIFY_EMAIL` | Inbox that receives enquiry notifications | `craig@handpanweddings.com` |

Use an encrypted secret for the Resend and HubSpot credentials. A normal text
variable is suitable for `ENQUIRY_NOTIFY_EMAIL`. The app reads these values from
Cloudflare's Worker bindings, with `process.env` retained for local development
and other compatible hosts.

Optional (for Meta ads analytics):

| Name | Purpose |
|------|---------|
| `VITE_META_PIXEL_ID` | Meta Pixel ID for ad tracking (client-side) |

## DNS setup for handpanweddings.com

Point the domain at Cloudflare:

1. In your domain registrar (Namecheap), set the nameservers to the pair
   Cloudflare assigns when you add the zone.
2. In Cloudflare, add a CNAME or Worker route pointing `handpanweddings.com`
   (and `www`) to the deployed Worker.
3. Cloudflare provisions SSL automatically.

Once live, update `SITE_URL` in `src/lib/site.ts` to
`https://handpanweddings.com` and redeploy.

## Portability notes

- The enquiry endpoint (`src/routes/api/enquiry.ts`) calls Resend and HubSpot
  directly via `fetch` — no Lovable-specific SDK. It works on any serverless
  runtime.
- The MCP endpoint (`POST /mcp`) is also self-contained.
- The form's per-IP throttle is in-memory per instance; on Cloudflare Workers
  it's a light deterrent (the honeypot field does the real spam filtering).

## Local development

```bash
bun install
bun run dev
```

The dev server runs on `http://localhost:8080`.
