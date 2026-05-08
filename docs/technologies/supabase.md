---
title: Supabase
doc_type: technology
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-08
related:
  [
    "docs/technologies/vercel.md",
    "docs/standards/project-structure.md",
    "docs/architecture/README.md",
  ]
tags: [tooling]
---

# Supabase

Supabase is the backend-as-a-service for this project. It provides the Postgres database, the
auto-generated REST API, and the public anonymous client used by the frontend.

---

## Role in This Project

Supabase owns:

- The `events` table, which is the only persistent data store.
- The REST API used by the frontend to create and read events.
- Row-level security policies that govern anonymous access.

The frontend uses the public anonymous key to communicate with Supabase. No server-side code or
custom backend exists in this project.

---

## Data Model

The `events` table contains all event data.

| Field             | Type        | Required | Notes                                             |
| ----------------- | ----------- | -------- | ------------------------------------------------- |
| `id`              | `uuid`      | yes      | Primary key. Used as the public event identifier. |
| `title`           | `text`      | yes      | Event title.                                      |
| `host_name`       | `text`      | yes      | Display name of the host.                         |
| `starts_at`       | `timestamp` | yes      | Event start time.                                 |
| `ends_at`         | `timestamp` | no       | Event end time.                                   |
| `location`        | `text`      | no       | Free-text location.                               |
| `description`     | `text`      | no       | Free-text description.                            |
| `theme_emoji`     | `text`      | no       | Selected theme emoji.                             |
| `cover_image_url` | `text`      | no       | Picsum URL for the cover image.                   |
| `created_at`      | `timestamp` | yes      | Auto-populated on insert.                         |

RSVP data is not stored in Supabase. RSVPs are persisted client-side via `localStorage`.

---

## Row-Level Security

RLS is enabled on the `events` table. The following policies apply:

- Anonymous clients may `SELECT` any row.
- Anonymous clients may `INSERT` new rows.
- `UPDATE` and `DELETE` are not permitted for anonymous clients.

These policies must be reviewed before adding any new table or modifying access patterns.

---

## Frontend Integration

The Supabase client is initialized in `src/lib/supabase.ts` using the public URL and anonymous key
from environment variables.

| Variable                 | Purpose                          |
| ------------------------ | -------------------------------- |
| `VITE_SUPABASE_URL`      | The Supabase project URL.        |
| `VITE_SUPABASE_ANON_KEY` | The public anonymous client key. |

These variables must be present in `.env.local` for local development and configured in Vercel for
deployment. The anonymous key is safe to expose in the frontend bundle. The service role key must
not appear in any frontend code or environment variable prefixed with `VITE_`.

All database access from components must go through the service layer in `src/services/events/`.
Components must not import the Supabase client directly.

---

## Schema Changes

Schema changes are made through the Supabase dashboard for this project. Migrations are not
version-controlled.

When the schema changes:

- The TypeScript types in `src/services/events/events.types.ts` must be updated in the same pull
  request.
- The mapper in `src/services/events/events.mappers.ts` must be updated to handle the change.
- This document must be updated to reflect the new shape.
