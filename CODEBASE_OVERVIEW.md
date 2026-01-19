# ResumeCraft Codebase Overview

## 1. Project Overview
ResumeCraft is a web application designed to help users create, analyze, and optimize their resumes using AI. It leverages **Next.js 15** (App Router) for the frontend and backend API, **Supabase** for authentication and data persistence, and **Google Gemini 2.0** for AI-powered resume analysis.

### Technology Stack
- **Framework**: Next.js 15.2.4 (App Router)
- **UI library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS, framer-motion, tailwindcss-animate
- **Database & Auth**: Supabase
- **AI**: Google Generative AI (Gemini 2.0 Flash)
- **Forms**: react-hook-form + zod
- **Icons**: Lucide React

## 2. Directory Structure

- **`app/`**: Application routes and layouts (App Router).
  - **`api/`**: Backend API routes (`analyze-resume`, `extract-resume`, `generate-pdf`, `scan-resume`).
  - **`(routes)`**: Feature pages like `create-resume`, `dashboard`, `login`, `signup`.
- **`components/`**: Reusable UI components. `ui` subdirectory contains shadcn/ui primitives.
- **`lib/`**: Utility functions (`utils.ts`) and shared libraries.
- **`supabse/`**: Supabase configuration and client initialization (`config.js`). *Note: Directory name has a typo 'supabse' instead of 'supabase'.*
- **`hooks/`**: Custom React hooks.
- **`context/`**: React Context providers (likely for auth or app state).

## 3. Key Features & Modules

### Resume Creation (`/create-resume`)
- A comprehensive form/editor for building resumes.
- Likely handles state for various sections (personal info, experience, education).

### AI Analysis (`/api/analyze-resume`)
- Accepts resume data as JSON.
- Uses **Gemini 2.0 Flash** to analyze content for ATS (Applicant Tracking System) compatibility.
- Returns:
  - Overall Score (0-100)
  - Category breakdown (Content, Keywords, Formatting, etc.)
  - Specific improvement suggestions
  - Keyword extraction

### Backend Integration
- **Supabase**: Handles user authentication (`auth` folder in app might handle callbacks/pages) and profile management (`profiles` table).
- **API Routes**:
  - `POST /api/analyze-resume`: AI analysis.
  - `POST /api/extract-resume`: Parse existing resume files.
  - `POST /api/generate-pdf`: Convert resume data to PDF (possibly using Puppeteer).

## 4. Environment Configuration
The application requires the following environment variables (based on code inspection):
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous public key.
- `GOOGLE_API_KEY`: API key for Google Gemini.

## 5. Development Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: ESLint check.
