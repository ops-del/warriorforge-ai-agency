# Vercel Deployment Verification Checklist

Use this checklist after deploying to Vercel to ensure everything is working correctly.

## Pre-Deployment

- [ ] GitHub repository is connected to Vercel
- [ ] All environment variables are configured in Vercel dashboard
- [ ] Database (PostgreSQL) is set up and `DATABASE_URL` is configured
- [ ] Email SMTP credentials are configured
- [ ] Domain is purchased (if using custom domain)

## During Deployment

- [ ] Build completes successfully without errors
- [ ] No build warnings related to missing dependencies
- [ ] Function deployment succeeds for `/api` routes

## Post-Deployment Testing

### Frontend Tests

- [ ] Homepage loads: `https://yourdomain.com`
- [ ] All pages accessible:
  - [ ] `/automations` - Browse automations
  - [ ] `/pricing` - Pricing page
  - [ ] `/contact` - Contact form
  - [ ] `/demo/lead-capture` - Lead capture demo
  - [ ] `/demo/support-inbox` - Support inbox demo
  - [ ] `/demo/appointment-setter` - Appointment setter demo
- [ ] Navigation works between pages
- [ ] Mobile responsive design looks correct

### Backend API Tests

Test all API endpoints:

```bash
# Health check
curl https://yourdomain.com/api/health

# List automations
curl https://yourdomain.com/api/automations

# Get single automation (replace ID)
curl https://yourdomain.com/api/automations/1
```

- [ ] Health check returns: `{"status":"ok"}`
- [ ] Automations endpoint returns list of automations
- [ ] Single automation endpoint returns automation details

### Database Tests

- [ ] Database connection is successful (check Vercel logs)
- [ ] Prisma migrations have been applied
- [ ] Database is seeded with sample automations
- [ ] Can query automation data via API

### Email Tests

- [ ] Submit demo lead form at `/demo/lead-capture`
- [ ] Check `ops@warriorforgeai.com` for notification email
- [ ] Email contains correct lead information
- [ ] Email sender shows as "WarriorForge Automations"

### Admin Tests

- [ ] Admin login page loads: `https://yourdomain.com/admin/login`
- [ ] Can log in with admin credentials
- [ ] Admin dashboard displays correctly
- [ ] Can view automations in admin panel
- [ ] Can view demo leads in admin panel
- [ ] Can view orders in admin panel

### DNS & Domain Tests (if using custom domain)

- [ ] Domain resolves to Vercel
- [ ] WWW subdomain redirects to apex domain (or vice versa)
- [ ] SSL certificate is active (https:// works)
- [ ] No mixed content warnings in browser console

### Performance Tests

- [ ] First page load is under 3 seconds
- [ ] Subsequent navigation is fast
- [ ] Images load correctly
- [ ] No console errors in browser DevTools
- [ ] Lighthouse score > 80 for all categories

## Troubleshooting Common Issues

### Build Fails

**Check:** Vercel build logs for specific errors
**Common Fixes:**
- Verify all dependencies are in `package.json`
- Check environment variables are set
- Ensure TypeScript has no compilation errors

### API Returns 404

**Check:** Vercel function logs
**Common Fixes:**
- Verify `vercel.json` rewrites are correct
- Check `/api` prefix is used in all API calls
- Ensure serverless function deployed successfully

### Database Connection Fails

**Check:** Vercel environment variables
**Common Fixes:**
- Verify `DATABASE_URL` is correct
- Ensure database allows Vercel IP addresses
- Check database is running and accessible
- Run `npx prisma migrate deploy` if needed

### Emails Not Sending

**Check:** Vercel function logs for SMTP errors
**Common Fixes:**
- Verify SMTP credentials in environment variables
- For Gmail: Use App Password instead of account password
- Check SMTP host and port are correct
- Verify email sending limits haven't been hit

### CORS Errors

**Check:** Browser console for CORS error details
**Common Fixes:**
- Update `CORS_ORIGIN` environment variable
- Ensure it matches your actual domain
- Redeploy after changing environment variables

## Monitoring

### Set Up Alerts

- [ ] Configure Vercel error alerts
- [ ] Monitor function execution time
- [ ] Watch for failed deployments
- [ ] Track API response times

### Regular Checks

- **Daily:** Check email notifications are working
- **Weekly:** Review Vercel analytics and logs
- **Monthly:** Check for dependency updates
- **As needed:** Monitor database storage usage

## Success Criteria

✅ **Deployment is successful when:**

1. Frontend loads without errors
2. All API endpoints respond correctly
3. Database queries work
4. Email notifications send successfully
5. Admin dashboard is accessible
6. Custom domain (if configured) works with SSL
7. No critical errors in Vercel logs

## Next Steps After Successful Deployment

1. Share live URL with team
2. Update social media bios with live URL
3. Begin marketing and outreach campaigns
4. Monitor Vercel usage and costs
5. Set up analytics (Google Analytics, etc.)
6. Plan first content releases

---

**Need Help?** Check [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md) for detailed deployment instructions.

**Support:** ops@warriorforgeai.com
