# Azure Production Deployment – Isekai Quest

## Overview

This document outlines the production deployment setup for the Isekai Quest frontend using Azure App Service and Azure SQL.

---

## Architecture

### Branch Strategy

- `main` → Production (Azure App Service)
- `test` → Pre-release validation (Azure App Service)

### Hosting

- Azure App Service (Linux)
- Node 20 LTS
- Next.js standalone build
- Startup command: `node server.js`

### Database

- Azure SQL Database (Production)
- Separate database for test environment

---

## Azure Resources

### App Services

- `Isekai-Quest-Production`
- `Isekai-Quest-Test`

### App Service Plans

- `ASP-IsekaiQuest-Production` (B1)
- Test plan (separate)

### SQL

- `Isekai_Quest_Production`
- `Isekai_Quest_Test`
- Shared SQL Server (temporary)

---

## Environment Variables

Configured in Azure App Service:

- `DATABASE_URL`
- `NEXT_PUBLIC_PERSISTENCE_MODE=remote`

---

## CI/CD Pipeline

### Workflow File

- .github/workflows/deploy-production.yml

### Trigger

- Push to `main`

### Build

- `npm install`
- `npm run build`
- Next.js standalone output

### Deployment

- Uses `azure/webapps-deploy@v3`
- Auth via publish profile:
  - `AZURE_WEBAPP_PUBLISH_PROFILE_PROD`

---

## Startup Configuration

Azure App Service → Configuration → General Settings

- node server.js

---

## Key Decisions

- Standalone build used for minimal runtime footprint
- Manual GitHub Actions pipeline (no Azure auto-generated workflows)
- Publish profile used for deployment auth
- Test and production environments separated at app + DB level

---
