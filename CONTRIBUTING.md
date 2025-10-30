# Contributing

Thanks for contributing! Please follow these guidelines to keep the repository clean and easy to work with.

## Workflow
- Create a feature branch from `master`/`main`.
- Use Conventional Commits in your commit messages (e.g., `feat:`, `fix:`, `docs:`).
- Open a Pull Request (PR). Fill out the PR template.
- Ensure CI passes (lint, typecheck, build).

## Setup
```bash
npm ci
cp env.example .env.local # Update values as needed
npm run dev
```

## Scripts
- `npm run dev` – Start Next.js dev server
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Biome lint
- `npm run format` – Biome format
- `npm run typecheck` – TypeScript typecheck

## Commit Messages
We enforce Conventional Commits via commitlint:
- `feat: add X`
- `fix: correct Y`
- `docs: update Z`
- `refactor: ...`, `chore: ...`, `ci: ...`

## Pre-commit hooks
Husky + lint-staged run Biome on staged files and a fast `typecheck`. If hooks are slow locally, they must remain in CI.

## Coding Standards
- TypeScript strict mode is enabled.
- Prefer clear naming and small components.
- Keep UI changes accessible (labels, focus states, color contrast).

## Environment
- Provide `NEXT_PUBLIC_API_URL` in `.env.local` for local development.
- Cookies must be configured by the backend for auth.

## PR Review
- Small, focused PRs are easier to review.
- Include screenshots for UI changes.
- Link related issues.
