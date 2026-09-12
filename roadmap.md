# Roadmap

## Done
- [x] Site audit build: branding, SEO, Listen page, Meta Pixel, Privacy, deploy guide
- [x] Consent banner overlap fix (mobile + desktop)
- [x] Contact form verified on mobile (390px) and desktop (1280px)
- [x] TypeScript clean (tsgo --noEmit)
- [x] Resend key valid (re_ prefix, send-only — correct for this use case)
- [x] HubSpot token + permissions confirmed working (contacts, deals, schema, notes)

## Pending on user
- [ ] Resend domain verification (DKIM added to Namecheap DNS — waiting for Resend to verify at resend.com/domains)
- [ ] Instagram handle confirmation (placeholder used: @handpanweddings)
- [ ] Meta Pixel ID (VITE_META_PIXEL_ID) — needed when Meta ads start

## Blocked
- [ ] End-to-end enquiry test — blocked until Resend verifies handpanweddings.com domain. Test confirmed code path works up to email send; Resend returns 403 "please verify a domain" because DNS propagation is still pending.

## After Resend verification
- [ ] Run labelled test enquiry → verify email to craig@handpanweddings.com + couple confirmation + HubSpot contact/deal creation
- [ ] Delete test contact/deal in HubSpot after confirming
