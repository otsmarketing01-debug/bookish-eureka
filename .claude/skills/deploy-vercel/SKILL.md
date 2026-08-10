---
name: deploy-vercel
description: Deploy the JHB Curtain Cleaning site to Vercel production, then verify the live site. Use when deploying or when the user asks to deploy, ship, or push to production.
disable-model-invocation: true
---

# Deploy to Vercel Production

Deploy `bookish-eureka` to the correct Vercel project and verify the result. This avoids the common mistakes: wrong account, wrong project, or missing env vars.

## Prerequisites

- Repo: `C:\dev\bookish-eureka` (branch `main`)
- Vercel CLI authenticated as `accsu1983-2909`
- Linked project: `my-project` (team `bookish-eureka`) — confirms via `.vercel/project.json`

## Steps

1. **Confirm the target project** (critical — prevents deploying to the wrong place):
   ```bash
   cat .vercel/project.json
   # must show projectName: "my-project"
   export VERCEL_TOKEN="<token>"  # or ensure `vercel whoami` = accsu1983-2909
   ```

2. **Run lint + build checks first** (catch errors before deploy):
   ```bash
   bun run lint
   bun run build
   ```

3. **Deploy to production**:
   ```bash
   export VERCEL_TOKEN="<token>"
   vercel deploy --prod --yes
   ```
   Confirm the output shows `"target": "production"` and `"readyState": "READY"`.

4. **Verify the live site** (must all pass):
   ```bash
   curl -sI https://www.jhbcurtaincleaning.co.za/          # 200, NO X-Robots-Tag
   curl -s https://www.jhbcurtaincleaning.co.za/ | grep -o 'G-E4ZJQ57W4Y'   # GA4 present
   curl -s https://www.jhbcurtaincleaning.co.za/ | grep -o 'GTM-5QWRX5F7'   # GTM present
   curl -s https://www.jhbcurtaincleaning.co.za/ | grep -o '<link rel="canonical"[^>]*>'
   # canonical must be https://www.jhbcurtaincleaning.co.za/  (NOT apex)
   curl -s -o /dev/null -w "%{http_code}" https://www.jhbcurtaincleaning.co.za/login  # 200
   ```

5. **If env vars changed**: they take effect only on a NEW deployment. Verify the env change is what you expect before deploying.

## Gotchas

- Never deploy with the wrong VERCEL_TOKEN/account — check `vercel whoami` first.
- `vercel env add` FAILS silently on existing vars (must `vercel env rm` first, then `env add`).
- Do NOT embed real secrets in `.mcp.json` or commit them. `.env` has placeholders only.
- GitHub→Vercel auto-deploys from `main` — a direct `vercel deploy --prod` is for when you need manual control.
