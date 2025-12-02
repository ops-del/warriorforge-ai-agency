# WarriorForge Launch Execution Plan

## 🎯 TODAY'S MISSION

Transform your brand into WarriorForge with Luma as your battle AI and establish omnichannel presence.

---

## ✅ COMPLETED

### 1. Luma Battle AI Created

- ✅ `luma-persona.md` - Complete system prompt and personality spec
- ✅ "Meet Luma" section added to landing page
- ✅ Luma greeting banners on all 3 demo pages
- ✅ Luma positioned as the strategic intelligence of WarriorForge

### 2. Social Media Commander Bot Built

- ✅ `/automation` folder with setup script
- ✅ `warriorforge-setup.ts` - Opens all signup pages and prints bios
- ✅ Platform-specific bios for 8 platforms
- ✅ Automated workflow for social account creation

### 3. Website Updates

- ✅ Pricing CTA section on landing page
- ✅ Contact page (`/contact`) with email form
- ✅ Pricing page (`/pricing`) with 3 tiers
- ✅ Navbar updated with Contact link
- ✅ All CTAs use ops@warriorforgeai.com

---

## 🚀 NEXT STEPS (Execute in Order)

### STEP 1: Run Social Setup Commander (15 minutes)

```bash
cd automation
npm run start
```

**What happens:**

- Terminal prints all handles and bios
- Browser opens 8 signup pages

**Your job:**

1. For each platform, use:
   - Email: `ops@warriorforgeai.com`
   - Handle: `warriorforgeai` or `WarriorForge Automations`
2. Copy the bio from terminal for that platform
3. Solve CAPTCHAs and SMS verification
4. Paste website: `https://warriorforgeai.com`

**Platforms:**

- ✅ TikTok: @warriorforgeai
- ✅ Instagram: @warriorforgeai
- ✅ Facebook: WarriorForge Automations Page
- ✅ YouTube: WarriorForge Automations Channel
- ✅ LinkedIn: WarriorForge Automations Company
- ✅ Twitter/X: @warriorforgeai
- ✅ Pinterest: WarriorForge Automations
- ✅ Google Business: WarriorForge Automations

---

### STEP 2: Update Backend Email Config (5 minutes)

Update `server/.env`:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ops@warriorforgeai.com
SMTP_PASS=<your-gmail-app-password>
EMAIL_FROM=ops@warriorforgeai.com
EMAIL_FROM_NAME=WarriorForge Automations
```

**Get Gmail App Password:**

1. Go to https://myaccount.google.com/apppasswords
2. Create app password for "WarriorForge Backend"
3. Paste the 16-character password in `.env`

**Restart backend:**

```bash
cd server
npm run dev
```

---

### STEP 3: Test Email System (3 minutes)

1. Go to https://warriorforgeai.com/demo/lead-capture (or localhost:5173/demo/lead-capture)
2. Fill out demo form with real email
3. Check ops@warriorforgeai.com inbox for:
   - Demo lead notification email
   - Confirmation that system is working

---

### STEP 4: Create First Content (30 minutes)

**Video 1: "Meet Luma" (60 seconds)**

- Script: "This is Luma, the battle AI we forged to capture leads 24/7. She qualifies them, follows up, and hands you only the ones ready to buy. Watch what happens when a lead hits the demo..."
- Record screen demo of lead capture page
- CTA: "Try it yourself: warriorforgeai.com/demo/lead-capture"

**Video 2: "24/7 Lead Machine" (45 seconds)**

- Script: "While you sleep, Luma is working. Every lead that hits your page gets instant response, qualification, and follow-up. Zero leaks, zero missed opportunities."
- Show backend admin panel with demo leads
- CTA: "See how it works: warriorforgeai.com"

**Post to:**

- TikTok (both videos)
- Instagram Reels (both videos)
- LinkedIn (Video 1)
- YouTube Shorts (both videos)

---

### STEP 5: Begin Outreach (Ongoing)

**DM Campaign (10-20 per platform/day):**

- Target: Business owners, coaches, real estate agents, agencies
- Message template:

```
Hey [Name], saw your [business/content]. Quick question:
How are you handling leads that come in after hours or when you're busy?

We built an AI that responds instantly, qualifies them, and books calls 24/7.
Try the demo here: warriorforgeai.com/demo/lead-capture

No pitch, just see if it fits your workflow. - Gabriel
```

**Email Outreach (20-50/day):**

- Use ops@warriorforgeai.com as sender
- Subject: "Quick question about your lead flow"
- Same message as DM template above

**Platforms to target:**

- TikTok creators in business niches
- Instagram business accounts
- LinkedIn connections
- Facebook groups (provide value first)

---

### STEP 6: Domain & Deployment (Optional - Future)

When ready to go fully live:

1. **Purchase domain:** warriorforgeai.com
2. **Deploy frontend:** Vercel
   ```bash
   cd client
   vercel --prod
   ```
3. **Deploy backend:** Render / Railway / Fly.io
4. **Update DNS:** Point domain to Vercel
5. **Update .env:** Set production API URLs
6. **Email DNS:** Add SPF, DKIM, DMARC records

---

## 📊 SUCCESS METRICS (Track Daily)

### Week 1 Goals:

- ✅ All 8 social accounts created and active
- ✅ 14+ videos/posts published (2/day minimum)
- ✅ 100+ DMs sent across platforms
- ✅ 50+ emails sent
- ✅ 10+ demo submissions
- ✅ 3+ booked calls

### Daily Tracking:

- DMs sent: \_\_\_ / 20
- Emails sent: \_\_\_ / 20
- Content posted: \_\_\_ / 2
- Demo leads: \_\_\_
- Calls booked: \_\_\_

---

## 🔥 WARRIOR MINDSET

**Luma's Mantra:**

- War against wasted potential
- Systems over feelings
- Clarity over confusion
- Action over theory

**Your Daily Non-Negotiables:**

1. Post 2 pieces of content (video/carousel/text)
2. Send 20+ DMs
3. Send 20+ emails
4. Check ops@warriorforgeai.com inbox
5. Follow up with demo leads within 4 hours

---

## 📁 PROJECT STRUCTURE

```
ai-automation-agency/
├── automation/              # Social setup commander
│   ├── warriorforge-setup.ts
│   └── README.md
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx (with "Meet Luma")
│   │   │   ├── ContactPage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   └── demos/
│   │   │       ├── LeadCaptureDemoPage.tsx (Luma banner)
│   │   │       ├── SupportInboxDemoPage.tsx (Luma banner)
│   │   │       └── AppointmentSetterDemoPage.tsx (Luma banner)
├── server/                  # Backend (Express + Prisma)
│   ├── .env                 # Email config with ops@warriorforgeai.com
│   └── src/
├── luma-persona.md          # Luma system prompt
└── EXECUTION-PLAN.md        # This file
```

---

## 🎬 EXECUTE NOW

Run this command to start your social takeover:

```bash
cd automation
npm run start
```

Then follow STEP 1-5 above.

**LET'S FORGE.**
