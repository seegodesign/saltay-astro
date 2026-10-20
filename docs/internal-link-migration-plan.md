# Legacy-domain link audit and page plan

Audit date: October 19, 2026. Based on the current local working tree.

## Findings

There are **19 legacy-domain URL occurrences in 14 source files**, pointing to **four distinct destinations**. None of these four destinations has a local page yet. These counts describe source references, not rendered links: shared components and loops render some references multiple times, and one reference is a fallback.

Existing public pages: `/`, `/treatments/`, `/pricing/`, `/about/`, `/discounted-pricing/`, `/signature-experiences/`, and `/spa-add-ons/`. The Tina island endpoint is infrastructure, not a public content page.

| Suggested build order | Page to create | Local route | Legacy references | Entry points |
| --- | --- | --- | --- | --- |
| 1 | Book With Us | `/book-with-us/` | 14 | Shared header, six page footers, booking calls to action across six content pages, pricing fallback |
| 2 | Signature Spa Packages | `/signature-spa-packages/` | 2 | Treatments category card and pricing package section |
| 3 | Acupuncture & More | `/acupuncture/` | 2 | Treatments category card and pricing acupuncture section |
| 4 | Keiki (Children) | `/keiki-children/` | 1 | Treatments supplemental offering |

Keep the existing destination slugs to make the eventual change a simple move to root-relative URLs. Signature Spa Packages needs its own page; the existing Signature Experiences page describes individual rituals and does not replace the packages destination.

## Page requirements before switching links

### 1. Book With Us

- Create `src/pages/book-with-us.astro` with editable content in `src/data/book-with-us.json`.
- Explain how to reserve an appointment and provide a working reservation action and phone alternative, with confirmed location and appointment information.
- Inspect the legacy booking page during implementation to identify the actual reservation provider, embed, or contact workflow. That integration is not established by this source audit.
- Verify the booking journey works on mobile and desktop before redirecting the site's booking traffic to this page. An internal landing page can still send the final reservation action to an external booking provider.

### 2. Signature Spa Packages

- Create `src/pages/signature-spa-packages.astro` and `src/data/signature-spa-packages.json`.
- Include package descriptions, inclusions, durations, guest counts where relevant, pricing references, and a booking action.
- Start with the six packages already present in `src/data/pricing.json`: Pampered Indulgence, Nourished Restoration, Saltay Reset, Sanctuary for Two, Saltay Escape, and Saltay Luxe Immersion. Confirm these against the legacy page when implementing.
- Link to individual Signature Experiences and Spa Add-ons where useful; keep package rates consistent with the pricing page.

### 3. Acupuncture & More

- Create `src/pages/acupuncture.astro` and `src/data/acupuncture.json`.
- Cover the modalities promised by the treatments card: acupuncture, acupressure, fire cupping, and Tui Na, with session expectations and booking/pricing links.
- Use existing pricing data as a starting point for session options; verify modality descriptions and availability against the legacy content before publishing.

### 4. Keiki (Children)

- Create `src/pages/keiki-children.astro` and `src/data/keiki-children.json`.
- Include available children's offerings, session options, applicable ages, parent accompaniment requirements, and booking/pricing information.
- Verify the current treatments-page statements about parent accompaniment and botanical facials from age nine against the legacy page before carrying them forward.

## Complete source inventory for the later link update

All current source URLs use `https://www.saltayhanaleibay.com` plus the paths below. Line numbers refer to the audited working tree.

| Destination path | Source | Field or use |
| --- | --- | --- |
| `/book-with-us/` | `src/components/SiteHeader.astro:17` | Shared header booking button |
| `/book-with-us/` | `src/components/PricingMenu.astro:8` | Fallback when `page.booking_url` is empty |
| `/book-with-us/` | `src/data/about.json:48` | `booking_url` |
| `/book-with-us/` | `src/data/discounted-pricing.json:21` | `booking_url` |
| `/book-with-us/` | `src/data/pricing.json:7` | `booking_url` |
| `/book-with-us/` | `src/data/signature-experiences.json:87` | `booking_url` |
| `/book-with-us/` | `src/data/spa-add-ons.json:159` | `booking_url` |
| `/book-with-us/` | `src/data/treatments.json:78` | `booking_url` |
| `/book-with-us/` | `src/pages/about.astro:46` | Footer |
| `/book-with-us/` | `src/pages/discounted-pricing.astro:31` | Footer |
| `/book-with-us/` | `src/pages/pricing.astro:30` | Footer |
| `/book-with-us/` | `src/pages/signature-experiences.astro:31` | Footer |
| `/book-with-us/` | `src/pages/spa-add-ons.astro:31` | Footer |
| `/book-with-us/` | `src/pages/treatments.astro:28` | Footer |
| `/signature-spa-packages/` | `src/data/treatments.json:29` | Spa Packages category URL |
| `/signature-spa-packages/` | `src/data/pricing.json:202` | Package section `link_url` |
| `/acupuncture/` | `src/data/treatments.json:38` | Acupuncture & More category URL |
| `/acupuncture/` | `src/data/pricing.json:128` | Acupuncture section `link_url` |
| `/keiki-children/` | `src/data/treatments.json:55` | Keiki extra URL |

