# Sentry Configuration

## Environment Variables

Add the following to your `.env.local` file:

```bash
# Sentry DSN (Data Source Name) - get this from your Sentry project settings
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here

# Optional: Sentry organization and project for source map uploads
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
SENTRY_AUTH_TOKEN=your-auth-token
```

## Setup

1. Create a Sentry account at https://sentry.io
2. Create a new Next.js project in Sentry
3. Copy the DSN from your project settings
4. Add it to your `.env.local` file
5. For production, add these environment variables to your Vercel project

## Features

- ✅ Client-side error tracking
- ✅ Server-side error tracking
- ✅ Session replay (10% of sessions, 100% of error sessions)
- ✅ Performance monitoring
- ✅ Source map upload for better stack traces
- ✅ Automatic Vercel Cron monitoring
- ✅ Error boundaries for graceful error handling

## Error Boundaries

The app includes:
- `/app/error.tsx` - Page-level error boundary
- `/app/global-error.tsx` - Root-level error boundary

## Manual Error Tracking

```typescript
import * as Sentry from "@sentry/nextjs";

// Capture an exception
Sentry.captureException(error);

// Capture a message
Sentry.captureMessage("Something went wrong");

// Add context
Sentry.captureException(error, {
  tags: { action: "login" },
  extra: { userId: "123" }
});
```
