# JHB Curtain Cleaning — Site Audit Implementation Plan

> Based on the comprehensive technical audit (78/100, Grade B+).
> This plan groups all audit findings into sequenced workstreams with clear task breakdowns and execution order.

---

## Executive Summary

The audit identified a solid platform foundation (B+) hindered by:
1. **Technical crawl gaps** — 404s, missing pages, sitemap omissions, canonical mismatches
2. **Incomplete local SEO** — no suburb silos, no GBP integration, thin citations
3. **No AEO/GEO optimization** — no answer blocks for AI search engines
4. **Missing CRO features** — no interactive quote calculator, no WhatsApp booking, no payment integration

This plan addresses all findings across 4 sequenced phases.

---

## Phase 1: Technical Repairs & Routing Fixes (Critical — Weeks 1-2)

**Goal:** Zero 404 errors, 100% crawl coverage, correct canonical configuration.

### Task Group 1A: Missing Pages
| # | Task | Priority | Files |
|---|------|----------|-------|
| 1 | Create `/about` page (company history, 15+ years, team, certifications, insurance) | 🔴 High | `src/app/(marketing)/about/page.tsx` |
| 2 | Create `/terms-of-service` page (service terms, cancellation policy, guarantee terms) | 🔴 High | `src/app/(marketing)/terms-of-service/page.tsx` |
| 3 | Create dedicated `/privacy-policy` page (POPIA-compliant, replaces soft-redirect to homepage) | 🔴 High | `src/app/(marketing)/privacy-policy/page.tsx` |
| 4 | Add all 3 pages to sitemap-pages.xml + header/footer nav | 🔴 High | `src/app/sitemap-pages.xml/route.ts`, `src/components/site/header.tsx`, `src/components/site/footer.tsx` |

### Task Group 1B: Routing Fixes
| # | Task | Priority | Files |
|---|------|----------|-------|
| 5 | Verify `/book` routes to the booking calendar page (not /contact) | 🔴 High | `src/app/(marketing)/book/page.tsx` |
| 6 | Create `/commercial-curtain-cleaning-clean-without-closing` page (or redirect to `/sectors/corporate`) | 🟡 Medium | New page or redirect config |

### Task Group 1C: Sitemap & Canonical
| # | Task | Priority | Files |
|---|------|----------|-------|
| 7 | Verify blog articles are included in sitemap-blog.xml (already done — verify count) | ✅ Done | `src/app/sitemap-blog.xml/route.ts` |
| 8 | Add `X-Robots-Tag: noindex, nofollow` to staging environment headers | 🟡 Medium | `next.config.ts` or middleware |
| 9 | Ensure canonical tags point to production domain on deployed site | 🟡 Medium | `src/app/layout.tsx` metadataBase |

### Task Group 1D: Heading Hierarchy
| # | Task | Priority | Files |
|---|------|----------|-------|
| 10 | Audit all service/area/sector pages for duplicate H1 tags — ensure one unique H1 per page | 🟡 Medium | Service/area/sector page templates |

---

## Phase 2: Local SEO & Suburb Silo Architecture (High — Weeks 3-4)

**Goal:** Top 3 Map Pack rankings across target suburbs via dedicated geo-landing pages.

### Task Group 2A: Suburb Landing Pages
| # | Task | Priority | Files |
|---|------|----------|-------|
| 11 | Expand area pages into suburb-level silos (Sandton, Morningside, Bryanston, Fourways, Bedfordview, Edenvale, Kempton Park, Roodepoort, Rosebank, Parktown) | 🔴 High | `src/app/(marketing)/areas/[slug]/page.tsx` + new suburb data in config |
| 12 | Add suburb-specific content modules: Highveld dust/pollen, luxury estate drapes, commercial venues | 🔴 High | Config + page templates |
| 13 | Add "Answer Block" (60-80 words) under each suburb page H2 for AEO extraction | 🔴 High | Area page templates |

