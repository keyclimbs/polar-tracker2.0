# Peakday — Polar Tracker

Peakday is a personal Polar wearable recovery and training dashboard built with Next.js, TypeScript, Tailwind CSS, Recharts, Prisma, Zod, and Vitest.

## Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The dashboard starts in deterministic 30-day demo mode, with no Polar connection required.

## Polar setup

1. Create a Polar AccessLink application and set its redirect URI to `http://localhost:3000/api/polar/callback`.
2. Set `POLAR_CLIENT_ID`, `POLAR_CLIENT_SECRET`, and `POLAR_REDIRECT_URI` in `.env.local`.
3. Set `DATABASE_URL` and a base64-encoded 32-byte `TOKEN_ENCRYPTION_KEY`.
4. Open `/settings` and choose **Connect Polar**.

Generate an encryption key with:

```bash
openssl rand -base64 32
```

## Validation

```bash
npm test
npm run lint
npm run build
```

See `docs/polar-capabilities.md` for endpoint, unit, retention, and device capability details.
