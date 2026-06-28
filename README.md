# Portfolio

Personal portfolio website built with SvelteKit 5, TypeScript, and Sass. Includes a simple CMS admin UI backed by a flat JSON file. Runs in Docker.

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
Admin UI is at [http://localhost:3000/admin](http://localhost:3000/admin).

## CMS

Content is stored in `content/data.json` and mounted as a Docker volume so edits persist across container restarts.

Default admin password: `changeme` — override via the `ADMIN_PASSWORD` env variable in `docker-compose.yml`.

## Project structure

```
src/
├── lib/
│   ├── components/       # Portfolio sections
│   │   └── admin/        # CMS editor components
│   ├── actions/          # Svelte actions (IntersectionObserver)
│   ├── stores/           # Theme store
│   └── types.ts
├── routes/
│   ├── +page.svelte      # Portfolio page
│   └── admin/            # CMS route
content/
└── data.json             # All portfolio content
static/                   # Images, favicon
```
