# KejaYangu – Secure Rentals with Blockchain Receipts

- **Live URL**: [keja-yangu.onrender.com](https://keja-yangu.onrender.com)

## Tech Stack
- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- React Router v6
- TanStack Query (React Query)
- Recharts (charts)
- Sui SDKs (`@mysten/dapp-kit`, `@mysten/sui`)

## Run locally
Prerequisites: Node.js 18+ and npm

```sh
# 1) Install dependencies
npm ci

# 2) Start dev server (http://localhost:5173)
npm run dev

# 3) Build for production (outputs to dist/)
npm run build

# 4) Preview the production build locally
npm run preview
```

## Project scripts
- `npm run dev`: start the Vite dev server
- `npm run build`: production build to `dist/`
- `npm run preview`: preview the production build
- `npm run lint`: run ESLint

## Deploy (Render – Static Site)
You can deploy this as a static site on Render.

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- SPA rewrite rule (to support React Router deep links):
  - Source: `/*`, Destination: `/index.html`, Action: `200`

The site is currently live at [keja-yangu.onrender.com](https://keja-yangu.onrender.com).

## Notes
- This is a client-side rendered SPA. Ensure your host is configured to rewrite unknown routes to `index.html` so deep links do not 404.
