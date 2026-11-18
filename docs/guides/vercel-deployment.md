# Vercel Deployment (Isekai Quest)

## Overview

Isekai Quest is hosted on Vercel and deployed through Vercel's GitHub
integration. There is no deployment workflow in `.github/workflows`:
Vercel watches the repository directly.

- `main` builds and promotes to production
- every other branch and pull request gets its own preview deployment

The app has no backend. All persistence is browser localStorage, so there
are no environment variables, no secrets and no database to configure.

---

## Project Settings

- Framework preset: Next.js (detected automatically)
- Build command: `next build` (Vercel default, no override)
- Install command: `npm install` (Vercel default)
- Output directory: Vercel default, no override
- Production branch: `main`

`output: 'standalone'` is deliberately absent from `next.config.ts`. It
exists to produce a self contained Node server for container and app
service hosting. Vercel ignores the standalone directory, so the setting
does nothing here and has caused build failures in some Next.js versions.

---

## Node Version

Pinned in `package.json`:

```json
"engines": {
  "node": "24.x"
}
```

`engines.node` takes precedence over the version chosen in Vercel Project
Settings, so the pin is the single source of truth.

Pin a major version, never `major.minor.patch`: Vercel can only select a
major and warns on anything more specific. Avoid open ranges like
`>=20` as well, since Vercel resolves them to the newest available major
and will silently move the build onto a Node you are not running locally.

---

## Branch and Deployment Flow

1. Cut a feature branch from `main`
2. Work locally, run `npm run test:ci` and `npm run build`
3. Open a pull request into `main`
4. CI runs the test suite and a production build (`.github/workflows/ci.yml`)
5. Vercel posts a preview deployment URL on the pull request
6. Validate against the preview URL
7. Merge into `main`, which promotes to production

The preview deployment replaces the dedicated staging branch this project
used previously. Every pull request gets a real, shareable deployment, so
there is no need to merge unfinished work into a shared branch to see it
running.

---

## CI Gate

`.github/workflows/ci.yml` runs on pull requests into `main` and performs:

- `npm ci`
- `npm run test:ci`
- `npm run build`

The build step is not redundant with the tests. Lint and type errors have
blocked production builds on this project while the unit tests stayed
green, so the suite alone is not a sufficient gate.

Vercel deploys independently of this workflow. To make the gate binding,
enable branch protection on `main` in repository settings and require the
`verify` check to pass before merging.

---

## Domain

The site is served from its Vercel assigned `.vercel.app` subdomain. No
custom domain is attached. Adding one later is done entirely in the Vercel
dashboard under Project Settings, Domains, and requires no code change.

---

## Validation Checklist

After a deployment:

- app loads
- register works
- login works
- save works
- refresh preserves the session and the active quest
- logout works

Saves live in the browser, so each environment and each browser profile
holds its own independent data. A character created against a preview
deployment will not appear in production, and clearing site data wipes
all progress.

---

## History

This project previously deployed to Azure App Service with an Azure SQL
backend, driven by GitHub Actions workflows. That subscription was
cancelled and the database layer removed. See the storage backend note in
`lib/persistence/persistence.ts` for what was deleted and how to recover
it from git history.
