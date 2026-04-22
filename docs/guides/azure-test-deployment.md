# Azure Test Deployment Setup (Isekai Quest)

## Overview

- test branch → Azure App Service
- purpose: pre-release / validation environment

## Azure App Service Configuration

- runtime: Node 20 (Linux)
- startup command: node server.js

## Environment Variables

- DATABASE_URL → Azure App Service setting
- NEXT_PUBLIC_PERSISTENCE_MODE → remote

## Build & Deployment (GitHub Actions)

- builds Next.js standalone output
- copies:
  - .next/standalone → deploy/
  - .next/static → deploy/.next/static
  - public → deploy/public
- deploys using Azure Web App action

## Important Notes

- app must use output: 'standalone'
- server.js is entry point
- app will restart when env vars change

## Known Limitations

- tests temporarily disabled in pipeline
- Node 20 deprecation warnings pending cleanup

## Validation Checklist

- app loads
- register works
- login works
- save works
- refresh works
- logout works
