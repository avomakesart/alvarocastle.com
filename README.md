# alvarocastle.com

My personal site — portfolio, writing, the usual. Built with React Router 7 (SSR), Hygraph for content, Resend for the contact form, and Tailwind.

## Stack

- [React Router 7](https://reactrouter.com) (SSR mode)
- [Hygraph](https://hygraph.com) — headless CMS, queried via `@urql/core` + `gql.tada`
- [Resend](https://resend.com) — transactional email for the contact form
- [Tailwind v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com)
- [Bun](https://bun.sh) as runtime/package manager

## Running locally

```bash
bun install
bun dev
```

Open <http://localhost:5173>.

## Environment

Create a `.env` at the root:

```dotenv
HYGRAPH_AUTH_TOKEN=          # Hygraph Permanent Auth Token (content read scope)
HYGRAPH_CONTENT_ENDPOINT=    # Hygraph High Performance Content API endpoint
HYGRAPH_ENDPOINT=            # Hygraph Management API endpoint (only needed for the migrate script)
RESEND_API_KEY=              # Resend API key
```

Get the Hygraph tokens from Project Settings → API Access. Resend key from the Resend dashboard.

## Scripts

```bash
bun dev          # dev server
bun run build    # production build
bun start        # serve the production build
bun typecheck    # react-router typegen + tsc
bun run format   # prettier
```

## Hygraph schema migration

The full content schema lives in [`scripts/hygraph-migrate.ts`](scripts/hygraph-migrate.ts). Run once on an empty project:

```bash
DRY_RUN=true bun tsx scripts/hygraph-migrate.ts   # preview
bun tsx scripts/hygraph-migrate.ts                # apply
```

Needs `HYGRAPH_AUTH_TOKEN` with management scope and `HYGRAPH_ENDPOINT` pointing at the management API.

## Deploy

There's a [`Dockerfile`](Dockerfile) for containerized deploys. The image runs `react-router-serve` on the built output.
