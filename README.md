# Saltay homepage: Astro + CloudCannon

A one-page recreation of https://www.saltayhanaleibay.com/home-2/ using original brand assets, content, fonts, and video. Every website link is a placeholder (`#`). The page is deliberately marked noindex.

## Run locally

Requires Node 22.12+.

```sh
npm ci
npm run dev
```

Build: `npm run build`. Output: `dist/`.

## Try CloudCannon

1. Put this source in a GitHub repository (exclude node_modules and dist).
2. In your CloudCannon account, create a site connected to that repository.
3. Choose Astro. Install command: `npm ci`. Build command: `npm run build`. Output directory: `dist`. Use Node 22.12+ (or Node 24).
4. Open **Pages → Home** in the Visual Editor. The JSON page's `url` is `/`.
5. Click the headline, text, or treatment images to edit inline. Drag the four page blocks to reorder them; use the sidebar to edit video/background paths and service lists.
6. Save and build to publish the changes. Pull those Git commits before making further changes with Codex.

CloudCannon configuration is in `cloudcannon.config.yml`. Content is in `src/data/home.json`; layout is in `src/components` and `src/styles/global.css`. The CloudCannon Editable Regions package registers the four Astro components for live editor rerendering. The editor integration is loaded only in CloudCannon editor mode.

The proof of concept preview does not embed the CloudCannon CMS. A CloudCannon account and Git connection are required for the actual editing experience. Account connection and save/rebuild workflows have not been tested in a signed-in CloudCannon session.

## Assets

Original Saltay media are copied into `public/assets/` so the preview does not depend on WordPress. Google Fonts supplies EB Garamond and Hubballi. Keep appropriate rights to client assets when sharing or publishing. Ocean background panels follow the original CSS, including its light overlays. Reduced-motion visitors do not see the video.

The `.openai` directory is only used by the private demonstration host and can be removed for CloudCannon deployment.