### Task Group 2B: Google Business Profile Integration
| # | Task | Priority | Files |
|---|------|----------|-------|
| 14 | Add GBP category alignment (Dry Cleaner, Carpet Cleaning, Upholstery Cleaning, Commercial Cleaning) to LocalBusiness schema | 🟡 Medium | `src/lib/seo.ts` |
| 15 | Add Snupit/Brabys/Yellow Pages SA citation links to `sameAs` in schema | 🟡 Medium | `src/lib/config.ts`, `src/lib/seo.ts` |
| 16 | Add WhatsApp click-to-chat link (wa.me/27750119200) to header, footer, and CTAs | 🔴 High | Header, footer, contact page |

### Task Group 2C: NAP Consistency
| # | Task | Priority | Files |
|---|------|----------|-------|
| 17 | Verify NAP (Name, Address, Phone) consistency across all schema, footer, contact page | 🟡 Medium | Audit across `seo.ts`, `config.ts`, `footer.tsx` |

---

## Phase 3: AEO/GEO Search Optimization (High — Weeks 5-6)

**Goal:** Content cited in AI-generated answers (ChatGPT, Perplexity, Gemini, SGE).

### Task Group 3A: Answer Blocks
| # | Task | Priority | Files |
|---|------|----------|-------|
| 18 | Add 60-80 word "Answer Blocks" under H2 headings on all service pages (how it works, why solvent > steam) | 🔴 High | Service page templates |
| 19 | Add Answer Blocks to FAQ page responses (expand AI-extractable content) | 🔴 High | `src/app/(marketing)/faq/page.tsx` |
| 20 | Add Answer Blocks to blog posts (preface each article with a concise answer summary) | 🟡 Medium | Blog post template |

### Task Group 3B: Enhanced JSON-LD Schema Graph
| # | Task | Priority | Files |
|---|------|----------|-------|
| 21 | Implement unified `@graph` schema (DryCleaningOrLaundry + LocalBusiness + Service + FAQPage) per audit deliverable | 🔴 High | `src/lib/seo.ts` |
| 22 | Add `founder` person schema (Stephen Dunlop, Managing Director) | 🟡 Medium | `src/lib/config.ts`, `src/lib/seo.ts` |
| 23 | Add `areaServed` as AdministrativeArea nodes (Sandton, Fourways, Bryanston, etc.) | 🟡 Medium | `src/lib/seo.ts` |
| 24 | Add `hasOfferCatalog` with tiered pricing (Small/Medium/Large/Commercial) + PriceSpecification | 🔴 High | `src/lib/seo.ts` |

---

## Phase 4: CRO & Platform Integrations (High — Weeks 7-8)

**Goal:** 35%+ increase in organic lead conversions via interactive tools and multi-channel booking.

### Task Group 4A: Interactive Quote Calculator
| # | Task | Priority | Files |
|---|------|----------|-------|
| 25 | Build `QuoteCalculator` component (room tier, curtain height, fabric type, add-ons) | 🔴 High | `src/components/site/quote-calculator.tsx` |
| 26 | Implement pricing formula: base × height multiplier × fabric multiplier + add-on flat rates | 🔴 High | Calculator component |
| 27 | Add real-time price range display + "Lock In Estimate via WhatsApp" CTA with pre-populated message | 🔴 High | Calculator component |
| 28 | Embed calculator on homepage, pricing page, and service pages | 🔴 High | Page templates |

### Task Group 4B: WhatsApp Integration
| # | Task | Priority | Files |
|---|------|----------|-------|
| 29 | Add WhatsApp floating button alongside chat widget (wa.me/27750119200) | 🔴 High | `src/app/(marketing)/layout.tsx` |
| 30 | Add WhatsApp booking CTAs on service pages, booking page, and pricing page | 🔴 High | Page templates |
| 31 | Pre-populate WhatsApp messages with page context (service, area, quote estimate) | 🟡 Medium | CTA components |

### Task Group 4C: Payment & Booking Integration
| # | Task | Priority | Files |
|---|------|----------|-------|
| 32 | Integrate PayFast payment gateway for booking deposits | 🟡 Medium | New API route + booking flow |
| 33 | Add deposit capture step to booking flow (optional, with trust badges) | 🟡 Medium | Booking form component |
| 34 | Add trust badges ("100% No-Shrinkage Guarantee", "15+ Years", "Hardware Checks Included") to booking page | 🟡 Medium | Booking page |

