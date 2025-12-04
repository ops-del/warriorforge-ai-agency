# Railway Deployment Guide

This guide will help you deploy WarriorForge Automations to Railway.

## Prerequisites

- GitHub account with the repository pushed
- Railway account (sign up at https://railway.app)
- Your environment variables ready

## Step 1: Connect GitHub Repository to Railway

1. Go to [Railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose the `ops-del/warriorforge-ai-agency` repository
5. Railway will automatically detect the configuration files

## Step 2: Configure Environment Variables

In the Railway dashboard, go to **Variables** tab and add the following environment variables:

### Required Environment Variables

```env
# Server Configuration
PORT=4000
NODE_ENV=production

# CORS Configuration (use your Railway frontend URL)
CORS_ORIGIN=https://your-frontend-domain.com

# Database Configuration (PostgreSQL recommended for production)
DATABASE_URL=postgresql://user:password@host:5432/database

# Admin Credentials
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-secure-admin-password

# SMTP Configuration (for email notifications)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_SECURE=false
```

### How to Set Environment Variables in Railway

1. Open your project in Railway dashboard
2. Click on your service
3. Go to the **Variables** tab
4. Click **"New Variable"**
5. Add each variable name and value
6. Click **"Add"** for each variable

## Step 3: Database Setup (PostgreSQL)

Railway can provision a PostgreSQL database for you:

1. In your Railway project, click **"New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will create a database and provide a `DATABASE_URL`
4. Copy the `DATABASE_URL` from the PostgreSQL service
5. Add it to your service's environment variables

### Database Migration

After deploying, you need to run Prisma migrations:

1. In Railway dashboard, go to your service
2. Click on **"Deployments"**
3. Find the latest deployment
4. Click **"View Logs"**
5. You may need to run migrations manually via Railway CLI or add a migration command to your build process

**Alternative**: Add a postbuild script in `server/package.json`:

```json
{
  "scripts": {
    "postbuild": "npx prisma migrate deploy"
  }
}
```

## Step 4: Deploy the Application

Railway will automatically:
1. Detect the `nixpacks.toml` and `railway.json` configuration
2. Install dependencies for root, server, and client
3. Generate Prisma client
4. Build the server (TypeScript → JavaScript)
5. Build the client (React → static files)
6. Start the server with `node dist/index.js`

The deployment process follows these phases:
- **Setup**: Install Node.js 20 and npm
- **Install**: Install all dependencies
- **Build**: Generate Prisma client, build server and client
- **Start**: Run the Express server

## Step 5: Configure Frontend

After deployment, Railway will provide you with a URL for your backend (e.g., `https://your-app.up.railway.app`).

### For Frontend Deployment (Separate Service)

If you want to deploy the frontend separately:

1. Create a new service in Railway
2. Connect the same GitHub repository
3. Set the root directory to `client`
4. Add environment variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url.up.railway.app
   ```
5. Configure build command: `npm run build`
6. Configure start command: Use a static file server like `npx serve -s dist`

### For Serving Frontend from Backend

To serve the React frontend from the Express backend:

1. Update `server/src/app.ts` to serve static files:
   ```typescript
   import path from 'path';
   
   // After all API routes
   app.use(express.static(path.join(__dirname, '../../client/dist')));
   
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
   });
   ```

2. Set `CORS_ORIGIN` to match your Railway domain or set it to `*` for testing

## Step 6: Verify Deployment

1. Check the deployment logs in Railway
2. Visit your Railway URL (e.g., `https://your-app.up.railway.app`)
3. Test the health endpoint: `https://your-app.up.railway.app/api/health`
4. Test the automations endpoint: `https://your-app.up.railway.app/api/automations`

## Step 7: Custom Domain (Optional)

1. In Railway dashboard, go to **Settings**
2. Click **"Generate Domain"** or **"Add Custom Domain"**
3. Follow the instructions to configure your DNS

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port (Railway sets this automatically) | `4000` |
| `NODE_ENV` | Environment mode | `production` |
| `CORS_ORIGIN` | Allowed CORS origin | `https://yourdomain.com` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `ADMIN_EMAIL` | Admin notification email | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin authentication password | `secure_password_123` |
| `SMTP_HOST` | Email server host | `smtp.gmail.com` |
| `SMTP_PORT` | Email server port | `587` |
| `SMTP_USER` | Email server username | `your-email@gmail.com` |
| `SMTP_PASS` | Email server password | `your-app-password` |
| `SMTP_SECURE` | Use TLS/SSL | `false` or `true` |

## Troubleshooting

### Build Fails

- Check the deployment logs in Railway
- Verify all dependencies are in `package.json`
- Ensure TypeScript compiles without errors: `cd server && npm run build`

### Database Connection Issues

- Verify `DATABASE_URL` is correctly set
- Ensure Prisma migrations have been run
- Check that the database service is running in Railway

### CORS Errors

- Update `CORS_ORIGIN` to match your frontend domain
- For testing, you can temporarily set it to `*`
- Make sure to update it to your actual domain in production

### Application Not Starting

- Check that the `PORT` environment variable is set
- Verify the start command in Railway matches your setup
- Review deployment logs for specific error messages

## Railway CLI (Optional)

For advanced usage, install the Railway CLI:

```bash
npm install -g @railway/cli
railway login
railway link
railway run npm run dev  # Run locally with Railway environment
railway logs            # View deployment logs
```

## Continuous Deployment

Railway automatically deploys when you push to your connected GitHub branch:

1. Make changes to your code
2. Commit and push to GitHub
3. Railway detects the changes and triggers a new deployment
4. Monitor the deployment in the Railway dashboard

## Security Checklist

- [ ] Use strong `ADMIN_PASSWORD`
- [ ] Store sensitive data in environment variables, not in code
- [ ] Use PostgreSQL for production (not SQLite)
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper `CORS_ORIGIN` (not `*` in production)
- [ ] Use HTTPS for custom domains
- [ ] Regularly update dependencies
- [ ] Monitor deployment logs for errors

## Support

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Project Issues: https://github.com/ops-del/warriorforge-ai-agency/issues

---

**Note**: This is a monorepo structure. Railway will build both the server and client, but primarily serves the backend API. Consider deploying the frontend separately using Vercel or Netlify for optimal performance.
