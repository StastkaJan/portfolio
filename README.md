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

The app runs on [http://localhost:3000](http://localhost:3000).

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
