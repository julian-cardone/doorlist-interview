---
title: Vercel
doc_type: technology
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-08
related: ["docs/technologies/supabase.md"]
tags: [tooling, ci-cd]
---

# Vercel

Vercel hosts the production deployment of this project. It builds the Vite SPA on every push and
serves the resulting static assets from its edge network.

---

## Role in This Project

Vercel owns:

- Production hosting at the project's primary URL.
- Preview deployments for every branch and pull request.
- Environment variable management for the deployed application.
- The build pipeline triggered by pushes to GitHub.

No serverless functions, edge functions, or middleware are used in this project. Vercel serves the
built SPA and nothing more.

---

## Build Configuration

The project uses Vite. Vercel auto-detects the framework and applies these defaults:

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Install command  | `npm install`   |
| Node version     | Project default |

A `vercel.json` file is not required unless the defaults need to change. If routing or rewrites are
introduced, they belong in `vercel.json` and not in framework-specific configuration.

---

## Environment Variables

Environment variables are configured in the Vercel project settings under each environment
(Production, Preview, Development).

The following variables must be set:

| Variable                 | Purpose                            |
| ------------------------ | ---------------------------------- |
| `VITE_SUPABASE_URL`      | The Supabase project URL.          |
| `VITE_SUPABASE_ANON_KEY` | The public anonymous Supabase key. |

Variables prefixed with `VITE_` are inlined into the client bundle at build time. Secrets must not
use the `VITE_` prefix.

---

## Deployments

Deployments are triggered automatically:

- A push to the default branch produces a Production deployment.
- A push to any other branch produces a Preview deployment with a unique URL.
- A pull request comment links to the Preview URL for the head commit.

Manual rollback is performed through the Vercel dashboard by promoting a previous deployment to
Production.

---

## SPA Routing

The application is a single-page React Router SPA. Vercel must serve `index.html` for any unmatched
route so that client-side routing works on direct navigation to URLs such as `/event/:id`.

Vercel applies this rewrite automatically when Vite is detected as the framework. If the framework
detection ever changes, a `vercel.json` rewrite rule must be added:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Domains

The default `*.vercel.app` URL is used for this project. A custom domain is not configured.
