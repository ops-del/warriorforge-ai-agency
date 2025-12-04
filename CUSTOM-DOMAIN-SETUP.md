# Custom Domain Setup for warriorforgeai.com

This guide will help you configure `warriorforgeai.com` to work with your Railway deployment instead of localhost.

## Prerequisites

- ✅ Code is pushed to GitHub
- ✅ Railway project is connected and deployed
- ✅ You have access to your domain registrar (where you purchased warriorforgeai.com)

## Step 1: Deploy to Railway

If you haven't deployed yet:

1. Go to [Railway.app](https://railway.app) and sign in
2. Create a new project and connect your GitHub repository
3. Set environment variables (see `ENV-SETUP.md`)
4. Wait for the build to complete
5. Railway will provide you with a URL like: `https://your-app-name.up.railway.app`

## Step 2: Add Custom Domain in Railway

1. Open your Railway project dashboard
2. Click on your service (the deployed app)
3. Go to **Settings** tab
4. Scroll to **Domains** section
5. Click **"Custom Domain"**
6. Enter: `warriorforgeai.com`
7. Railway will provide you with DNS records to configure

**You'll see something like:**
```
Type: CNAME
Name: @
Value: your-app-name.up.railway.app
```

Or for the root domain:
```
Type: A
Name: @
Value: [IP addresses provided by Railway]
```

And for www subdomain:
```
Type: CNAME
Name: www
Value: your-app-name.up.railway.app
```

## Step 3: Configure DNS Records

### Option A: Using Your Domain Registrar

1. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Find the DNS management section
3. Add the records Railway provided:

**For root domain (warriorforgeai.com):**
- Delete any existing A or CNAME records for `@` or root
- Add the A records or CNAME record Railway provided
- TTL: 300 seconds (or default)

**For www subdomain:**
- Add a CNAME record:
  - Name: `www`
  - Value: `your-app-name.up.railway.app`
  - TTL: 300 seconds

**Example configuration:**
```
Type    Name    Value                           TTL
A       @       [Railway IP 1]                  300
A       @       [Railway IP 2]                  300
CNAME   www     your-app-name.up.railway.app    300
```

### Option B: Using Cloudflare (Recommended)

If you want better performance and security:

1. Go to [Cloudflare](https://cloudflare.com) and sign up
2. Add your domain `warriorforgeai.com`
3. Cloudflare will provide nameservers
4. Update your domain registrar to use Cloudflare's nameservers
5. In Cloudflare DNS settings, add:
   - Type: `CNAME`, Name: `@`, Value: `your-app-name.up.railway.app`, Proxy: Enabled
   - Type: `CNAME`, Name: `www`, Value: `your-app-name.up.railway.app`, Proxy: Enabled

## Step 4: Update Environment Variables

Once your domain is configured, update these in Railway:

```env
# Frontend URL - your custom domain
CORS_ORIGIN=https://warriorforgeai.com

# For production, use the same domain
NODE_ENV=production
```

**Important:** Make sure to use `https://` (not `http://`) for production.

## Step 5: Wait for DNS Propagation

DNS changes can take time to propagate:
- Minimum: 5-15 minutes
- Maximum: 24-48 hours
- Average: 1-2 hours

**Check DNS propagation:**
- Visit: https://dnschecker.org
- Enter: `warriorforgeai.com`
- Check if it points to Railway's servers

## Step 6: Verify Your Domain

Once DNS has propagated:

1. Visit: `https://warriorforgeai.com`
2. Test: `https://warriorforgeai.com/api/health`
3. Test: `https://warriorforgeai.com/api/automations`
4. Test: `https://www.warriorforgeai.com` (should work too)

## Step 7: Update Client Configuration (Optional)

If you deployed the frontend separately from the backend, update the client's environment variable:

In Railway dashboard for your frontend service:
```env
VITE_API_BASE_URL=https://warriorforgeai.com
```

Or if backend and frontend are on different subdomains:
```env
VITE_API_BASE_URL=https://api.warriorforgeai.com
```

## Troubleshooting

### Domain not loading

**Check DNS:**
```bash
# Check if DNS is pointing to Railway
nslookup warriorforgeai.com
dig warriorforgeai.com
```

**Common issues:**
- DNS not propagated yet (wait longer)
- Wrong CNAME/A record values
- Old DNS cache (clear browser cache, try incognito mode)

### CORS errors in browser console

Update `CORS_ORIGIN` in Railway environment variables:
```env
CORS_ORIGIN=https://warriorforgeai.com
```

Then redeploy or restart the service.

### SSL certificate errors

Railway automatically provisions SSL certificates. If you see SSL errors:
1. Wait 5-10 minutes for certificate provisioning
2. Check Railway dashboard for certificate status
3. Make sure you're using `https://` not `http://`

### Redirect loops or 404 errors

If serving frontend from backend (single Railway service):
1. Make sure `client/dist` was built during deployment
2. Verify the build command includes: `npm run build`
3. Check that static file serving is configured in `server/src/app.ts`

## Architecture Options

### Option 1: Single Railway Service (Backend + Frontend)

**Best for:** Smaller apps, simpler setup

Railway serves both backend API and frontend static files from one service.

**Setup:**
1. Keep current configuration
2. Point domain to Railway service: `warriorforgeai.com`
3. API is at: `https://warriorforgeai.com/api/*`
4. Frontend is at: `https://warriorforgeai.com/*`

### Option 2: Separate Services (Recommended for Production)

**Best for:** Better scalability, independent deployments

- Backend on Railway: `https://api.warriorforgeai.com`
- Frontend on Vercel/Netlify: `https://warriorforgeai.com` or `https://www.warriorforgeai.com`

**Setup:**
1. Deploy backend to Railway
2. Point subdomain to Railway: `api.warriorforgeai.com` → Railway service
3. Deploy frontend to Vercel/Netlify
4. Point root/www to frontend: `warriorforgeai.com` → Vercel/Netlify
5. Set `VITE_API_BASE_URL=https://api.warriorforgeai.com` for frontend
6. Set `CORS_ORIGIN=https://warriorforgeai.com` for backend

## Quick Reference

**What you need:**
- Domain registrar login (to update DNS)
- Railway dashboard access (to add custom domain)
- 1-2 hours for DNS to propagate

**Steps summary:**
1. Deploy to Railway
2. Add custom domain in Railway dashboard
3. Update DNS records at your registrar
4. Update CORS_ORIGIN environment variable
5. Wait for DNS propagation
6. Test your domain

## Support

- Railway docs: https://docs.railway.app/deploy/exposing-your-app
- DNS checker: https://dnschecker.org
- Railway Discord: https://discord.gg/railway

---

**Your domain will be live at:** `https://warriorforgeai.com` 🚀
