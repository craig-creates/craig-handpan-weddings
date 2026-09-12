# Roadmap

## Done
- [x] Site audit build: branding, SEO, Listen page, Meta Pixel, Privacy, deploy guide
- [x] Consent banner overlap fix (mobile + desktop)
- [x] Contact form verified on mobile (390px) and desktop (1280px)
- [x] TypeScript clean (tsgo --noEmit)
- [x] Resend key valid (re_ prefix, send-only — correct for this use case)
- [x] HubSpot token + permissions confirmed working (contacts, deals, schema, notes)
- [x] Instagram URL updated to @kohpancraig
- [x] Instagram native embed infrastructure on Listen page (add post URLs to src/lib/instagram-posts.ts)

## Pending on user
- [ ] Resend domain verification (DKIM added to Namecheap DNS — waiting for Resend to verify at resend.com/domains)
- [ ] Meta Pixel ID (VITE_META_PIXEL_ID) — needed when Meta ads start
- [ ] Add Instagram post/reel URLs to src/lib/instagram-posts.ts to populate the feed

## Blocked
- [ ] End-to-end enquiry test — blocked until Resend verifies handpanweddings.com domain

## After Resend verification
- [ ] Run labelled test enquiry → verify email to craig@handpanweddings.com + couple confirmation + HubSpot contact/deal creation
- [ ] Delete test contact/deal in HubSpot after confirming
