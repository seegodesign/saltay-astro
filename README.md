# Saltay homepage: Astro + Tina CMS

An Astro recreation of https://www.saltayhanaleibay.com/home-2/ using original brand assets, content, fonts, and imagery. The new `/pricing/` page includes the treatment menu and pricing from https://www.saltayhanaleibay.com/pricing/. Header navigation links to local pages and the original booking page; remaining homepage links are placeholders (`#`). Pages are marked noindex.

## Run and edit locally

Requires Node 22.19+ (or Node 24+).

```sh
npm ci
npm run dev
```

Open http://localhost:4173 for the website and http://localhost:4173/admin/ for Tina CMS. Select **Pages** to see Home, Pricing, About, and Discounted Pricing in one document list. Each page uses its own template and visual editor. Creation and deletion are disabled for these fixed routes. Select the home document to open the homepage visual editor. Click text or images to select fields; use the sidebar to add, remove, and reorder page sections, services, paragraphs, and care columns. Saving writes to `src/data/home.json`. Local editing does not require a TinaCloud account. The npm scripts use IPv4-first localhost resolution so Tina’s local database server and client connect consistently.

Select **Pages → Pricing | Saltay Hanalei Bay** to edit the pricing page. Saving writes to `src/data/pricing.json`. The page preserves the live pricing page’s eight categories and 28 entries, including full package details, nested lists, prices, and related-page links, with a sticky category sidebar. Session details use editable **Session details HTML** fields; preserve markup when editing. Live preview is at `/pricing/`. The `/treatments/` overview is editable under **Pages → Spa & Wellness Treatments**. Content lives in `src/data/treatments.json`; its main categories and supporting offerings link to the existing WordPress detail pages until those are migrated. The hero, category cards, what-to-expect steps, and booking content are editable in Tina. Source wording and durations are retained as published, including 4hrs 44 min for Nourished Restoration and 3hrs 33 min for Sanctuary for Two.

The Care section preserves its original HTML. Its **Body HTML** field is a textarea; keep markup intact when editing formatted text or links. The hero background image uses Tina's media picker.

## Content search

Use Tina's **Search** in the admin to find content across Home, Pricing, About, and Discounted Pricing, or search within **Pages**. Search includes nested treatment descriptions, session details, and prices. Local development builds the search index at startup and updates it when content changes; no search token is needed locally. Restart `npm run dev` after first enabling search.

