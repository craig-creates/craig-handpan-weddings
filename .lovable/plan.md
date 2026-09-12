# Site audit — launch readiness, GitHub export, Cloudflare hosting

I re-tested both connections just now. Here is where things actually stand.

## 1. Why the enquiry form still fails — found it

**HubSpot is fine.** I tested it directly: contacts, deals, deal fields, and notes all return successfully. Your permissions are correct. Nothing more to do there.

**Resend is the problem, and it isn't your key.** There are two `RESEND_API_KEY` entries saved on the project. One is yours; the other was created automatically by Lovable's Resend connector and is a different kind of key that only works inside Lovable. The automatic one is the one the site picks up, which is why every key you paste appears "invalid" — your keys were probably fine all along.

Fix: disconnect the Lovable Resend connector so only your own key remains, then re-test. This also matters for the Cloudflare move, where only your own key exists.

Once that is done I will send a real test enquiry end to end and confirm the email arrives and the HubSpot contact and deal are created.

## 2. Branding and copy

- Standardise on **Handpan Weddings** everywhere: footer, page titles, social previews, structured data, and the agent-integration listing (currently a mix of "Craig · Handpan", "Craig Handpan", and "Soulful Wedding Sounds").
- The site-wide title says "in Kent" but you now cover London, Surrey, Sussex, Kent and Essex. I'll rewrite the titles around drinks receptions and the full area.

## 3. Listen & Watch — no media yet

The page currently shows fake players: a video box and two audio players whose buttons do nothing. That damages trust more than having no page at all.

Plan: rebuild the page honestly — keep the atmosphere and imagery, replace the dead players with a short "recordings are on the way" note plus your Instagram link and a strong enquiry call to action. The moment you have video or audio, I drop it straight in and the players become real.

## 4. Search and sharing fixes

- Page addresses for search engines and social previews are written as `/packages`, `/faq` and so on instead of the full `https://handpanweddings.com/...`. I'll set one site address and apply it everywhere.
- The sitemap has the same problem, which makes it invalid for Google.
- `robots.txt` doesn't point to the sitemap.
- The social sharing image is a temporary Lovable screenshot link that will break; I'll swap it for a real image on your domain.
- Add the site icon link.

## 5. Meta ads and analytics

For Meta ads you need the Meta Pixel installed before you spend, so enquiries can be attributed and optimised toward. I'll add:

- Meta Pixel with a page-view event, plus a "Lead" event when an enquiry is successfully sent.
- Cloudflare Web Analytics for general visitor numbers (free, no cookies).
- A privacy policy page naming what is collected and why — required once the Pixel is in.

Because the Pixel uses cookies, UK and EU visitors legally need a choice. Two options, and I need your call (question below):

- **Cookie banner shown only to UK/EU visitors** — tracking runs for everyone who accepts; most complete data.
- **No banner** — the Pixel simply doesn't run for UK/EU visitors, which is most of your audience, so ad measurement would be badly limited.

I recommend the banner. I'll also need your Meta Pixel ID from Meta Events Manager.

## 6. Cloudflare / GitHub export

The build already targets Cloudflare, so the export works. What is needed:

- Recreate the secrets in Cloudflare: `RESEND_API_KEY`, `HUBSPOT_PRIVATE_APP_TOKEN`, `ENQUIRY_NOTIFY_EMAIL`. They live in Lovable's secret store and are not part of the exported code.
- I'll add a short `DEPLOY.md` with the build command, output folder, compatibility settings, the secret list, and the DNS steps for pointing handpanweddings.com at Cloudflare.
- The enquiry code calls Resend and HubSpot directly with no Lovable dependency, so it keeps working after export. The agent-integration endpoint works there too.
- Note: the form's spam throttle counts per server instance, so on Cloudflare it's a deterrent rather than a hard cap. The hidden honeypot does the real work — fine for this site.

## Technical detail

- Add `src/lib/site.ts` exporting `SITE_URL` and brand constants; use in every route `head()`, the sitemap handler, and structured data.
- Disconnect the Resend standard connector to remove the shadowing `RESEND_API_KEY`; keep direct `fetch` to `api.resend.com` for portability.
- Pixel loaded from `__root.tsx` behind a consent check; `Lead` fired in `contact.tsx` on a successful `/api/enquiry` response.
- New routes: `/privacy`. Consent choice stored in `localStorage`, region detected via `/cdn-cgi/trace`.

## What I need from you

1. Your Instagram handle (the one in your message came through as a project link, not a handle).
2. Meta Pixel ID — or I build everything else and add it later.
3. Cookie banner: yes (recommended) or no.
