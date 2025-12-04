# Railway Quick Start

## 1. GitHub Repository ✅
Repository is already connected to GitHub at: `https://github.com/ops-del/warriorforge-ai-agency`

## 2. Connect to Railway

1. Visit [Railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose `ops-del/warriorforge-ai-agency`

## 3. Required Environment Variables

Set these in Railway dashboard under **Variables** tab:

```
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
DATABASE_URL=<provided-by-railway-postgresql>
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=true
```

## 4. Add PostgreSQL Database

1. In Railway project, click **"New"** → **"Database"** → **"PostgreSQL"**
2. Copy the `DATABASE_URL` connection string
3. Add it to your service's environment variables

## 5. Deploy

Railway will automatically:
- Install dependencies
- Generate Prisma client
- Build TypeScript server and React client
- Start the application

## 6. Verify

Check these endpoints after deployment:
- `https://your-app.up.railway.app/api/health`
- `https://your-app.up.railway.app/api/automations`

## Next Steps

- Set up custom domain in Railway settings
- Configure CORS_ORIGIN to match your frontend URL
- Run database migrations (Railway will handle this via postinstall script)

---

For detailed instructions, see [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md)
