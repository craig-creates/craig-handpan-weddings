# Site audit — readiness for launch, GitHub export, and Cloudflare hosting

I went through every page, the enquiry pipeline, the site-wide metadata, and the hosting setup. The site is in good shape structurally. Below is what still needs doing, grouped by how much it matters.

## 1. Blockers — the enquiry form cannot deliver yet

- **Resend key is still being rejected.** Every test returns "API key is invalid". Until a working key is saved, a submitted enquiry returns an error to the couple. There are also two `RESEND_API_KEY` entries saved; the duplicate should be removed.
- **handpanweddings.com is not verified in Resend.** Until it is, mail cannot be sent from craig@ or enquiries@ at your domain. There is already a safety net that falls back to Resend's shared test address, so nothing is lost in the meantime.
- **The HubSpot private app is missing permissions.** Contact and deal creation fails until the contacts/deals read+write scopes are added to the app.

These three are account-side steps on your end; no code change fixes them.

## 2. Fixes I will make in the code

**Search and sharing**
- Page addresses used for search engines and social previews are written as `/packages`, `/faq` etc. rather than full `https://handpanweddings.com/...` addresses. Search engines need the full form. I'll add a single site-address setting and use it on every page.
- The sitemap lists pages without the domain in front, which makes it invalid for Google. Same fix.
- `robots.txt` doesn't point to the sitemap. I'll add that line.
- The social sharing image is currently a temporary Lovable screenshot link that will break. I'll point it at a proper image hosted on your own domain.
- Site-wide title says "in Kent" while the site now serves London, Surrey, Sussex, Kent and Essex, and the business name appears three ways ("Craig · Handpan", "Craig Handpan", "Soulful Wedding Sounds"). I'll settle on one name and one consistent title across pages.

**Listen & Watch page**
- All the video and audio players are placeholders — the play buttons do nothing. This is the page most likely to convert a couple, so it needs your real media. I'll wire in whatever you have (YouTube/Vimeo links and audio files) and remove the Instagram placeholder box if there's no handle yet.

**Small polish**
- Add the site icon link so browsers and search results pick it up reliably.
- Confirm the contact form's error and success states read well on mobile.

## 3. Cloudflare / GitHub export readiness

The build already targets Cloudflare by default, so the export works — but a few things need to exist for it to run outside Lovable:

- **Environment variables must be recreated in Cloudflare.** `RESEND_API_KEY`, `HUBSPOT_PRIVATE_APP_TOKEN` and `ENQUIRY_NOTIFY_EMAIL` live in Lovable's secret store and are not part of the exported code. They must be added as secrets in the Cloudflare project.
- **A deployment guide.** I'll add a short `DEPLOY.md` with the build command, output folder, required compatibility settings, the environment variables, and the DNS steps for pointing handpanweddings.com at Cloudflare.
- Nothing in the enquiry code depends on Lovable — it calls Resend and HubSpot directly — so it keeps working after export. The agent integration (MCP) endpoint also works on Cloudflare.
- One caveat: the form's spam throttle counts submissions per server instance, so on Cloudflare it's a deterrent rather than a hard limit. The hidden honeypot field does the real work. Fine for a wedding site.

## 4. Not doing unless you want it

- Visitor analytics (Cloudflare Web Analytics is free and privacy-friendly).
- A cookie/privacy notice — not needed while there's no tracking, needed if analytics is added.
- Reviews/testimonials section, which is usually the biggest conversion lift after audio.

## What I need from you

1. Links to your best performance videos (YouTube or Vimeo) and any audio files.
2. Your Instagram handle, if you want that section kept.
3. Which name should be the official one: "Craig Coppack", "Handpan Weddings", or "Soulful Wedding Sounds"?

I can make all the code fixes in section 2 and 3 now and drop your media in as soon as you have it.
