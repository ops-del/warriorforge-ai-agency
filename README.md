# WarriorForge Automations

**Mission**: We forge AI systems that capture leads, book appointments, automate support, and make businesses battle-ready.

A production-ready monorepo for the WarriorForge Automations platform. This workspace contains a TypeScript Express API backend, a React + Vite frontend storefront, and shared TypeScript types for seamless full-stack development.

## Tech Stack

### Backend

- **Node.js + Express** - REST API server
- **TypeScript** - Type-safe development
- **Prisma ORM** - Database toolkit with SQLite
- **Nodemailer** - Email notifications
- **dotenv** - Environment configuration

### Frontend

- **React 19** - UI framework
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe components
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first styling

### Shared

- **TypeScript interfaces** - Shared types between client and server

## Project Structure

```
warriorforge-automations/
├── server/           # Backend API (Express + Prisma)
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── db/
│   │   ├── types/
│   │   └── integrations/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── package.json
├── client/           # Frontend storefront (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── lib/
│   │   └── types/
│   └── package.json
├── shared/           # Shared TypeScript interfaces
│   └── types.ts
├── package.json      # Root workspace scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup

1. **Navigate to server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env and fill in your values:
   # - ADMIN_EMAIL: Your admin notification email
   # - ADMIN_PASSWORD: Password for admin routes
   # - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS: Email server config
   ```

4. **Initialize database**

   ```bash
   # Run Prisma migrations
   npx prisma migrate dev --name init

   # Seed the database with sample automations
   npx prisma db seed
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

   The API will be running at **http://localhost:4000**

#### Backend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data

### Frontend Setup

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The frontend will be running at **http://localhost:5173**

#### Frontend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Run Both Servers (from root)

```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

## API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `GET /api/automations` - List all automations
- `GET /api/automations/:id` - Get single automation
- `POST /api/orders` - Create new order
- `POST /api/demo-leads` - Submit demo lead
- `POST /api/pay` - Payment endpoint (Stripe placeholder)

### Admin Endpoints (require x-admin-token header)

- `POST /api/admin/login` - Admin login
- `GET /api/admin/automations` - List automations
- `POST /api/admin/automations` - Create automation
- `PUT /api/admin/automations/:id` - Update automation
- `DELETE /api/admin/automations/:id` - Delete automation
- `GET /api/admin/orders` - List all orders
- `GET /api/admin/orders/:id` - Get order details
- `GET /api/admin/demo-leads` - List demo leads
- `GET /api/admin/demo-leads/:id` - Get demo lead details

## Frontend Routes

### Public Routes

- `/` - Landing page with hero and featured automations
- `/automations` - Browse all automations
- `/automations/:id` - Automation detail page
- `/order/:automationId` - Order form
- `/order-success` - Order confirmation
- `/demo/lead-capture` - Live demo: Lead Capture
- `/demo/support-inbox` - Live demo: Support Inbox
- `/demo/appointment-setter` - Live demo: Appointment Setter

### Admin Routes

- `/admin/login` - Admin login
- `/admin` - Admin dashboard overview
- `/admin/automations` - Manage automations
- `/admin/orders` - View orders
- `/admin/orders/:id` - Order detail
- `/admin/demo-leads` - View demo leads
- `/admin/demo-leads/:id` - Demo lead detail

## Environment Variables

### Server (.env)

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173

DATABASE_URL="file:./dev.db"

ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=supersecretpassword

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_SECURE=false
```

### Client (optional .env)

```env
VITE_API_BASE_URL=http://localhost:4000
```

## Features

### Core Features

- ✅ Full-stack TypeScript monorepo
- ✅ REST API with Express + Prisma
- ✅ React 19 frontend with Vite
- ✅ SQLite database (easily swap to PostgreSQL/MySQL)
- ✅ Email notifications via Nodemailer
- ✅ Admin authentication with token-based auth
- ✅ Responsive design with TailwindCSS
- ✅ Live demo chat simulations
- ✅ Demo lead capture system

### Automation Catalog

Pre-seeded with 6 battle-tested automations:

1. AI Lead Capture & Follow-Up System
2. AI Appointment Setter
3. AI Customer Support Inbox
4. AI Review & Reputation Engine
5. AI Content Engine
6. Custom AI Automation (Strategy Call)

### Admin Dashboard

- Manage automation catalog
- View and track orders
- Monitor demo leads from live demos
- Protected routes with admin authentication

### Live Demos

Interactive chat simulations for:

- Lead capture workflows
- Customer support automation
- Appointment scheduling
- Automatic demo lead collection

## Development Notes

### Database

- Using SQLite for development (zero config)
- Prisma schema located at `server/prisma/schema.prisma`
- To reset database: `npx prisma migrate reset`
- To view data: `npx prisma studio`

### Type Safety

- Shared types in `/shared/types.ts`
- Backend uses Prisma-generated types + DTOs
- Frontend imports types from `/src/types/`
- DTO conversion functions in `server/src/types/dto.ts`

### Email Notifications

- New orders trigger email to `ADMIN_EMAIL`
- Demo leads trigger email notifications
- Configure SMTP settings in `.env`

### Future Enhancements

- [ ] Stripe payment integration (placeholder exists in `/api/pay`)
- [ ] Real-time chat with WebSockets
- [ ] File upload for automation assets
- [ ] Advanced analytics dashboard
- [ ] Multi-tenant support

## Production Deployment

### Backend

1. Set `NODE_ENV=production`
2. Use PostgreSQL instead of SQLite
3. Run `npm run build`
4. Start with `npm start`
5. Set up reverse proxy (nginx)
6. Configure SSL certificates

### Frontend

1. Run `npm run build`
2. Serve `dist/` folder via static hosting
3. Set `VITE_API_BASE_URL` to production API URL

### Database Migration

Update `DATABASE_URL` in `.env` to PostgreSQL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/warriorforge"
```

Then run migrations:

```bash
npx prisma migrate deploy
```

## Support

For issues or questions about this codebase, check:

- Backend logs in terminal running `npm run dev:server`
- Frontend console in browser DevTools
- Prisma Studio for database inspection: `npx prisma studio`

---

**Built with ⚔️ by WarriorForge Automations**  
_Forging businesses into revenue machines, one automation at a time._
