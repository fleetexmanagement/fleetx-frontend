# FleetX Frontend

Modern Next.js 16 + React 19 app with Tailwind CSS v4, Radix UI, and better-auth.

## Tech Stack
- Next.js 16 (App Router) with React 19 + React Compiler
- Tailwind CSS v4, OKLCH color system, `next-themes`
- Radix UI primitives and custom UI components
- better-auth (email+password + email OTP)
- Biome (lint/format), TypeScript strict

## Getting Started
```bash
npm ci
cp env.example .env.local
# edit .env.local as needed
npm run dev
```

## Scripts
- `npm run dev` – Start dev server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Biome lint
- `npm run format` – Biome format write
- `npm run typecheck` – TypeScript typecheck

## Environment
- `NEXT_PUBLIC_API_URL` – Backend base URL used by Next rewrites and better-auth client.
- Backend must issue proper cookies (HttpOnly, SameSite, Secure) for auth.

## Contributing
- Follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, etc.).
- Pre-commit hooks run Biome and typecheck on staged files.
- Open PRs against `master`/`main` and fill the PR template.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for details.

## CI
GitHub Actions runs on push and PR:
- Install deps, lint (Biome), typecheck (TS), and build.

## Releases & Changelog
- Conventional Commits power automatic versioning and CHANGELOG generation (release automation configured via GitHub Actions—see `.github/workflows/*`).

## License
Private/Proprietary (update as needed).