### Task Group 4D: Automated Review Collection
| # | Task | Priority | Files |
|---|------|----------|-------|
| 35 | Send WhatsApp review request 2 hours after booking completion (in addition to email review request) | 🟡 Medium | Booking PATCH API + email lib |
| 36 | Add GBP review link to post-service follow-up | 🟡 Medium | Email template |

---

## Execution Workflow & Sequencing

```
Phase 1 (Weeks 1-2): Technical Repairs
  ├── 1A: Create /about, /terms-of-service, /privacy-policy pages
  ├── 1B: Fix /book routing, add commercial page
  ├── 1C: Verify sitemap, add staging noindex, fix canonicals
  └── 1D: Fix heading hierarchy
      ↓ (must complete before Phase 2 — pages must exist for internal linking)

Phase 2 (Weeks 3-4): Local SEO & Suburb Silos
  ├── 2A: Expand suburb landing pages with Highveld content + Answer Blocks
  ├── 2B: GBP category alignment, citation links, WhatsApp link
  └── 2C: NAP consistency audit
      ↓ (must complete before Phase 3 — schema needs suburb data)

Phase 3 (Weeks 5-6): AEO/GEO Optimization
  ├── 3A: Add Answer Blocks to service/FAQ/blog pages
  └── 3B: Implement unified @graph schema with founder, areas, offer catalog
      ↓ (must complete before Phase 4 — calculator needs pricing tiers from schema)

Phase 4 (Weeks 7-8): CRO & Integrations
  ├── 4A: Build quote calculator + embed on pages
  ├── 4B: WhatsApp floating button + CTAs
  ├── 4C: PayFast payment integration + trust badges
  └── 4D: Automated WhatsApp review requests
```

### Parallelization Notes
- **Phase 1A** (pages) and **Phase 1C** (sitemap) can run in parallel
- **Phase 2A** (suburb pages) and **Phase 2B** (GBP/schema) can run in parallel
- **Phase 3A** (answer blocks) and **Phase 3B** (schema graph) can run in parallel
- **Phase 4A** (calculator) and **Phase 4B** (WhatsApp) can run in parallel
- **Phase 4C** (payments) depends on 4A (calculator provides pricing context)

### Verification Checkpoints
- After Phase 1: `curl` all routes → 0 404s; sitemap validates; Google Search Console shows 0 errors
- After Phase 2: All suburb pages indexed; GBP NAP matches site schema
- After Phase 3: Schema validates via Rich Results Test; Answer Blocks extractable by AI
- After Phase 4: Calculator produces accurate estimates; WhatsApp links work; PayFast test transaction passes

---

## Priority Legend
- 🔴 **High** — build-breaking, SEO-critical, or high-conversion-impact
- 🟡 **Medium** — enhances SEO/CRO but not blocking
- ✅ **Done** — already implemented in prior rounds

## Files to Create (New)
1. `src/app/(marketing)/about/page.tsx`
2. `src/app/(marketing)/terms-of-service/page.tsx`
3. `src/app/(marketing)/privacy-policy/page.tsx`
4. `src/app/(marketing)/commercial-curtain-cleaning-clean-without-closing/page.tsx` (or redirect)
5. `src/components/site/quote-calculator.tsx`
6. `src/components/site/whatsapp-button.tsx`
7. `src/app/api/payfast/route.ts` (payment webhook)

## Files to Modify (Existing)
1. `src/lib/seo.ts` — unified @graph schema, founder, areaServed, hasOfferCatalog
2. `src/lib/config.ts` — suburb data, WhatsApp number, founder info
3. `src/app/(marketing)/layout.tsx` — WhatsApp floating button
4. `src/app/(marketing)/services/[slug]/page.tsx` — Answer Blocks, calculator embed
5. `src/app/(marketing)/areas/[slug]/page.tsx` — suburb silo expansion, Answer Blocks
6. `src/app/(marketing)/faq/page.tsx` — Answer Blocks
7. `src/app/(marketing)/blog/[slug]/page.tsx` — Answer Block preface
8. `src/components/site/header.tsx` — nav links, WhatsApp
9. `src/components/site/footer.tsx` — legal links, WhatsApp
10. `src/app/sitemap-pages.xml/route.ts` — add /about, /terms, /privacy
11. `next.config.ts` — staging noindex headers
