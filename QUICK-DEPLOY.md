# 🚀 Quick Deploy to Vercel - 5 Minutes

Fast-track deployment guide for WarriorForge Automations on Vercel.

## Step 1: Import to Vercel (2 minutes)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `warriorforge-ai-agency` repository
4. Click "Import"

## Step 2: Configure Project (2 minutes)

**Framework Preset:** Other

**Build Settings:**
- Build Command: `cd client && npm install && npm run build`
- Output Directory: `client/dist`
- Install Command: `npm install --prefix server && npm install --prefix client`

**Root Directory:** Leave empty (use root)

Click "Deploy" (this first deploy will fail - that's OK, we need to add environment variables)

## Step 3: Add Environment Variables (1 minute)

Go to: Project Settings → Environment Variables

Add these **required** variables:

```
DATABASE_URL=postgresql://your-db-connection-string
ADMIN_EMAIL=ops@warriorforgeai.com
ADMIN_PASSWORD=your_secure_password
CORS_ORIGIN=https://your-vercel-app.vercel.app
NODE_ENV=production
```

Add these **email** variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ops@warriorforgeai.com
SMTP_PASS=your_gmail_app_password
EMAIL_FROM=ops@warriorforgeai.com
EMAIL_FROM_NAME=WarriorForge Automations
```

**Note:** For Gmail App Password:
1. Go to https://myaccount.google.com/apppasswords
2. Create password for "WarriorForge Backend"
3. Use the 16-character password (no spaces)

## Step 4: Set Up Database (Optional - 3 minutes)

### Option A: Use Vercel Postgres (Easiest)

1. In your Vercel project, go to Storage tab
2. Click "Create Database"
3. Select "Postgres"
4. Vercel auto-adds `DATABASE_URL` to your environment

### Option B: Use External Provider

Choose one:
- [Railway](https://railway.app) - Free PostgreSQL
- [Supabase](https://supabase.com) - Free with 500MB
- [Neon](https://neon.tech) - Serverless Postgres

Copy the connection string and add as `DATABASE_URL` in Vercel.

## Step 5: Deploy & Migrate (1 minute)

1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment
3. Wait for build to complete

After deployment succeeds, run migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Run migrations (if using Vercel Postgres or external DB)
cd server
npx prisma migrate deploy
npx prisma db seed
```

## Step 6: Connect Domain (Optional - 5 minutes)

### Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain: `warriorforgeai.com`
3. Add www: `www.warriorforgeai.com`

### Update DNS Records

**Option A: Vercel Nameservers (Recommended)**

In your domain registrar (GoDaddy, Namecheap, etc.):

```
Nameserver 1: ns1.vercel-dns.com
Nameserver 2: ns2.vercel-dns.com
```

**Option B: Custom DNS Records**

Add these in your DNS provider:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

Wait 5-48 hours for DNS propagation.

### Update Environment Variable

After domain is connected:

```
CORS_ORIGIN=https://warriorforgeai.com
```

Redeploy for changes to take effect.

## ✅ Verify Deployment

Test these URLs (replace with your domain):

```bash
# Frontend
https://your-app.vercel.app

# API Health
https://your-app.vercel.app/api/health

# Automations
https://your-app.vercel.app/api/automations

# Demo
https://your-app.vercel.app/demo/lead-capture
```

## 🎯 You're Live!

**Next steps:**

1. ✅ Test demo form and check email delivery
2. ✅ Login to admin panel
3. ✅ Update social media with live URL
4. ✅ Begin content and outreach campaigns

## 📚 Need More Details?

- Full deployment guide: [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md)
- Verification checklist: [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)
- General docs: [README.md](./README.md)

## 💡 Pro Tips

1. **Auto-deploys:** Every push to `main` branch auto-deploys
2. **Preview deploys:** Pull requests get preview URLs
3. **Logs:** Check Vercel dashboard → Deployments → Functions for logs
4. **Env changes:** Always redeploy after changing environment variables
5. **Cold starts:** First API request may be slow (serverless warmup)

---

**Need help?** Contact: ops@warriorforgeai.com

**LET'S FORGE! ⚔️**
