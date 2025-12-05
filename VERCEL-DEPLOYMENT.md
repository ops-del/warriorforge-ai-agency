# Vercel Deployment Guide for WarriorForge Automations

This guide will walk you through deploying the WarriorForge Automations platform to Vercel.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub repository connected to Vercel
- Domain name (optional, but recommended)

## Quick Start

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Project**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect the framework

2. **Configure Build Settings**
   - Framework Preset: Other
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install --prefix server && npm install --prefix client`

3. **Add Environment Variables** (see section below)

4. **Deploy!**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Environment Variables

Configure these in your Vercel project settings (Settings → Environment Variables):

### Required Variables

```env
# Database (PostgreSQL recommended for production)
DATABASE_URL=postgresql://user:password@host:5432/database

# Admin Credentials
ADMIN_EMAIL=ops@warriorforgeai.com
ADMIN_PASSWORD=your_secure_password_here

# CORS Origin (your frontend URL)
CORS_ORIGIN=https://yourdomain.com

# Node Environment
NODE_ENV=production
```

### Email Configuration (SMTP)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ops@warriorforgeai.com
SMTP_PASS=your_gmail_app_password
EMAIL_FROM=ops@warriorforgeai.com
EMAIL_FROM_NAME=WarriorForge Automations
```

### Optional Variables

```env
# Server Port (Vercel handles this automatically)
PORT=4000

# Stripe (if implementing payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Database Setup

### Using PostgreSQL (Recommended for Production)

We recommend using a managed PostgreSQL service:

1. **Vercel Postgres** (easiest integration)
   - Go to your Vercel project → Storage → Create Database
   - Select Postgres
   - Vercel will automatically add `DATABASE_URL` to your environment

2. **Or use external providers:**
   - [Railway](https://railway.app) - Free tier available
   - [Supabase](https://supabase.com) - Free tier with 500MB
   - [Neon](https://neon.tech) - Serverless Postgres
   - [PlanetScale](https://planetscale.com) - MySQL alternative

3. **Run Prisma Migrations**
   ```bash
   # After setting up DATABASE_URL
   cd server
   npx prisma migrate deploy
   npx prisma db seed
   ```

### SQLite (Development Only)

SQLite is included by default but **not recommended** for production on Vercel due to serverless architecture limitations.

## Domain Configuration

### Connect Your Domain

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add your domain: `warriorforgeai.com`
   - Add www subdomain: `www.warriorforgeai.com`

2. **Update DNS Records:**

   **Option A: Use Vercel Nameservers (Recommended)**
   
   Update your domain registrar with these nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
   
   **Option B: Use Custom DNS (A/CNAME Records)**
   
   Add these records in your DNS provider:
   ```
   Type    Name    Value
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns.com
   ```

3. **Wait for DNS Propagation** (can take up to 48 hours)

4. **SSL Certificate** - Vercel automatically provisions Let's Encrypt SSL certificates

### Email DNS Setup (for SMTP)

If using ops@warriorforgeai.com, add these DNS records for better deliverability:

```
# SPF Record
Type: TXT
Name: @
Value: v=spf1 include:_spf.google.com ~all

# DMARC Record
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:ops@warriorforgeai.com

# DKIM Record (get from Google Workspace)
Type: TXT
Name: google._domainkey
Value: [provided by Google Workspace]
```

## Update Frontend API URL

After deployment, update your frontend to point to the production API:

1. In Vercel, the API will be available at the same domain: `https://yourdomain.com/api`
2. No need to update `VITE_API_BASE_URL` if using relative URLs
3. If needed, add environment variable in Vercel:
   ```
   VITE_API_BASE_URL=https://yourdomain.com
   ```

## Post-Deployment Checklist

- [ ] Verify frontend loads: `https://yourdomain.com`
- [ ] Test API health check: `https://yourdomain.com/api/health`
- [ ] Test automation listing: `https://yourdomain.com/api/automations`
- [ ] Submit test demo lead: `https://yourdomain.com/demo/lead-capture`
- [ ] Check email delivery to ops@warriorforgeai.com
- [ ] Test admin login: `https://yourdomain.com/admin/login`
- [ ] Verify all demo pages work
- [ ] Test order form submission

## Monitoring & Debugging

### View Logs

1. **Vercel Dashboard:**
   - Go to your project → Deployments → Select deployment → Functions
   - Click on function logs to see API errors

2. **Real-time Logs:**
   ```bash
   vercel logs --follow
   ```

### Common Issues

**Issue: API Routes Return 404**
- Solution: Ensure `vercel.json` rewrites are configured correctly
- Check that `/api` prefix is used in all API calls

**Issue: Database Connection Fails**
- Solution: Verify `DATABASE_URL` is set in environment variables
- Ensure database allows connections from Vercel IPs

**Issue: Email Not Sending**
- Solution: Check SMTP credentials in environment variables
- Verify Gmail "Less secure app access" or use App Password

**Issue: CORS Errors**
- Solution: Update `CORS_ORIGIN` environment variable to match your domain

## Scaling Considerations

### Performance Optimization

1. **Database Connection Pooling**: Consider using Prisma Data Proxy for better connection management
2. **CDN**: Vercel automatically serves static assets via Edge Network
3. **Function Regions**: Configure function regions closer to your users
4. **Caching**: Implement API response caching where appropriate

### Cost Management

- Vercel Free tier includes:
  - 100 GB bandwidth
  - 100 GB-hours serverless function execution
  - Automatic SSL
  - Unlimited deployments

- Monitor usage in Vercel dashboard → Usage tab

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

Configure branch protection and preview environments in project settings.

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **Admin Password**: Use strong, unique password
3. **Database**: Use SSL connection for database
4. **API Rate Limiting**: Consider implementing rate limiting for public endpoints
5. **CORS**: Restrict to your domain only

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)

---

## Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View logs
vercel logs

# Environment variables
vercel env ls
vercel env add DATABASE_URL
vercel env rm DATABASE_URL

# Pull environment locally
vercel env pull .env.local

# Link local project to Vercel
vercel link
```

---

**Ready to deploy?** Start with Option 1 above and have your WarriorForge Automations live in minutes! 🚀

For questions or issues, contact: ops@warriorforgeai.com
