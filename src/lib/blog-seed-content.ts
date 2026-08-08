// Blog seed content derived from the SEO report's 12-week content roadmap.
// Each post targets a specific keyword cluster and intent.

type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string;
  author: string;
  readingTime: number;
  published: boolean;
  featured: boolean;
  publishedAt: Date;
};

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 86400000);

export const blogSeed: SeedPost[] = [
  {
    slug: "curtain-cleaning-costs-johannesburg",
    title: "Curtain Cleaning Costs in Johannesburg: A 2026 Pricing Guide",
    excerpt:
      "Wondering what professional curtain cleaning costs in Johannesburg? We break down real per-curtain pricing by fabric type, size, and service — with no hidden fees.",
    category: "Pricing",
    tags: "curtain cleaning cost,Johannesburg pricing,curtain cleaning near me",
    author: "JHB Curtain Cleaning",
    readingTime: 6,
    published: true,
    featured: true,
    publishedAt: daysAgo(2),
    coverImage: "/blog/costs.jpg",
    content: `If you're searching for "curtain cleaning near me" in Johannesburg, price is usually the first question. This guide gives you transparent, real-world pricing so you can budget with confidence — no vague "starting from" figures that balloon on invoice day.

## Why On-Site Cleaning Saves You Money

Traditional curtain cleaning means taking curtains down, transporting them to a facility, waiting days, then rehanging — often with shrinkage. **On-site dry cleaning** eliminates removal, transport, and rehanging costs entirely. You pay for the cleaning, not the logistics.

## Average Costs by Curtain Type (Johannesburg, 2026)

| Curtain Type | Price Range | Notes |
|---|---|---|
| Voile / Sheer panels | R450 – R800 | Lightweight, fast turnaround |
| Unlined drapes | R600 – R1,200 | Most common in JHB homes |
| Lined drapes | R900 – R1,800 | Includes blackout lining |
| Heavy / volume curtains | R2,500 – R6,000 | Large bay windows, double tracks |
| Roman / roller blinds | R350 – R700 per blind | On-site extraction |

Prices depend on fabric, size, and soiling level. A free on-site assessment gives you an exact quote before any work begins.

## What Affects the Price?

1. **Fabric type** — delicate silks and velvets take longer and need specialist care.
2. **Size & volume** — floor-to-ceiling drapes cost more than standard length.
3. **Soiling level** — heavy dust, pet odours, or staining require pre-treatment.
4. **Lining** — blackout and thermal linings add cleaning time.
5. **Location** — Sandton, Fourways, and central JHB are within our standard call-out zone.

## Hidden Costs to Watch For

Some cleaners quote low then charge extra for stain treatment, deodorising, or weekend call-outs. At JHB Curtain Cleaning, our quotes are all-inclusive. The price you're quoted is the price you pay.

## Is It Worth It?

Cleaned curtains last longer, look brighter, and dramatically reduce allergens in your home. Considering quality curtains cost thousands of rand to replace, professional cleaning every 12–18 months protects that investment.

## Get a Free Quote

Call **+27 75 011 9200** or use our contact form for a no-obligation assessment. We serve all Johannesburg suburbs — Sandton, Randburg, Fourways, Roodepoort, and beyond.`,
  },
  {
    slug: "how-on-site-curtain-cleaning-works",
    title: "How On-Site Curtain Cleaning Works (Without Taking Them Down)",
    excerpt:
      "No removal, no shrinkage, no disruption. Here's exactly how our on-site dry-cleaning process leaves your curtains spotless while they hang.",
    category: "Process",
    tags: "on-site curtain cleaning,how to clean curtains without taking them down,no shrinkage",
    author: "JHB Curtain Cleaning",
    readingTime: 5,
    published: true,
    featured: true,
    publishedAt: daysAgo(9),
    coverImage: "/blog/on-site-process.jpg",
    content: `"Can you really clean curtains without taking them down?" It's the question we hear most. The answer is yes — and it's not a shortcut. Our on-site dry-cleaning process is gentler on fabric and far more convenient than off-site cleaning. Here's how it works.

## The Problem With Traditional Cleaning

Taking curtains down means: unhooking every glider, transporting bulky fabric, waiting 3–5 days, then rehanging on a ladder. Worse, wet washing and tumble drying causes **shrinkage** — sometimes 5–10% — leaving your curtains too short.

## Our 4-Step On-Site Process

### Step 1 — Free Assessment
A certified technician inspects your fabric type, measures, and assesses soiling. You get a fixed, all-inclusive quote before any work starts. No surprises.

### Step 2 — Pre-Treatment
We spot-treat visible stains and test a small hidden area for colourfastness. Fibre-specific pre-conditioning agents loosen embedded dirt without affecting dyes.

### Step 3 — Deep Clean (Dry Extraction)
This is the magic. Using specialised low-moisture dry-cleaning extraction, we lift dust, allergens, pollen, and odours from the fabric **in place**. Because there's no water saturation, there's:
- **Zero shrinkage risk**
- **No dripping or water marks**
- **No need to take curtains down**
- **Fast — rooms usable the same day**

### Step 4 — Protect & Finish
Optional **Master Guarding** applies an invisible stain-repellent shield. We finish with steam-pressing so drapes hang crisp and fresh.

## What About Delicate Fabrics?

Voiles, sheers, silk blends, and velvet all require adjusted techniques. Our technicians are trained on fabric-specific methods — we never use a one-size-fits-all approach. Blackout-lined curtains are cleaned safely without damaging the backing.

## How Long Does It Take?

A typical lounge (2–3 curtain drops) takes 60–90 minutes. Bedrooms take 30–45 minutes each. You stay home — we work around your furniture.

## Book Your On-Site Clean

Ready to see your curtains look brand new without lifting a finger? Call **+27 75 011 9200** or book a free assessment online. Serving all Johannesburg suburbs.`,
  },
  {
    slug: "dry-cleaning-vs-wet-cleaning-curtains",
    title: "Dry Cleaning vs Wet Cleaning Curtains: Which Is Better?",
    excerpt:
      "Shrinkage, colour run, drying time, cost — we compare dry vs wet curtain cleaning so you can choose the right method for your fabric.",
    category: "Comparisons",
    tags: "curtain cleaning vs dry cleaning,dry-cleaning-vs-wet-cleaning-curtains,shrinkage",
    author: "JHB Curtain Cleaning",
    readingTime: 5,
    published: true,
    featured: false,
    publishedAt: daysAgo(16),
    coverImage: "/blog/dry-vs-wet.jpg",
    content: `When researching curtain cleaning, you'll see two methods: **dry cleaning** (solvent/low-moisture) and **wet cleaning** (water-based). The right choice depends on your fabric, time, and risk tolerance. Here's an honest comparison.

## Quick Comparison

| Factor | Dry Cleaning (On-Site) | Wet Cleaning |
|---|---|---|
| Shrinkage risk | None | Low–High (fabric dependent) |
| Colour run risk | Very low | Possible on natural dyes |
| Drying time | Same-day | 12–24 hours |
| Curtain removal needed | No | Yes |
| Odour removal | Excellent | Good |
| Stain removal | Excellent (solvent-soluble) | Good (water-soluble) |
| Best for | Delicates, lined, blackout | Machine-washable synthetics |

## When Dry Cleaning Wins

Dry cleaning (especially on-site) is the better choice for:
- **Lined & blackout curtains** — water damages backings and causes shrinkage
- **Silk, velvet, and delicate weaves** — water marks and distortion risk
- **Heavy/volume drapes** — too heavy to remove and transport safely
- **Time-sensitive jobs** — usable the same day
- **Allergy sufferers** — no damp = no mould risk

## When Wet Cleaning Makes Sense

Wet cleaning (machine or hand washing) suits:
- **Machine-washable cottons and polyesters** — check the care label
- **Lightweight sheers** — if the label allows
- **Budget DIY** — though shrinkage risk remains

## The Shrinkage Factor

This is the #1 reason customers switch to us. Wet washing cotton and linen curtains can shrink them 3–8%. A curtain that was floor-length comes back puddling above the sill. Dry cleaning uses no water, so there's **zero shrinkage**.

## Cost Comparison

Wet cleaning looks cheaper until you add removal, transport, rehanging, and the risk of shrinkage replacement. On-site dry cleaning's all-in pricing often works out similar — with none of the hassle.

## Our Recommendation

For 90% of Johannesburg homes and businesses, **on-site dry cleaning** is the safer, faster, and ultimately more economical choice. We only recommend wet methods for explicitly machine-washable fabrics.

## Not Sure Which You Need?

Book a free assessment — we'll inspect your fabric and recommend the safest method. Call **+27 75 011 9200**.`,
  },
  {
    slug: "curtain-cleaning-frequency-guide",
    title: "How Often Should Curtains Be Cleaned? A Room-by-Room Guide",
    excerpt:
      "Bedrooms, kitchens, living rooms, and commercial spaces all need different cleaning schedules. Here's how often to clean curtains for health and longevity.",
    category: "Guides",
    tags: "how often should curtains be cleaned,curtain cleaning frequency guide,allergen removal",
    author: "JHB Curtain Cleaning",
    readingTime: 4,
    published: true,
    featured: false,
    publishedAt: daysAgo(23),
    coverImage: "/blog/frequency.jpg",
    content: `Curtains act as giant air filters — trapping dust, pollen, pet dander, cooking oils, and odours. But unlike a vacuum filter, most people forget to clean them. So how often should curtains be cleaned? It depends on the room.

## General Rule

For an average Johannesburg home, **every 12–18 months**. But room usage changes that significantly.

## Room-by-Room Schedule

### Bedrooms — Every 12 Months
Bedrooms collect dead skin, dust mites, and fabric fibres. If anyone in the room has allergies or asthma, clean **every 6 months**. Curtains are a primary dust-mite habitat.

### Living Rooms — Every 12 Months
High traffic means more dust and pet dander. If you have pets, reduce to every 9 months.

### Kitchens — Every 6 Months
Cooking aerosolises oils that settle on nearby curtains, leaving sticky residue that attracts more dirt and can discolour fabric. Kitchen-adjacent curtains need frequent attention.

### Bathrooms — Every 6 Months
Humidity feeds mould and mildew. If curtains are near a bathroom, watch for musty smells.

### Commercial / Hospitality — Every 3–6 Months
Hotels, restaurants, and offices should clean curtains quarterly. Guest-facing freshness and hygiene standards demand it.

## Signs Your Curtains Need Cleaning Now

- Visible dust when sunlight hits them
- A dull or musty smell in the room
- Duller fabric colour than you remember
- Allergy symptoms worsening indoors
- It's been over 18 months since the last clean

## Why Frequency Matters

Beyond appearance, dirty curtains recirculate allergens every time you open or close them. Regular cleaning improves indoor air quality, extends fabric life, and keeps colours vivid.

## Set a Reminder, Then Forget It

We offer scheduled cleaning plans for homes and businesses. Set it once and we'll remind you when it's due — no thinking required. Call **+27 75 011 9200** to set up a plan.`,
  },
  {
    slug: "allergen-removal-curtain-cleaning",
    title: "Curtain Cleaning for Allergies: Removing Dust Mites & Pollen",
    excerpt:
      "Curtains trap the exact allergens that trigger sneezing, asthma, and eczema. Here's how professional cleaning removes them — and why it helps allergy sufferers.",
    category: "Health",
    tags: "allergen removal curtain cleaning,dust mites,pollen,asthma",
    author: "JHB Curtain Cleaning",
    readingTime: 5,
    published: true,
    featured: false,
    publishedAt: daysAgo(30),
    coverImage: "/blog/allergens.jpg",
    content: `If you or your family suffer from allergies, your curtains may be part of the problem. Curtains are soft, porous, and hang in still air — the perfect trap for dust mites, pollen, pet dander, and mould spores. Every time you draw them, you release those allergens back into the room.

## What's Living in Your Curtains?

- **Dust mites** — microscopic arachnids that feed on dead skin; their waste is a top asthma trigger
- **Pollen** — especially high in leafy Johannesburg suburbs like Sandton and Fourways
- **Pet dander** — sticky proteins that cling to fabric for months
- **Mould spores** — thrive in humid rooms and near bathrooms
- **Mining/industrial dust** — a real factor on the West Rand and South JHB

## Why Regular Vacuuming Isn't Enough

A household vacuum removes surface dust but can't extract allergens embedded deep in the weave. Worse, some vacuums blow fine particles back out through the exhaust. Professional extraction reaches the fibres household cleaning misses.

## Our Allergen Removal Process

1. **Deep extraction** lifts embedded dust mites, pollen, and dander from the fabric weave
2. **Dry process** means no moisture — critical, because damp curtains breed mould
3. **Optional sanitisation** neutralises remaining bacteria and mites
4. **No re-deposition** — extracted allergens are contained, not redistributed

## Who Benefits Most?

- **Asthma and eczema sufferers** — fewer triggers, better sleep
- **Hay fever sufferers** — particularly during Johannesburg's high-pollen spring
- **Households with pets** — dander builds up fast
- **Babies and young children** — more sensitive to air quality
- **Elderly family members** — respiratory health matters more with age

## Real Results

Many of our customers report noticeable symptom improvement within days of cleaning bedroom curtains. While curtain cleaning won't cure allergies, removing a major indoor allergen reservoir genuinely helps.

## Book an Allergen-Focused Clean

Tell us about your allergy concerns when booking and we'll tailor the process — including optional sanitisation. Call **+27 75 011 9200** or use our contact form.`,
  },
];
