# Happy Dance Studio — Deployment Guide for FirstHost

## Project Overview

Happy Dance Studio website — a bilingual (Latvian/English) dance studio platform with:
- Information pages (Women, Couples, Wedding Dance, Teachers)
- Blog section (English only)
- Contact forms with email notifications
- Digital product shop with Stripe payments
- Admin panel for managing time slots and inquiries

## Technology Stack

- **Runtime**: Node.js 20+ (required)
- **Language**: TypeScript (compiled to JavaScript for production)
- **Framework**: Express.js (backend) + React 18 (frontend, compiled to static files)
- **Database**: PostgreSQL 15+
- **Build tool**: Vite (frontend) + esbuild (backend)
- **Package manager**: npm

## System Requirements

- Node.js >= 20.x
- PostgreSQL >= 15.x
- npm >= 9.x
- At least 512MB RAM
- Port 5000 (configurable via PORT env variable)

## Installation Steps

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file or configure these environment variables on the server:

```env
# REQUIRED
DATABASE_URL=postgresql://user:password@localhost:5432/happydance
SESSION_SECRET=<random-string-at-least-32-characters>
PORT=5000
NODE_ENV=production

# OPTIONAL — Google API Integration (for email & sheets)
# See "Google API Setup" section below
GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<your-google-oauth-client-secret>
GOOGLE_REFRESH_TOKEN=<your-google-oauth-refresh-token>

# OPTIONAL — Stripe (for payments)
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
```

### 3. Set up the database

Create a PostgreSQL database and run the schema migration:

```bash
npm run db:push
```

This creates the required tables: `inquiries`, `time_slots`, `bookings`.

### 4. Build the project

```bash
npm run build
```

This compiles:
- Frontend React app → `dist/public/` (static files)
- Backend server → `dist/index.cjs` (Node.js bundle)

### 5. Start the server

```bash
npm run start
```

Or directly:

```bash
NODE_ENV=production node dist/index.cjs
```

The server will listen on port 5000 (or the PORT env variable).

## Process Manager (recommended)

For production, use PM2 or similar:

```bash
npm install -g pm2
pm2 start dist/index.cjs --name happydance
pm2 save
pm2 startup
```

## Important: Replit-Specific Code That Needs Changes

The current codebase uses Replit's connector system for Google Sheets, Gmail, and Stripe. These will NOT work outside Replit. The following files need modification:

### 1. Google Sheets (`server/googleSheets.ts`)

**Current**: Uses `REPLIT_CONNECTORS_HOSTNAME` and `REPL_IDENTITY` for authentication.

**Needs**: Replace with Google OAuth2 Service Account or OAuth2 credentials.

Replace the `getAccessToken()` function with:

```typescript
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

export async function getUncachableGoogleSheetClient() {
  return google.sheets({ version: 'v4', auth: oauth2Client });
}
```

### 2. Gmail (`server/gmailClient.ts`)

**Current**: Uses Replit connector for Gmail API authentication.

**Needs**: Same OAuth2 approach as Google Sheets (same credentials work for both).

Replace the `getAccessToken()` function with:

```typescript
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

export async function getUncachableGmailClient() {
  return google.gmail({ version: 'v1', auth: oauth2Client });
}
```

### 3. Stripe (`server/stripeClient.ts`)

**Current**: Uses Replit connector for Stripe credentials.

**Needs**: Replace with direct Stripe API keys from environment variables.

Replace the entire file with:

```typescript
import Stripe from 'stripe';

export async function getUncachableStripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function getStripePublishableKey() {
  return process.env.STRIPE_PUBLISHABLE_KEY!;
}

export async function getStripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY!;
}
```

Also in `server/index.ts`, the Stripe webhook and sync initialization (lines 18-48, 50-85) uses `stripe-replit-sync` which is Replit-specific. This should be simplified or removed if Stripe sync is not needed.

### 4. Stripe Replit Sync (`stripe-replit-sync`)

This package is Replit-specific and will not work outside Replit. Remove or replace:
- Remove `stripe-replit-sync` from dependencies
- Remove `runMigrations` and `getStripeSync` calls from `server/index.ts`
- Keep the webhook handler if Stripe payments are needed

## Google API Setup (for Gmail and Sheets)

To set up Google OAuth2 credentials:

1. Go to https://console.cloud.google.com/
2. Create a project or select existing
3. Enable: Gmail API, Google Sheets API, Google Drive API
4. Create OAuth 2.0 credentials (Web application)
5. Set authorized redirect URI: `https://developers.google.com/oauthplayground`
6. Use OAuth Playground (https://developers.google.com/oauthplayground) to get a refresh token with scopes:
   - `https://www.googleapis.com/auth/gmail.send`
   - `https://www.googleapis.com/auth/spreadsheets`
   - `https://www.googleapis.com/auth/drive.file`
7. Set the credentials in environment variables

## Database Schema

The database has 3 tables (defined in `shared/schema.ts`):

```sql
-- Contact form submissions
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Available time slots for booking
CREATE TABLE time_slots (
  id SERIAL PRIMARY KEY,
  start_at TIMESTAMP NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  capacity SMALLINT NOT NULL DEFAULT 1,
  booked_count SMALLINT NOT NULL DEFAULT 0,
  price_eur INTEGER NOT NULL DEFAULT 5000,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings for time slots
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  slot_id INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_payment',
  stripe_session_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## File Structure

```
├── client/                 # React frontend source
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Shared components
│   │   ├── context/        # Language context
│   │   ├── data/           # Blog posts data
│   │   └── hooks/          # Custom hooks
│   └── index.html          # HTML entry point
├── server/                 # Express backend source
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   ├── db.ts               # Database connection
│   ├── static.ts           # Static file serving
│   ├── googleSheets.ts     # Google Sheets integration
│   ├── gmailClient.ts      # Gmail integration
│   ├── stripeClient.ts     # Stripe integration
│   └── webhookHandlers.ts  # Stripe webhook handlers
├── shared/                 # Shared types and schemas
│   ├── schema.ts           # Database schema (Drizzle ORM)
│   └── routes.ts           # API route definitions
├── dist/                   # Build output (after npm run build)
│   ├── index.cjs           # Compiled server
│   └── public/             # Compiled frontend
├── package.json
├── tsconfig.json
├── vite.config.ts
└── drizzle.config.ts
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/inquiries | Submit contact form |
| GET | /api/time-slots | List available time slots |
| POST | /api/time-slots | Create time slot (admin) |
| PATCH | /api/time-slots/:id | Update time slot (admin) |
| DELETE | /api/time-slots/:id | Delete time slot (admin) |
| POST | /api/booking/checkout | Create Stripe checkout session |
| GET | /api/stripe/publishable-key | Get Stripe publishable key |
| POST | /api/stripe/webhook | Stripe webhook handler |
| GET | /api/shop/products | List shop products |
| POST | /api/shop/checkout | Shop checkout |

## Reverse Proxy Configuration

If using Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name happydance.lv www.happydance.lv;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL/TLS

Use Let's Encrypt with certbot:

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d happydance.lv -d www.happydance.lv
```

## Summary of Required Changes Before Deployment

1. Replace Replit connector auth in `googleSheets.ts`, `gmailClient.ts`, `stripeClient.ts`
2. Remove `stripe-replit-sync` dependency and related code in `server/index.ts`
3. Set up PostgreSQL database and configure `DATABASE_URL`
4. Set up Google OAuth2 credentials for Gmail and Sheets
5. Set up Stripe API keys if payments are needed
6. Configure reverse proxy (Nginx) and SSL
