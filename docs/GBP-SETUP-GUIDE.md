# Google Business Profile (GBP) Setup & Verification Guide

## Overview
This guide walks you through claiming, verifying, and optimizing your Google Business Profile for JHB Curtain Cleaning.

---

## Step 1: Claim Your Listing

1. Go to **[google.com/business](https://www.google.com/business)**
2. Sign in with `accsu1983@gmail.com` (Steve's Google account — confirmed 2026-08-10. Do NOT use info@jhbcurtaincleaning.co.za)
3. Search for "JHB Curtain Cleaning" at `10 2nd Ave, Florida, Roodepoort`
4. If a listing exists, click **"Claim this business"**
5. If no listing exists, click **"Add your business"**

---

## Step 2: Verify Ownership

Google requires verification before your listing goes live. Available methods:

| Method | Time | Requirements |
|--------|------|--------------|
| Postcard (mail) | 5–14 days | Business address receives a postcard with verification code |
| Phone (SMS) | Instant | Business phone number receives a code (if eligible) |
| Email | Instant | Business email receives a code (if eligible) |
| Video | 1–3 days | Upload a video showing your business location and equipment |

**Recommended:** Postcard verification (most reliable for service businesses).

---

## Step 3: Complete Your Profile

### Business Information (must match website exactly)

| Field | Value |
|-------|-------|
| **Business name** | JHB Curtain Cleaning |
| **Category (primary)** | Dry Cleaner |
| **Categories (additional)** | Carpet Cleaning Service, Upholstery Cleaning Service, Commercial Cleaning Service |
| **Phone** | +27 75 011 9200 |
| **Website** | https://jhbcurtaincleaning.co.za |
| **Address** | 10 2nd Ave, Florida, Roodepoort, 1710, Gauteng |
| **Service area** | Johannesburg, Sandton, Fourways, Roodepoort, Edenvale, Alberton, Rosebank, Pretoria, Midrand |
| **Hours** | Mon–Fri 07:00–18:00, Sat 08:00–14:00, Sun Closed |
| **Price range** | R800–R5,500 |
| **From the business** | "Professional on-site curtain cleaning Johannesburg. No removal, no shrinkage guarantee. Free assessment. Serving Sandton, Randburg, Fourways & all JHB suburbs." |

### Photos to Upload
- [ ] Logo (use `/public/logo.svg`)
- [ ] Cover photo (use `/public/hero-curtains.jpg`)
- [ ] Team photo (technician with equipment)
- [ ] Before/after photos (from `/public/gallery/`)
- [ ] Service vehicle photo
- [ ] Interior/office photo (10 2nd Ave, Florida)

### Posts (publish weekly)
- [ ] Service highlights (link to /services/[slug])
- [ ] Before/after showcases (link to /gallery)
- [ ] Special offers (10% off first clean)
- [ ] Blog article links (link to /blog/[slug])

---

## Step 4: Enable Messaging

1. Go to **Settings → Messaging**
2. Enable WhatsApp messaging (connect to +27 75 011 9200)
3. Set up auto-reply: "Thanks for contacting JHB Curtain Cleaning! We typically respond within 1 business hour. For urgent bookings, call +27 75 011 9200."

---

## Step 5: Collect Reviews

### Automated Review Collection
Our website already sends review requests via email and WhatsApp when a booking is marked "completed". To also collect GBP reviews:

1. Add your GBP review link to the review request email
2. GBP review link format: `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`
3. Find your Place ID at: `https://developers.google.com/maps/documentation/places/web-service/place-id`

### Manual Review Collection
- Ask satisfied customers in person
- Send a WhatsApp message with the GBP review link after service
- Add a "Review us on Google" CTA to the booking confirmation page

---

## Step 6: Monitor & Respond

- Check GBP dashboard weekly for new reviews
- Respond to all reviews within 24 hours
- For positive reviews: "Thank you! We're glad you were happy with the service."
- For negative reviews: "We're sorry to hear about your experience. Please call us at +27 75 011 9200 so we can make it right."

---

## NAP Consistency Checklist

Ensure your NAP (Name, Address, Phone) is identical across ALL platforms:

| Platform | Name | Address | Phone | Status |
|----------|------|---------|-------|--------|
| Website schema | JHB Curtain Cleaning | 10 2nd Ave, Florida, Roodepoort, 1710 | +27 75 011 9200 | ✅ Done |
| Website footer | JHB Curtain Cleaning | 10 2nd Ave, Florida, Roodepoort, 1710 | +27 75 011 9200 | ✅ Done |
| Google Business Profile | JHB Curtain Cleaning | 10 2nd Ave, Florida, Roodepoort, 1710 | +27 75 011 9200 | ⬜ Manual |
| Snupit | JHB Curtain Cleaning | 10 2nd Ave, Florida, Roodepoort, 1710 | +27 75 011 9200 | ⬜ Manual |
| Brabys | JHB Curtain Cleaning | 10 2nd Ave, Florida, Roodepoort, 1710 | +27 75 011 9200 | ⬜ Manual |
| Yellow Pages SA | JHB Curtain Cleaning | 10 2nd Ave, Florida, Roodepoort, 1710 | +27 75 011 9200 | ⬜ Manual |

---

## Environment Variables for WhatsApp Business API

To enable automated WhatsApp message dispatch (review requests, booking confirmations), set these in `.env`:

```
WHATSAPP_TOKEN=your_meta_graph_api_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
```

Get these from: **[developers.facebook.com](https://developers.facebook.com)** → Meta for Developers → WhatsApp Business API

Without these, the system generates wa.me links that appear in the admin notifications for manual sending.
