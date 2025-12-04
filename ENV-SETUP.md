# Environment Variables Setup

This document lists all environment variables needed for WarriorForge Automations.

## Server Environment Variables

Create a `.env` file in the `/server` directory with these variables:

### Core Configuration

```env
# Server Port (Railway will override this automatically)
PORT=4000

# Node Environment
NODE_ENV=development

# CORS Configuration
# For local development
CORS_ORIGIN=http://localhost:5173
# For production (update with your frontend URL)
# CORS_ORIGIN=https://your-frontend-domain.com
```

### Database Configuration

```env
# SQLite (Development only)
DATABASE_URL="file:./dev.db"

# PostgreSQL (Production - recommended)
# DATABASE_URL="postgresql://username:password@host:5432/database_name"
# Railway will provide this automatically if you add a PostgreSQL database
```

### Admin Authentication

```env
# Admin email for notifications
ADMIN_EMAIL=your-admin-email@example.com

# Admin password for admin routes
ADMIN_PASSWORD=your-secure-password-here
```

### SMTP Configuration (Email Notifications)

```env
# SMTP Server Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_SECURE=false

# Example for Gmail:
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-specific-password
# SMTP_SECURE=true
```

## Client Environment Variables

Create a `.env` file in the `/client` directory (optional):

```env
# API Base URL
# For local development
VITE_API_BASE_URL=http://localhost:4000

# For production (update with your Railway backend URL)
# VITE_API_BASE_URL=https://your-backend-app.up.railway.app
```

## Railway-Specific Setup

When deploying to Railway, set these environment variables in the Railway dashboard:

### Backend Service

```
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
DATABASE_URL=<from Railway PostgreSQL service>
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=<secure-password>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your-email>
SMTP_PASS=<your-password>
SMTP_SECURE=true
```

### Frontend Service (if deployed separately)

```
VITE_API_BASE_URL=https://your-backend.up.railway.app
```

## Security Best Practices

1. ✅ **Never commit `.env` files to Git** - they contain sensitive data
2. ✅ **Use strong passwords** for `ADMIN_PASSWORD`
3. ✅ **Use environment-specific values** - different for dev/staging/prod
4. ✅ **Rotate credentials regularly** - especially for production
5. ✅ **Use PostgreSQL in production** - not SQLite
6. ✅ **Enable SMTP_SECURE** in production for encrypted email

## Quick Setup Commands

### Copy example files

```bash
# Server
cd server
cp .env.example .env
# Edit .env with your values

# Client (optional)
cd ../client
cp .env.example .env
# Edit .env with your values
```

### Verify configuration

```bash
# Test server environment loading
cd server
npm run dev

# Should see: "API server listening on http://localhost:4000"
```

## Troubleshooting

### Database connection errors
- Check `DATABASE_URL` format is correct
- For PostgreSQL, ensure the database exists
- For SQLite, ensure the directory has write permissions

### Email not sending
- Verify SMTP credentials are correct
- Check if your email provider requires app-specific passwords
- Ensure firewall/network allows SMTP port (usually 587 or 465)

### CORS errors in browser
- Update `CORS_ORIGIN` to match your frontend URL
- Include protocol (http:// or https://)
- No trailing slash in the URL

### Admin authentication failing
- Verify `ADMIN_PASSWORD` is set correctly
- Check there are no extra spaces or special characters
- Ensure the password in login matches the environment variable

## Getting SMTP Credentials

### Gmail (Recommended for testing)
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use these settings:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_SECURE=true`

### SendGrid
1. Sign up at https://sendgrid.com
2. Create an API key
3. Use these settings:
   - `SMTP_HOST=smtp.sendgrid.net`
   - `SMTP_PORT=587`
   - `SMTP_USER=apikey`
   - `SMTP_PASS=<your-api-key>`

### Other Providers
- Mailgun: https://www.mailgun.com
- AWS SES: https://aws.amazon.com/ses/
- Postmark: https://postmarkapp.com

---

For deployment-specific instructions, see [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md)
