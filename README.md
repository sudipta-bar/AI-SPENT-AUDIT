# AI Spend Audit

Production-ready MERN SaaS scaffold for auditing AI software spend, generating savings recommendations, capturing leads, and sharing public audit reports.

## Stack

- React + Vite + JavaScript
- Tailwind CSS
- React Router DOM
- Zustand
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT authentication
- OpenRouter API
- Nodemailer

## Structure

```text
/client
/server
README.md
ARCHITECTURE.md
DEVLOG.md
TESTS.md
PRICING_DATA.md
PROMPTS.md
```

## Quick start

```bash
npm install
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run dev:server
npm run dev:client
```

## Main API routes

- `POST /api/audits`
- `GET /api/audits/share/:slug`
- `POST /api/ai-summary`
- `POST /api/leads`
- `POST /api/auth/login`
- `GET /api/admin/leads`

## Deployment notes

- Deploy `client/` to Vercel or Netlify.
- Deploy `server/` to Render, Railway, or Fly.io.
- Use MongoDB Atlas for the shared database.
- Configure `CLIENT_URL` to your deployed frontend origin.

## Testing

```bash
npm test
```
