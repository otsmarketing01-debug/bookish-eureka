# CLAUDE.md — JHB Curtain Cleaning

Next.js 16 marketing site for JHB Curtain Cleaning (curtain/blind cleaning, Johannesburg).
Deployed to Vercel (production: https://www.jhbcurtaincleaning.co.za). Supabase PostgreSQL via Prisma.

## Commands

```bash
bun install            # install deps (bun is the package manager; uses bun.lock)
bun run dev            # dev server on port 3000
bun run build          # production build (Next.js standalone)
bun run start          # run standalone server
bun run lint           # eslint
bunx prisma db push    # push schema to DB (migrate)
bunx prisma generate   # regenerate Prisma client
bunx prisma migrate dev  # dev migration
bunx prisma migrate reset # reset DB (DESTRUCTIVE)
```

Deploy to production: `vercel --prod` (project `my-project`, team `bookish-eureka`, account `accsu1983-2909`).
Vercel CLI must be authenticated with `VERCEL_TOKEN` (or `vercel whoami` → `accsu1983-2909`).

## Architecture

- **App Router**: `src/app/` — marketing pages under `(marketing)/`, admin under `admin/`, auth at `login/`/`signup/`
- **API routes**: 30 routes in `src/app/api/` (bookings, faq-ask, revalidate, auth, etc.)
- **Database**: 11 Prisma models in `prisma/schema.prisma` (User, Booking, BlogPost, Review, ContactSubmission, NewsletterSubscriber, ChatRoom, ChatMessage, GalleryShowcase, AdminNotification, EmailLog)
- **Auth**: NextAuth 4 (`src/lib/auth.ts`) with CredentialsProvider, JWT sessions
- **Chat**: Socket.io mini-service (port 3001) — ChatWidget removed from public marketing layout (was causing 308 errors on Vercel); code still exists but not rendered
- **AI FAQ**: `POST /api/faq-ask` using z-ai-web-dev-sdk
- **Design tokens**: `design/systems/tokens.json` (OKLCH, 8pt grid) — NEVER hardcode colors/spacing; use tokens

## Environment Variables

8 production vars on Vercel (project `my-project`). Local `.env` has PLACEHOLDERS only — real values live in Vercel.

| Var | Purpose |
|-----|---------|
| `DATABASE_URL` | Supabase PostgreSQL connection string (pooler) |
| `AUTH_SECRET` | NextAuth + review-token signing secret (strong random) |
| `NEXTAUTH_URL` | `https://www.jhbcurtaincleaning.co.za` |
| `NEXT_PUBLIC_SITE_NAME` | `JHB Curtain Cleaning` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.jhbcurtaincleaning.co.za` |
| `NEXT_PUBLIC_CHAT_PORT` | `3001` |
| `NEXT_PUBLIC_GA4_ID` | `G-E4ZJQ57W4Y` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-5QWRX5F7` |

## Gotchas (READ THESE)

1. **`.mcp.json` contains secrets** (GSC OAuth client secret + refresh token) and is gitignored. NEVER edit/commit it, and never remove it from `.gitignore`.
2. **`.env` has placeholders only** — the real DB/secret values live in Vercel env. `vercel env pull` returns masked/empty values; don't rely on it for real values.
3. **Staging/noindex detection**: never gate on `NODE_ENV === "production"` — it's always true on Vercel. The old bug caused a site-wide `X-Robots-Tag: noindex, nofollow`. Staging is detected by `SPACE_Z_DEPLOYMENT` set AND `VERCEL` NOT set.
4. **Canonical URLs must stay on `https://www.jhbcurtaincleaning.co.za`** (apex → www 308 redirect). Do NOT revert `siteConfig.url` in `src/lib/config.ts` to the apex.
5. **Review tokens** (`src/lib/review-token.ts`) REQUIRE `AUTH_SECRET` env — it throws at import if missing. Do not add a hardcoded fallback secret.
6. **Socket.io chat**: `NEXT_PUBLIC_CHAT_PORT` + Socket.io code exists but the widget is intentionally removed from public pages. Don't re-add it to marketing pages without fixing the 308 issue.
7. **GA4/GTM**: `Analytics` component activates only when `NEXT_PUBLIC_GA4_ID`/`NEXT_PUBLIC_GTM_ID` are set. Don't add a GA4 tag in GTM (would double-count pageviews — GTM stays dormant).

## Workflow

- Feature changes: `git checkout -b feature/xxx` → implement → `bun run lint` → push → Vercel auto-deploys from `main` (GitHub→Vercel connected).
- Verify production after deploy: `curl -sI https://www.jhbcurtaincleaning.co.za/` (no `X-Robots-Tag`), canonical on www, GA4/GTM present in HTML.
- Google Search Console metrics: use the `gsc-metrics` skill (gsc-mcp MCP server).
- Commits: Conventional Commits (`feat:`/`fix:`/`chore:`), <75 chars, imperative.

## Accounts (quick ref)

- GitHub: `otsmarketing01-debug/bookish-eureka` (main)
- Vercel: `accsu1983-2909` / project `my-project`
- Supabase: `xcuoqffqkbbqenoqtmzk`
- GCP: `project-b6fb3667-24fd-49ba-af4` (gcloud auth `accsu1983@gmail.com`)
- GA4 `G-E4ZJQ57W4Y` · GTM `GTM-5QWRX5F7`
