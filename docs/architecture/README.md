---
title: Architecture Overview
doc_type: architecture
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-08
related:
  ["docs/technologies/stack.md", "docs/technologies/supabase.md", "docs/technologies/vercel.md"]
tags: [architecture]
---

# Architecture Overview

This application is a React SPA for creating and viewing events. A host creates an event via a
form-driven flow and receives a permanent shareable link. Anyone with that link can view the event
and submit a local RSVP.

---

## System Diagram

```
┌─────────────────────┐         ┌──────────────────────┐
│   React (Vite) SPA  │ ──API──▶│      Supabase        │
│   on Vercel         │         │   - events table     │
│                     │ ◀───────│   - REST auto-API    │
└─────────────────────┘         └──────────────────────┘
        │
        ├── localStorage (RSVPs only)
        └── picsum.photos (cover images, referenced by URL)
```

---

## Data Persistence

| Concern      | Storage           | Notes                                         |
| ------------ | ----------------- | --------------------------------------------- |
| Events       | Supabase `events` | Permanent. UUID used as public identifier.    |
| Cover images | picsum.photos URL | Stored as a URL reference, not a file upload. |
| RSVPs        | `localStorage`    | Client-only. Not sent to the backend.         |

For the full data model and RLS policies, see [Supabase](../technologies/supabase.md).

---
