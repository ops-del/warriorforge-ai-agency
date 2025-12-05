# Vercel Serverless API

This directory contains the serverless function entry point for deploying the WarriorForge backend to Vercel.

## How It Works

Vercel's serverless functions architecture requires a specific entry point. The `serverless.ts` file imports the Express app from `../server/src/app.ts` and exports it as a Vercel serverless function.

When deployed to Vercel:
- All `/api/*` routes are handled by this serverless function
- The Express app runs in a serverless environment
- Each request spins up a new instance (cold start on first request)
- Static frontend files are served from the CDN

## Local Development

For local development, you don't use this file. Instead, run:

```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend  
npm run dev:client
```

## Deployment

This file is automatically used by Vercel during deployment. See `VERCEL-DEPLOYMENT.md` for full deployment instructions.
