# WarriorForge Automations - Quick Start Guide

## 🚀 Setup Instructions

### Backend Setup

1. **Open terminal in VS Code and navigate to server**

   ```powershell
   cd server
   ```

2. **Install dependencies**

   ```powershell
   npm install
   ```

3. **Create environment file**

   ```powershell
   # PowerShell command
   Copy-Item .env.example .env

   # Or manually in Explorer: duplicate .env.example and rename to .env
   ```

4. **Edit `server/.env` with your settings**

   ```env
   PORT=4000
   CORS_ORIGIN=http://localhost:5173
   DATABASE_URL="file:./dev.db"

   ADMIN_EMAIL=yourrealemail@example.com
   ADMIN_PASSWORD=WarriorForgeAdmin123

   # For Gmail:
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_gmail@gmail.com
   SMTP_PASS=your_gmail_app_password
   SMTP_SECURE=false
   ```

   **Gmail Setup**: Create an App Password in Google Account Security → 2-Step Verification → App Passwords. Use that as `SMTP_PASS`.

5. **Initialize database**

   ```powershell
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

6. **Start backend server**

   ```powershell
   npm run dev
   ```

   You should see: `API server listening on http://localhost:4000`

7. **Test API (optional)**
   - Open browser to: http://localhost:4000/api/health
   - Open browser to: http://localhost:4000/api/automations
   - You should see JSON responses

### Frontend Setup

1. **Open NEW terminal in VS Code**

   ```powershell
   cd client
   ```

2. **Install dependencies**

   ```powershell
   npm install
   ```

3. **Start frontend server**

   ```powershell
   npm run dev
   ```

   Vite will show: `http://localhost:5173`

4. **Open in browser**
   - Go to: http://localhost:5173
   - You should see the WarriorForge landing page

## 🎯 Key URLs to Use

### Public-Facing (send traffic here)

- **Main Demo**: http://localhost:5173/demo/lead-capture
- **Support Demo**: http://localhost:5173/demo/support-inbox
- **Appointment Demo**: http://localhost:5173/demo/appointment-setter
- **Automations Catalog**: http://localhost:5173/automations
- **Landing Page**: http://localhost:5173

### Admin (for you)

- **Admin Login**: http://localhost:5173/admin/login
  - Password: `WarriorForgeAdmin123` (or whatever you set in `.env`)
- **Admin Dashboard**: http://localhost:5173/admin
- **View Demo Leads**: http://localhost:5173/admin/demo-leads
- **View Orders**: http://localhost:5173/admin/orders

## 💰 Money-Making Execution Plan

### Step A: Brand & Social (60-90 min)

1. **Register domain**

   - warriorforgeautomations.com (or variant)

2. **Create social accounts**

   - TikTok: @WarriorForgeAutomations
   - Instagram: @WarriorForgeAutomations
   - Facebook Page: WarriorForge Automations
   - YouTube: WarriorForge Automations

3. **Bio template**
   ```
   ⚔️ AI Automations for Revenue Growth
   Capture leads, book calls, automate support
   Try live demo 👇
   [YourDomain.com/demo/lead-capture]
   ```

### Step B: Record Videos (60 min)

**Script 1: Hook Video**

```
"Most businesses leave money on the table because no one
responds to leads fast enough. I forged an AI system that
captures leads instantly and follows up automatically.
Want to see it in action? Try the live demo — link in bio."
```

**Script 2: Screen Recording**

```
"This is the WarriorForge Lead Capture System. Watch this —
it acts like a 24/7 sales warrior for your business, capturing
details, qualifying the lead, and handing it to you ready to close.
Try this exact demo yourself — link in my bio."
```

**Post to:**

- TikTok
- Instagram Reels
- YouTube Shorts
- Facebook Reels

**Caption:** `AI lead capture demo ⚔️ Try it yourself: [your link]`

### Step C: Outreach (90-120 min)

**Target businesses:**

- Local real estate agents
- Roofers / contractors
- Gyms
- Med spas
- Coaches
- Agencies

**DM Script:**

```
Hey [Name], quick question — are you still handling all your
leads manually?

I run WarriorForge Automations. We forge AI systems that
capture leads 24/7, qualify them, and book appointments
automatically.

Try a live demo: [your /demo/lead-capture URL]

If you like how it works, I can install a customized version
for your business in 24–72 hours.
```

**Email Script:**

```
Subject: Quick question about your leads

Hey [Name],

Most businesses lose 30–50% of their leads because nobody
responds fast enough.

I run WarriorForge Automations. We build AI systems that:
• Capture leads instantly
• Qualify them
• Book appointments
• Follow up automatically

Try a live demo: [your /demo/lead-capture URL]

If you like what you see, I can set this up for your business
in 24–72 hours.

– [Your Name]
WarriorForge Automations
```

**Goal:** DM/email 20-30 businesses today

### Step D: Convert Leads

**When a lead comes in:**

1. **Check your email** (ADMIN_EMAIL from .env)

   - You'll get notifications for both demo leads and orders

2. **Reply quickly (within 1 hour)**

   ```
   Just saw you tried the WarriorForge demo — appreciate that.

   Want me to show you exactly how this would run in YOUR
   business and what ROI looks like?

   I can hop on a quick 20-minute call today or tomorrow.
   What time works for you?
   ```

3. **On the call:**

   - Ask about their main bottleneck (leads? follow-up? appointments? support?)
   - Position your offer:
     - **Setup fee**: $1,000-$1,500 (done-for-you implementation)
     - **Monthly**: $200-$500 (maintenance + optimization)

4. **Use your own order form**
   - Create "Custom Setup Package" in admin
   - Send them YOUR order link
   - Eat your own dog food ⚔️

## 📊 Tracking Success

**Check daily:**

- `/admin/demo-leads` - See who's trying demos
- `/admin/orders` - Track incoming orders
- Email notifications - Get alerts in real-time

**Key metrics:**

- Demo completions
- Lead-to-call conversion
- Call-to-close rate
- Average deal size

## 🛠️ Common Issues

**Backend won't start:**

- Check `.env` file exists
- Verify `DATABASE_URL` is set
- Run `npx prisma generate` again

**Frontend won't start:**

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**No emails arriving:**

- Check Gmail App Password is correct
- Verify `ADMIN_EMAIL` is your real email
- Check spam folder

**TypeScript errors:**

- Reload VS Code window (Ctrl+Shift+P → "Reload Window")
- Most errors are editor cache issues

## 🎯 Next Steps

1. ✅ Complete backend + frontend setup
2. ✅ Test all demo pages work
3. ✅ Verify email notifications
4. 🔲 Record your first 3 videos
5. 🔲 Post to social media
6. 🔲 DM/email 20-30 prospects
7. 🔲 Close your first deal

---

**Built with ⚔️ by WarriorForge Automations**  
_Now go forge some revenue._
