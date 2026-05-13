# Architecture

## Overview

AI Spend Audit is a two-service MERN application:

1. `client`: Vite SPA responsible for data entry, dashboards, admin login, and public share pages.
2. `server`: Express API responsible for persistence, audit generation, AI summary orchestration, lead capture, email delivery, and admin authorization.

## Request flow

1. User enters tool subscriptions in the audit form.
2. Form state persists locally through Zustand plus `localStorage`.
3. Client submits audit input to `POST /api/audits`.
4. Server runs deterministic audit rules, stores a share-safe record, and returns recommendations plus a share URL slug.
5. Client optionally requests `POST /api/ai-summary` for a personalized narrative.
6. Lead capture stores CRM data and sends a confirmation email.

## Privacy

- Public share pages exclude email, company name, role, and honeypot fields.
- Leads live in a separate collection from shared audit records.
- Admin lead access is protected by JWT middleware.
