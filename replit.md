# Replit.md

## Overview

This is a dance studio website and e-commerce platform built with React, Express, and PostgreSQL. The application provides information about dance classes for teachers, women, and couples. Features include a blog section with mindful dance teaching articles (English only), digital teaching resources for sale via Payhip integration, and a contact form for inquiries. The site supports Latvian (default) and English languages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state, React Context for cart state and language
- **Multi-language Support**: Latvian (default) and English with toggle button in header
- **Styling**: Tailwind CSS with custom color palette (sage, terracotta, beige) and CSS variables for theming
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and fade-in effects
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints with type-safe route definitions in shared/routes.ts
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Validation**: Zod schemas shared between frontend and backend via drizzle-zod

### Data Storage
- **Database**: PostgreSQL accessed via DATABASE_URL environment variable
- **Schema Location**: shared/schema.ts contains all table definitions
- **Current Tables**: 
  - `inquiries` - stores contact form submissions (id, name, email, subject, message, createdAt)

### API Structure
- Routes defined in shared/routes.ts with input/output schemas
- POST `/api/inquiries` - Create new inquiry/contact submission
- Storage layer abstraction in server/storage.ts for database operations

### Build Process
- Development: `npm run dev` runs tsx with hot reloading
- Production: Custom build script bundles server with esbuild and client with Vite
- Database migrations: `npm run db:push` uses drizzle-kit

## External Dependencies

### Third-Party Services
- **Payhip**: External payment processing for digital product purchases (products link out to Payhip URLs)
- **Google Fonts**: DM Sans (body text) and Playfair Display (headings)
- **Unsplash**: Hero images served from Unsplash CDN

### Key NPM Packages
- **UI**: @radix-ui/* primitives, lucide-react icons, embla-carousel-react
- **Database**: drizzle-orm, pg (PostgreSQL client), connect-pg-simple
- **Validation**: zod, @hookform/resolvers, drizzle-zod
- **HTTP**: express, @tanstack/react-query

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string (required for database operations)

## Content Structure

### Blog Section
- Location: `/blog` for listing, `/blog/{id}` for individual posts
- Data: `client/src/data/blogPosts.ts` contains all blog posts
- Language: English only (not translated to Latvian)
- Current posts: tango-embrace, body-listens, four-elements, holding-rhythm
- Features: Alternating image/text layout, prev/next navigation, grayscale-to-color hover effect

### Navigation Order
Footer navigation follows order: Sievietēm (Women), Pāriem (Couples), Kāzu deja (Wedding), Skolotājiem (Teachers), Blog

### Design Notes
- Homepage cards use matching hero images, no subtitles
- About Me section uses grayscale outdoor dance image with inspirational quote
- Shop section hidden from navigation (code preserved for future use)
- When updating text in one language, do not automatically translate to the other