For deployed search, create a Search token in your TinaCloud project's **Tokens** tab and set `TINA_SEARCH_TOKEN` in your build environment. `npm run build` uploads the search index to TinaCloud. Local builds do not upload a cloud search index. See [Tina's search documentation](https://tina.io/docs/reference/search/overview).

## Builds and hosting

```sh
# Verify/build with local content, without TinaCloud credentials:
npm run build:local

# Production build using TinaCloud:
npm run build
```

The homepage is prerendered. Tina's live visual preview also needs the on-demand `/tina-island/home` endpoint, so this project includes the Astro Node adapter. Deploy the full `dist/` output to a Node host and start it with:

```sh
HOST=0.0.0.0 PORT=4173 node dist/server/entry.mjs
```

Deploying only static files will not support the live visual editor. If deploying to another platform, replace `@astrojs/node` with its Astro adapter. `npm run preview` previews the build locally.

## Connect TinaCloud

1. Push this project to a Git repository and create a project in TinaCloud connected to that repository.
2. Copy `.env.example` to `.env` for local cloud builds; set `TINA_CLIENT_ID`, `TINA_TOKEN` (content API read token), and `TINA_BRANCH` to the branch TinaCloud indexes. Configure the same variables in your deployment host.
3. Use `npm ci` to install and `npm run build` to build. Deploy the Node application described above.
4. Open `/admin/` on the deployed site and sign in through TinaCloud. Saves commit content changes to the connected branch. Configure your host to rebuild on those commits so the prerendered public homepage updates.
5. Pull CMS commits before editing the same content locally.

Cloud account connection and deployed authentication require your TinaCloud project and credentials; they are not configured by this repository migration.

Content schema: `tina/config.ts`. Content: `src/data/home.json`. Visual preview: `src/lib/tina/`, `src/pages/tina-island/[name].ts`, and `src/components/Home.astro`. Tina generates its client and admin application during dev/build; those outputs are ignored, while `tina/tina-lock.json` should be committed.

## Assets

Original Saltay media live in `public/assets/`. Google Fonts supplies EB Garamond and Hubballi. Keep appropriate rights to client assets when publishing. Ocean panels retain the original overlays.

## About page

`/about/` adapts the philosophy, founder story, practitioner bios, and original beach photograph from https://www.saltayhanaleibay.com/about/. Select **Pages → About** in Tina to edit the page copy, photograph, practitioner list, and booking link, with live visual preview. Content lives in `src/data/about.json`; layout and styling are in `src/components/About.astro` and `src/styles/about.css`. The shared header and page footers link to the new route.

## Discounted pricing

`/discounted-pricing/` preserves the rates and available experiences published at https://www.saltayhanaleibay.com/discounted-pricing/: weekday 60/90-minute sessions at $165/$247 per person and weekend sessions at $177/$265 per person, at the Saltay II annex at Anahola Marketplace. Edit **Pages → Discounted Pricing** in Tina; content lives in `src/data/discounted-pricing.json`. The Pricing dropdown, both pricing pages, and site footers link to this route. The dropdown opens on hover on desktop, uses a tap disclosure on mobile, and supports keyboard navigation and Escape.

## Spa add-ons

`/spa-add-ons/` includes all 36 wellness enhancements and prices from https://www.saltayhanaleibay.com/spa-add-ons/. Enhancements can be added to a Signature Experience or Wellness Retreat without increasing session duration. Edit **Pages → Wellness Enhancements & Spa Add-ons** in Tina; content lives in `src/data/spa-add-ons.json`, with visual preview supported by the `spaAddOns` island. The Treatments dropdown and treatments overview link to this local page.

## Signature experiences

`/signature-experiences/` adapts all nine rituals from https://www.saltayhanaleibay.com/spa-treatments/signature-experiences/ with original imagery, treatment details, duration information, and the Octopus Embrace suitability note. The image index links directly to each experience. Edit **Pages → Signature Experiences** in Tina; content lives in `src/data/signature-experiences.json`, with live visual preview through the `signatureExperiences` island. Preserve HTML tags when editing **Experience details HTML**. Images are stored locally in `public/assets/signature/`. The Treatments dropdown, treatments overview, and pricing menu link to the local route.


## Booking and treatment detail pages

The local `/book-with-us/`, `/signature-spa-packages/`, `/acupuncture/`, and `/keiki-children/` routes replace the remaining customer-facing legacy-domain links. The Treatments menu includes all treatment detail pages. Homepage booking, phone, packages, and Wellness Treatments links now work locally or use a telephone link.

Edit these pages through **Pages** in Tina. Booking uses the `bookWithUs` template; the three treatment pages share `wellnessDetail`, rendered by `src/components/WellnessDetail.astro`. Their JSON documents are explicitly included in the collection, with loaders and preview islands registered in `src/lib/tina/`.

Booking links to the Square destination exposed by the original booking page and offers call/text alternatives. The original booking, acupuncture, and Keiki pages were consulted on October 19, 2026. The packages page starts from the project's six existing pricing-menu packages; some inclusions differ from the legacy packages page, so local descriptions follow the existing project content. Rates remain on `/pricing/`.

Remaining homepage placeholders (Swimwear, retreats/apprenticeships, workshops, and remote care) are outside this four-page migration. The site retains its development `noindex,nofollow` policy.


## Musings

`/musings/` lists posts from the separate **Musings** Tina collection, newest first. The import from https://www.saltayhanaleibay.com/musings/ includes both published posts: **Botanical Bliss** (October 5, 2023) and **Battlefield Medicine to Pampered Spa Herbal Therapies?** (March 29, 2023), by Wanda. Content was fetched from the public WordPress REST API on October 19, 2026. Full post wording, categories, tags, source URLs, and publication dates are retained; an isolated trailing “T” in Botanical Bliss was omitted as an editing artifact. Image markup was normalized and images copied to `public/assets/musings/`.

Create and edit posts under **Musings** in Tina. Documents live in `src/data/musings/`; the filename becomes the slug at `/musings/<filename>/`. Use lowercase words separated by hyphens for filenames. The publication date controls ordering, with dates displayed in Hawaii time. Preserve markup in **Post body HTML**. Each post supports live visual preview through the parameterized `musing` island; the index uses the `musings` island. Creating a post adds its public route on the next build. Header navigation and the homepage footer link to the index. Pages retain the site's development noindex policy.

## Community

`/community/` imports all eight sections from https://www.saltayhanaleibay.com/community/ (consulted October 19, 2026), including resident rates, healing-day modalities and prices, community spa-day prices and room-sharing details, workshops, and group experiences. Edit **Pages → Community** in Tina with live visual preview. Content lives in `src/data/community.json`; preserve markup in **Section body HTML**. Header and footer navigation link to the local page; legacy appointment and contact links now use `/book-with-us/`. Instagram links retain their original destination. The source references a mailing list and calendar but supplies no signup or calendar link; those references are retained without adding a signup form or calendar.

The Community hero uses the original `community-header.jpg`, stored locally in `public/assets/` and editable through Tina’s **Hero image** field.

## Locations

`/locations/` imports both location descriptions, addresses, and arrival details from https://www.saltayhanaleibay.com/locations/ (consulted October 19, 2026). Edit **Pages → Locations | Saltay Hanalei Bay** in Tina with live visual preview. Content lives in `src/data/locations.json`; the shared footer links to the local route. Booking uses `/book-with-us/`. The source page contains no location photographs or embedded maps.


## Homepage reviews

The **Google reviews** homepage section features short, verbatim excerpts from Dawn S, Lorena B, and Megan J, with individual star ratings and links to their original Google reviews. Source: Google reviews reproduced at https://wanderlog.com/place/details/12644469/saltay-botanical-spa-massage--wellness (consulted October 19, 2026). Direct Google pages were unavailable to the research fetcher; reviewer names, ratings, and original review links come from that source.

Edit **Pages → Home → Google reviews** in Tina to change the heading, excerpts, reviewer names, star ratings, or links, and to add, remove, or reorder reviews. Keep excerpts faithful to the originals. This is a curated section; it does not automatically sync with Google or display a live overall rating or review count.
