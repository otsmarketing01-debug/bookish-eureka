---
name: gsc-metrics
description: Pull Google Search Console metrics (clicks, impressions, CTR, position, queries, pages, devices) for jhbcurtaincleaning.co.za via the Search Console API. Use when the user asks for site metrics, SEO performance, rankings, search data, or analytics.
---

# Google Search Console Metrics

Query real search performance data for both GSC properties of JHB Curtain Cleaning using the Search Console API (gsc-mcp MCP server, or direct REST with the OAuth refresh token).

## Properties

- `sc-domain:jhbcurtaincleaning.co.za` (domain property)
- `https://www.jhbcurtaincleaning.co.za/` (URL-prefix property)

## Credentials

- OAuth client: `C:\dev\credentials\gsc-oauth-client.json` (gitignored, outside repo)
- Refresh token: `C:\dev\credentials\gsc-refresh-token.txt` (scope: `webmasters.readonly`)
- Via gsc-mcp: `gsc-mcp` MCP server in `.mcp.json` (gitignored — has secrets)

## Method A — via gsc-mcp MCP server (preferred)

Use the `gsc-mcp` MCP server tools directly:
- `sites_list` — verify properties
- `search_analytics_query` — the main metrics query
- `url_inspection_inspect` — index status of a URL

## Method B — direct REST API (fallback, no MCP)

```bash
CLIENT_ID=$(node -e "console.log(require('C:/dev/credentials/gsc-oauth-client.json').installed.client_id)")
CLIENT_SECRET=$(node -e "console.log(require('C:/dev/credentials/gsc-oauth-client.json').installed.client_secret)")
REFRESH=$(cat /c/dev/credentials/gsc-refresh-token.txt | tr -d '\r\n ')
ACCESS=$(curl -s -X POST "https://oauth2.googleapis.com/token" \
  -d "client_id=$CLIENT_ID" -d "client_secret=$CLIENT_SECRET" \
  -d "refresh_token=$REFRESH" -d "grant_type=refresh_token" | node -pe "JSON.parse(require('fs').readFileSync(0)).access_token")
curl -s -X POST -H "Authorization: Bearer $ACCESS" -H "Content-Type: application/json" \
  "https://searchconsole.googleapis.com/webmasters/v3/sites/sc-domain%3Ajhbcurtaincleaning.co.za/searchAnalytics/query" \
  -d '{"startDate":"<START>","endDate":"<END>","dimensions":["query"],"rowLimit":10}'
```

## Standard Report Format

For a metrics report, query these dimensions (one per call) over the requested date range:

1. **Queries** — `["query"]` (top keywords)
2. **Pages** — `["page"]` (top URLs)
3. **Devices** — `["device"]` (mobile/desktop/tablet split)
4. **Countries** — `["country"]` (top regions)
5. **Dates** — `["date"]` (daily trend)

Present: clicks, impressions, CTR (%), and average position per row. Flag queries with impressions but 0 clicks (opportunities), and big drops vs the prior period.

## Gotchas

- Date range max 16 months back; use YYYY-MM-DD format.
- The refresh token rarely expires but if calls fail with auth errors, re-run the OAuth flow (see remember.md).
- gsc-mcp `.mcp.json` is gitignored — don't commit it.
