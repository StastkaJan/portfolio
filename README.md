# Portfolio

Personal portfolio website built with SvelteKit 5, TypeScript, and Sass. Runs in Docker.

## Stack

- **SvelteKit 5** with adapter-node
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

Content is stored in `content/data.json` and mounted as a Docker volume so edits persist across container restarts.

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
