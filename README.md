# Portfolio

Personal portfolio website built with SvelteKit 5, TypeScript, and Sass. Runs in Docker.

## Stack

- **Svelte 5 / SvelteKit** with adapter-static
- **TypeScript** + **Sass**
- **Docker** + Docker Compose

## Getting started

### Local dev

```bash
npm install
npm run dev
```

### Docker

```bash
docker compose up --build
```

The app is served through Caddy. Production deploys alternate between blue and green app containers, health-check the candidate, and reload Caddy only after CI and the candidate are successful.

Content is stored in `content/data.json` and read during the build. Commit content edits and rebuild/redeploy to publish them; changing a file on the running server no longer updates the page. Preserve any server-only content edits in the repository before the first static deployment.

The production image contains only Caddy and the generated `build/` files. It serves HTTP on port 3000, preserving the existing blue/green routing and health-check flow. Node is used only during development and builds. A failed candidate leaves the previous container serving traffic; reverting the migration commit restores the previous Node build if needed.

### Static build and checks

```bash
npm run check
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run preview
```

Browser tests run against the production build and verify metadata, crawler files, and content visibility without JavaScript. CI runs them before deployment.

The app container uses `Caddyfile.static`: fingerprinted Svelte assets are cached for one year, unversioned images for one day, and HTML/data revalidate on each visit. These rules ship with the image independently of the outer blue/green proxy configuration. Small stylesheets are inlined into the prerendered HTML. Project screenshots load lazily; when replacing a screenshot, also export its 640px and 960px WebP variants alongside the original 1280px WebP/JPEG files.

### SEO

The prerendered page includes its full content, canonical URL, Open Graph and Twitter metadata, and ProfilePage/Person structured data. The existing portrait is used for social previews. `static/robots.txt` advertises `static/sitemap.xml`.

The canonical production URL is `https://stastka.dev/`. If the domain changes, update it in `src/routes/+page.svelte`, `static/robots.txt`, and `static/sitemap.xml`. After deployment, submit the sitemap in Google Search Console and validate the published page with Google's Rich Results Test.

## Project structure

```
src/
├── lib/
│   ├── components/       # Portfolio sections
│   ├── actions/          # Svelte actions (IntersectionObserver)
│   ├── stores/           # Theme store
│   └── types.ts
├── routes/
│   └── +page.svelte      # Portfolio page
content/
└── data.json             # All portfolio content
static/                   # Images, favicon
```