## Implementation and cutover sequence

1. Build the four pages using the site's existing header, footer, typography, accessibility, and metadata conventions. Retain the project's current noindex policy during development.
2. Integrate each page with Tina: expand the explicit collection `match.include` allowlist in `tina/config.ts`, add templates, add data loaders in `src/lib/tina/data.ts`, and register preview islands in `src/lib/tina/islands.ts`. Regenerate Tina artifacts through the build workflow rather than editing generated files manually.
3. Verify complete content, working reservation actions, responsive layouts, keyboard access, and Tina editing/preview for each new page.
4. Once a destination is ready, replace its legacy URLs at every inventory location with its root-relative path. The three treatment detail pages can be built independently; their booking actions can become internal when Book With Us is ready.
5. Run `npm run build:local`, check that all four routes load, and inspect rendered navigation and calls to action on all seven existing pages. Repeat the legacy-domain source search; remaining documentation citations should be reviewed separately from customer-facing links.

## Separate observations and audit limits

- `README.md` contains six legacy-domain URLs recording content provenance (`/home-2/`, `/pricing/`, `/about/`, `/discounted-pricing/`, `/spa-add-ons/`, and `/spa-treatments/signature-experiences/`). These are documentation references, not website navigation, and do not require new pages.
- Homepage booking and phone actions in `src/components/Booking.astro` currently use `#`. Once booking is ready, wire the reservation action to `/book-with-us/` and the phone action to a confirmed `tel:` URL.
- Homepage footer labels in `src/data/home.json` mostly resolve to `#` in `src/components/Home.astro`. Wellness Treatments and Book With Us can use `/treatments/` and the planned `/book-with-us/`. Swimwear, Community, Musings, and Locations require separate scope/content decisions; no legacy-domain URLs for them were found.
- Homepage rich HTML in `src/data/home.json` also contains placeholder links for Spa Packages & Day Rituals, Personal Retreats & Apprenticeships, Workshops, and Remote Healing & Energy Work. The package link can use the planned packages page; the others are additional content work outside this four-destination migration.
- This was a source audit, including ignored-by-default hidden-file checks while excluding dependencies, build output, generated bundles, and Git internals. It did not crawl the live legacy site or verify current offerings, rates, or the booking provider. No customer-facing links were changed.


## Implementation update — October 19, 2026

All four planned routes have been implemented with Tina content, preview islands, shared navigation, responsive styling, and keyboard-accessible links. All 19 audited source URL occurrences now use root-relative routes. Homepage booking, phone, package, and Wellness Treatments placeholders have also been connected.

Content references consulted during implementation:

- Booking: https://www.saltayhanaleibay.com/book-with-us/ — Square destination, appointment-only workflow, call/text requests, and 24–48 hour response guidance.
- Packages: https://www.saltayhanaleibay.com/signature-spa-packages/ — checked against local pricing content. The local six-package menu is retained because its inclusions differ in places from the legacy page; rates link back to the existing pricing page.
- Acupuncture: https://www.saltayhanaleibay.com/acupuncture/ — modality coverage, rewritten without adding treatment promises.
- Keiki: https://www.saltayhanaleibay.com/keiki-children/ — listed offerings, parent accompaniment, and botanical facial minimum age.

The external Square destination was recovered from the legacy booking link; browser verification of the complete reservation workflow remains outstanding. No reservation was submitted. The connected browser runtime reported no available browsers, so visual and interactive Tina preview checks could not be completed in this environment.

Verification: the local Tina/Astro build passed using alternate local ports (`npm run build:local -- --port 4101 --datalayer-port 9100`). Generated HTML checks passed for all 11 pages and 316 internal links/anchors, including the Square, telephone, and text destinations. Each page has one main heading, and no legacy-domain navigation remains. JSON parsing, referenced hero assets, and `git diff --check` passed. Standalone `tsc --noEmit` reports unresolved `.astro` component imports across both existing and new preview registrations; it is not a passing additional check.
