FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx svelte-kit sync && npm run build

FROM caddy:2-alpine
COPY --from=builder /app/build /srv
EXPOSE 3000
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":3000"]
