## Goal

Reposition the site around the **drinks reception** as the core offering, with upsells to duo (handpan + double bass) and trio (handpan + double bass + flute or violin) instead of upselling more playing hours across the day. Drop the ceremony-only package.

## New Packages (`src/routes/packages.tsx`)

Replace the current four packages with three tiered reception packages plus a bespoke option:

1. **Solo Handpan — £600** (baseline)
   - 2 hours of live drinks reception music
   - Acoustic, no power needed
   - Bullets: gentle atmosphere, indoor/outdoor, professional setup

2. **Handpan Duo — £1,050** *(Most Popular)*
   - Handpan + double bass, 2 hours
   - Warmer, fuller sound while staying calm and unobtrusive
   - Bullets: richer texture, ideal for larger receptions, still acoustic-forward

3. **Handpan Trio — £1,450**
   - Handpan + double bass + flute *or* violin (your choice), 2 hours
   - The most cinematic option — feels like a bespoke ensemble
   - Bullets: choice of flute or violin, standout musical moment, coordinated arrangements

4. **Bespoke / Ceremony Add-On / Destination — Price on enquiry**
   - Ceremony music as an add-on to any package
   - Longer sets, elopements, retreats, destination weddings

Add a short line under the grid: *"Additional playing time available on request."*

## Content Changes Across the Site

- **Home (`src/routes/index.tsx`)**
  - Update the "Packages Preview" section: three cards become Solo / Duo / Trio (Duo featured). Reword copy to lead with drinks reception.
  - Adjust the "Where it fits" and "Why Handpan" copy to lean into drinks reception as the natural home for the music, with ceremony mentioned as an add-on.
  - Update hero subheading to emphasise drinks receptions + ensemble options.

- **Weddings (`src/routes/weddings.tsx`)**
  - Rework the three-section grid so Drinks Reception is the lead card and most detailed. Ceremony becomes a smaller "Add ceremony music" card. Third card stays outdoor/elopement.

- **Contact form (`src/routes/contact.tsx`)**
  - Package interest options updated to: Solo Handpan, Handpan Duo, Handpan Trio, Ceremony add-on, Bespoke.

- **SEO**
  - Packages page title/description updated to reflect new pricing ("From £600 · Solo, Duo & Trio").
  - Home meta description tweaked to mention duo/trio ensembles.

## Out of Scope

- No new pages, no new images, no backend/form-handling changes.
- Design system, header, footer, FAQ, listen, and about pages remain untouched (FAQ pricing references, if any, will be spot-checked and updated in the same pass).
