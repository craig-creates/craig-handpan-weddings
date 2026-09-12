# Site audit — launch readiness, GitHub export, Cloudflare hosting

## Status after re-testing

- **Resend: fixed.** Removing the automatic connector resolved it — your own key is now picked up and is valid (send-only, which is all we need). Email will be sent on the next real enquiry.
- **HubSpot: confirmed working.** Contacts, deals, deal fields, and notes all tested successfully. Your permissions are correct.
- **Remaining check:** one real end-to-end test enquiry to confirm the email arrives and the contact and deal appear in HubSpot. I'll run that with a clearly-labelled test name.

## Code work in this plan

### 1. Branding — settle on "Handpan Weddings"
- Standardise the name everywhere: footer, page titles, social previews, structured data, and the agent-integration listing (currently a mix of "Craig · Handpan", "Craig Handpan", and "Soulful Wedding Sounds").
- Rewrite page titles around drinks receptions and the full coverage area (they still say "in Kent").

### 2. Listen & Watch — honest version without media
- Remove the dead video/audio placeholder players (buttons that do nothing erode trust).
- Keep the imagery and atmosphere; add a short "recordings coming soon" note, the Instagram link, and a strong enquiry call to action.
- Drop the empty Instagram embed box; a plain link is enough until there is a feed.

### 3. Search and sharing
- Use full `https://handpanweddings.com/...` addresses in every page's search/social metadata instead of `/packages` style paths.
- Fix the sitemap so Google can read it (same domain issue) and point `robots.txt` at it.
- Replace the temporary Lovable screenshot used as the social sharing image with a real image on your domain.
- Add the site icon link.

### 4. Meta ads and analytics
- Meta Pixel on every page plus a "Lead" event when an enquiry is sent.
- Cloudflare Web Analytics for general visitor numbers (free, no cookies).
- A new Privacy Policy page (required once the Pixel is in).
- Cookie choice for UK/EU visitors — see the question below. I recommend a small banner shown only where required; without it the Pixel can't run for most of your audience and ad measurement will be weak.
- Needs your Meta Pixel ID from Meta Events Manager (can be added later).

### 5. Cloudflare / GitHub export guide
- Add `DEPLOY.md`: build command, output folder, compatibility settings, the three secrets to recreate (`RESEND_API_KEY`, `HUBSPOT_PRIVATE_APP_TOKEN`, `ENQUIRY_NOTIFY_EMAIL`), and DNS steps for handpanweddings.com.
- The enquiry and agent-integration code has no Lovable dependency, so everything keeps working after export.

### 6. Final pass
- Check the contact form's success and error states on a phone-sized screen.
- Run the labelled test enquiry and report what arrived where.

## Technical detail

- New `src/lib/site.ts` with `SITE_URL` and brand constants, used by every route `head()`, the sitemap handler, and structured data.
- Pixel loads in `__root.tsx` only after consent in regulated regions (region read from `/cdn-cgi/trace`, choice stored in localStorage); `Lead` fires in `contact.tsx` on a successful `/api/enquiry` response.
- New route `/privacy`. Updates to `listen.tsx`, `SiteFooter.tsx`, `robots.txt`, `sitemap[.]xml.ts`, and page `head()` blocks.

## From you, whenever ready

1. Instagram handle (your last message linked the project rather than the handle).
2. Meta Pixel ID when you have it.
