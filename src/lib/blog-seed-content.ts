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
  {
    slug: "curtain-cleaning-sandton-guide",
    title: "Curtain Cleaning Sandton: A Local Homeowner's Guide (2026)",
    excerpt:
      "Living in Sandton, Morningside, or Bryanston? Here's how Highveld dust, acacia pollen, and urban traffic affect your curtains — and why on-site dry cleaning is the Sandton specialist's choice.",
    category: "Local Guides",
    tags: "curtain cleaning Sandton,curtain cleaning Morningside,curtain cleaning Bryanston,Highveld dust,curtain care Johannesburg North",
    author: "JHB Curtain Cleaning",
    readingTime: 6,
    published: true,
    featured: false,
    publishedAt: daysAgo(37),
    coverImage: null,
    content: `Sandton, Morningside, Bryanston, and Fourways are Johannesburg's premium northern corridor — home to luxury estates, high-rise apartments, and double-volume residences with premium drapery. But the Highveld environment creates unique curtain care challenges that generic cleaners simply miss.

## Why Sandton Curtains Need Specialist Care

Sandton sits on the Highveld plateau at 1,700m elevation. The dry, dusty winters drive fine silica dust and seasonal acacia pollen deep into curtain fibres. Combined with urban traffic pollution from the M1 and Sandton CBD, your curtains absorb more grime than you might think.

**The Sandton curtain challenge:**
- Highveld acacia pollen trapped in sheer voiles and lined drapes
- Urban traffic soot from the M1 corridor
- Construction dust from ongoing northern corridor development
- Sun exposure degrading north-facing fabrics
- Double-volume estate curtains requiring specialist equipment

## On-Site Dry Cleaning: The Sandton Solution

Our mobile solvent dry-cleaning brings industrial-grade extraction directly to your Sandton home. No removal, no transport, no shrinkage — we clean your curtains exactly where they hang.

**Why on-site beats off-site for Sandton properties:**
- No risk of damage during transport
- No 3-5 day waiting period
- No shrinkage from wet cleaning
- Suitable for double-volume and motorized track systems
- Rooms usable immediately after cleaning

## What Sandton Homes Need Most

### Luxury High-Rise Apartments (Sandton CBD, Morningside)
Motorized sheer voiles and vertical blinds trap urban soot. Our solvent extraction removes fine particulates without water — protecting delicate sheer fabrics and motorized track mechanisms.

### Double-Volume Estates (Fourways, Dainfern)
Floor-to-ceiling drapes in double-volume homes require mobile scaffolding and extended-reach equipment. Our technicians are equipped for heights up to 6 metres.

### Heritage Homes (Bryanston, Hyde Park)
Silk blends, velvet, and hand-woven fabrics need fibre-specific care. We test colourfastness before cleaning and use gentle, fabric-appropriate solvents.

## Pricing for Sandton Properties

| Property Type | Rooms | Price Range |
|---|---|---|
| Apartment (1-2 rooms) | 1–2 | R800 – R1,500 |
| Townhouse (3-4 rooms) | 3–4 | R1,500 – R3,000 |
| Estate (5+ rooms) | 5+ | R3,000 – R5,500 |

All quotes are fixed and all-inclusive — no hidden extras.

## Book Your Sandton Assessment

Call **+27 75 011 9200** or book online. We serve all Sandton suburbs including Morningside, Sandhurst, Hyde Park, Bryanston, Fourways, and Dainfern.`,
  },
  {
    slug: "hotel-curtain-cleaning-johannesburg-airport",
    title: "Hotel Curtain Cleaning Near O.R. Tambo: Keeping Rooms Revenue-Ready",
    excerpt:
      "Running a hotel near O.R. Tambo or in Johannesburg's hospitality corridor? Here's how overnight on-site curtain cleaning keeps rooms revenue-ready with zero guest disruption.",
    category: "Commercial",
    tags: "hotel curtain cleaning Johannesburg,hotel curtain cleaning O.R. Tambo,commercial curtain cleaning,overnight curtain cleaning",
    author: "JHB Curtain Cleaning",
    readingTime: 5,
    published: true,
    featured: false,
    publishedAt: daysAgo(44),
    coverImage: null,
    content: `Hotels near O.R. Tambo International Airport and across Johannesburg's hospitality corridor face a unique challenge: curtain cleaning that doesn't disrupt room availability or guest experience. Our overnight on-site dry-cleaning service is built for exactly this.

## The Hotel Curtain Challenge

Hotel curtains work harder than residential drapes. They're opened and closed daily by hundreds of guests, exposed to airport corridor pollution, and accumulate body oils, food odours, and dust at an accelerated rate. Yet taking rooms offline for days to remove and clean curtains is financially unacceptable.

**Common hotel curtain problems:**
- Blackout lining degradation from frequent handling
- Food and beverage stains from room service
- Body oil accumulation on frequently-touched drapes
- Airport corridor pollution (jet fuel residue, fine particulates)
- Fire safety compliance requirements (SANS 10400)

## Overnight On-Site Cleaning: The Solution

Our mobile solvent dry-cleaning is designed for hotel operations:

### Zero Room Downtime
We work overnight (22:00–06:00) while rooms are unoccupied. Curtains are cleaned, dry, and ready before the next guest checks in. No room is taken out of inventory.

### No Removal Required
Curtains stay on their tracks throughout the process. No risk of damage during removal, transport, or rehanging. No missing hooks or misaligned tracks.

### SANS Fire Safety Compliance
For hotels and commercial venues, we provide SANS 10400-compliant fire-retardant treatment with certification documentation — essential for fire safety inspections.

## What We Clean in Hotels

- Guest room blackout curtains and sheers
- Corridor and lobby drapes
- Restaurant and conference room window treatments
- Vertical and roller blinds
- Stage and auditorium curtains (with fire-proofing)

## Pricing for Hotels

Hotel pricing is volume-based with significant discounts for multi-room contracts:

| Service | Per Room | Notes |
|---|---|---|
| Standard guest room (blackout + sheer) | from R650 | Volume discounts available |
| Corridor/lobby drapes | from R850 per section | Includes stain treatment |
| Fire-proofing certification | from R1,200 | SANS 10400 compliant |
| Full hotel annual contract | Custom | Contact for proposal |

## Book a Hotel Assessment

Call **+27 75 011 9200** or contact us for a commercial assessment. We serve all Johannesburg hotels including those near O.R. Tambo, Sandton, Rosebank, and the CBD.`,
  },
  {
    slug: "master-guarding-stain-protection-worth-it",
    title: "Is Master Guarding Stain Protection Worth It? An Honest Guide",
    excerpt:
      "Master Guarding promises invisible stain protection for 12 months. But is it worth the extra cost? We break down the science, the benefits, and when it makes sense (and when it doesn't).",
    category: "Services",
    tags: "Master Guarding,stain protection,curtain protection,fabric care,curtain cleaning cost",
    author: "JHB Curtain Cleaning",
    readingTime: 5,
    published: true,
    featured: false,
    publishedAt: daysAgo(51),
    coverImage: null,
    content: `After cleaning your curtains, you'll be offered Master Guarding — an invisible stain-repellent treatment. Is it worth the extra R450–R1,200? Here's an honest, transparent breakdown.

## What Is Master Guarding?

Master Guarding is a fabric protection treatment that applies an invisible, breathable polymer shield to curtain fibres. It doesn't change the look, feel, or breathability of the fabric — but it makes liquids bead up and roll off instead of soaking in.

**The science:** The treatment creates a hydrophobic (water-repelling) and oleophobic (oil-repelling) barrier at the fibre level. Spills that would normally penetrate and stain instead sit on the surface, giving you time to blot them away.

## What It Protects Against

- ✅ Water-based spills (coffee, tea, juice, rain)
- ✅ Oil-based stains (food, cosmetics, sunscreen)
- ✅ Dust and dirt adhesion (easier to vacuum)
- ✅ Pollen and allergen accumulation
- ❌ Not effective against: ink, dye transfer, bleach, or physical abrasion

## When Master Guarding IS Worth It

**1. Homes with children or pets**
Spills, sticky fingers, and pet oils are the #1 cause of curtain staining. Master Guarding gives you a 30-second window to blot spills before they set.

**2. Kitchen and dining area curtains**
Cooking aerosols and food splatter are oil-based — exactly what Master Guarding repels best.

**3. Light-coloured or white curtains**
Visible staining is most noticeable on light fabrics. The protection keeps them cleaner for longer between professional cleans.

**4. High-value or delicate fabrics**
Silk, velvet, and lined drapes are expensive to replace. Protecting them extends their lifespan significantly.

## When It's NOT Worth It

**1. Dark, heavy drapes in low-traffic rooms**
If your curtains are dark, in a spare bedroom, and rarely touched, the stain risk is minimal.

**2. Curtains you plan to replace within 12 months**
The protection lasts 12 months. If you're renovating soon, save the money.

**3. Outdoor or bathroom curtains**
These face moisture and mould that Master Guarding doesn't address.

## Cost vs. Value

| Factor | Without Master Guarding | With Master Guarding |
|---|---|---|
| Stain risk | High (spills set immediately) | Low (30-second blotting window) |
| Cleaning frequency | Every 12 months | Every 18–24 months |
| Fabric lifespan | Standard | Extended 20–30% |
| Cost per item | R0 extra | R450–R1,200 |
| Cost of stain removal | R150–R350 per stain | Usually preventable |

**Bottom line:** If you have children, pets, light-coloured fabrics, or kitchen/dining curtains, Master Guarding pays for itself within the first prevented stain.

## How It's Applied

1. Curtains are professionally cleaned first (Master Guarding must be applied to clean fabric)
2. The treatment is sprayed evenly across the full surface
3. It bonds within 15–30 minutes — no drying time needed
4. Curtains are immediately usable

## Book Master Guarding

Add Master Guarding to any curtain cleaning service. Call **+27 75 011 9200** or book online.`,
  },
  {
    slug: "fire-proofing-certificates-curtains-sans",
    title: "Fire Proofing Certificates for Curtains: SANS 10400 Compliance Guide",
    excerpt:
      "Theatres, hotels, and commercial venues in Johannesburg require SANS 10400 fire-retardant curtains. Here's what the law requires, how certification works, and how to stay compliant.",
    category: "Commercial",
    tags: "fire proofing curtains,SANS 10400,fire retardant curtains,fire certificate Johannesburg,commercial curtain cleaning",
    author: "JHB Curtain Cleaning",
    readingTime: 6,
    published: true,
    featured: false,
    publishedAt: daysAgo(58),
    coverImage: null,
    content: `If you operate a theatre, hotel, conference venue, or commercial space in Johannesburg, fire safety compliance isn't optional — it's the law. SANS 10400 (The South African National Building Regulations) requires that curtains and drapes in public spaces meet specific fire-retardant standards.

## What Is SANS 10400?

SANS 10400 is the South African National Standard governing building regulations, including fire safety. Part T (Fire Protection) requires that soft furnishings in public-access buildings — including curtains, stage drapes, and window treatments — must be treated with fire-retardant materials that resist ignition and slow flame spread.

**Who needs fire-proofed curtains:**
- Theatres and performing arts venues
- Hotels, guesthouses, and B&Bs
- Conference centres and event venues
- Restaurants and pubs
- Schools, universities, and training centres
- Hospitals and healthcare facilities
- Cinemas and entertainment venues
- Office buildings with public access

## How Fire Proofing Works

Our fire-retardant treatment applies a chemical barrier to curtain fibres that:

1. **Raises the ignition temperature** — the fabric requires significantly more heat to ignite
2. **Slows flame spread** — if ignition occurs, the flame doesn't travel across the fabric
3. **Reduces smoke production** — less toxic smoke in the critical first minutes of a fire
4. **Self-extinguishes** — when the heat source is removed, the flame dies

The treatment doesn't alter the appearance, feel, or drape of the fabric. It's invisible and odourless once dry.

## The Certification Process

1. **Assessment** — We inspect your curtains, fabric type, and venue requirements
2. **Treatment** — Fire-retardant solution is applied on-site (no removal needed)
3. **Drying** — 1–2 hours (curtains remain in place)
4. **Certification** — We issue a SANS 10400 compliance certificate documenting:
   - Date of treatment
   - Fabric type and location
   - Treatment product used
   - Fire safety standard met
   - Next re-treatment date (annual)

## How Often Must Curtains Be Re-Treated?

Fire-retardant treatment is effective for **12 months**. After that, the chemical barrier degrades due to:
- Dust accumulation (which is flammable)
- Cleaning (which can remove the treatment)
- UV exposure (which breaks down the polymer)
- Handling and friction

**Annual re-treatment is required** to maintain compliance. We send automated reminders before your certificate expires.

## Cost of Non-Compliance

| Risk | Consequence |
|---|---|
| Failed fire inspection | Venue closure until compliant |
| Insurance invalidation | Claims denied if curtains weren't treated |
| Liability in a fire | Personal and corporate liability |
| Fines | Municipal penalties for non-compliance |

## Pricing

| Service | Price | Includes |
|---|---|---|
| Fire-retardant treatment | from R1,200 | On-site application + certificate |
| Annual re-treatment | from R1,000 | Discounted rate for existing clients |
| Combined clean + fire-proof | from R2,000 | Clean first, then treat (recommended) |
| Full venue audit | Custom | All curtains inspected + treated |

## Book a Fire Safety Assessment

Call **+27 75 011 9200** or contact us for a commercial fire safety assessment. We serve all Johannesburg venues including theatres, hotels, schools, and conference centres.`,
  },
  {
    slug: "persian-rug-cleaning-johannesburg",
    title: "Persian Rug Cleaning in Johannesburg: Preserving Natural Dyes & Investment Pieces",
    excerpt:
      "Persian and Oriental rugs are investment pieces that need specialist care. Here's how Johannesburg's Highveld environment affects them, and why gentle hand-cleaning preserves their value.",
    category: "Services",
    tags: "Persian rug cleaning Johannesburg,Oriental rug cleaning,rug care Johannesburg,hand-woven rug cleaning,rug cleaning cost",
    author: "JHB Curtain Cleaning",
    readingTime: 5,
    published: true,
    featured: false,
    publishedAt: daysAgo(65),
    coverImage: null,
    content: `Persian and Oriental rugs are more than floor coverings — they're hand-crafted investment pieces, often passed down through generations. Johannesburg's Highveld environment, with its dry dust and seasonal pollen, poses specific threats to these delicate textiles. Here's how specialist cleaning preserves both their beauty and their value.

## Why Persian Rugs Need Specialist Care

Persian and Oriental rugs are typically hand-woven from wool, silk, or cotton, using natural dyes derived from plants, insects, and minerals. These natural dyes are sensitive to:

- **Water** — can cause dyes to bleed and run
- **High pH cleaners** — strip natural oils and fade colours
- **Mechanical agitation** — damages delicate fibres and fringe
- **Heat** — sets stains and shrinks wool fibres
- **UV light** — fades natural dyes permanently

Generic rug cleaners use hot water extraction (steam cleaning) — which is exactly the wrong approach for hand-woven rugs.

## The Johannesburg Rug Challenge

The Highveld environment creates specific soil loads for rugs:

- **Silica dust** — fine, abrasive particles that cut wool fibres
- **Acacia pollen** — acidic, causes dye degradation over time
- **Dry air** — static electricity attracts dust deeper into the pile
- **Pet dander and oils** — common in Johannesburg homes with pets

Without regular cleaning, this grit acts like sandpaper — grinding against wool fibres every time someone walks on the rug. Over time, the pile wears thin and colours dull.

## Our Specialist Rug Cleaning Process

### Step 1: Dye Testing
Before any cleaning, we test a small hidden area to verify colourfastness. If dyes are unstable, we adjust our method to prevent bleeding.

### Step 2: Dry Soil Extraction
We use specialized vibration equipment to release embedded grit from the rug's foundation. This removes up to 80% of soil before any liquid is introduced.

### Step 3: Gentle Hand-Cleaning
Using cool water and pH-neutral, fibre-specific solutions, we hand-clean the rug surface. No mechanical scrubbing, no high-pressure extraction, no harsh chemicals.

### Step 4: Fringe Care
Fringes are hand-cleaned separately with a gentle solution to prevent tangling and discolouration.

### Step 5: Controlled Drying
The rug is dried flat in a temperature-controlled environment to prevent shrinkage and shape distortion.

### Step 6: Final Grooming
The pile is groomed in the direction of the weave, restoring the rug's natural sheen and pattern definition.

## Pickup and Delivery

We offer free pickup and delivery across Johannesburg for rug cleaning. Your rug is transported rolled (never folded) to prevent creasing, and returned within 5–7 business days.

## Pricing

| Rug Size | Price Range |
|---|---|
| Small (up to 2m²) | R350 – R600 |
| Medium (2–4m²) | R600 – R1,200 |
| Large (4–8m²) | R1,200 – R2,500 |
| Extra large / silk | Custom quote |

## How Often Should Persian Rugs Be Cleaned?

- **Light traffic rooms:** Every 2–3 years
- **Moderate traffic (living room):** Every 18–24 months
- **High traffic (hallway, entrance):** Every 12 months
- **Homes with pets:** Every 12 months

## Book a Rug Assessment

Call **+27 75 011 9200** or book online. We collect, clean, and deliver across all Johannesburg suburbs.`,
  },
  {
    slug: "commercial-curtain-cleaning-without-closing",
    title: "Commercial Curtain Cleaning Without Closing: After-Hours Service Guide",
    excerpt:
      "Offices, retail stores, and commercial venues can't afford to close for curtain cleaning. Here's how our after-hours on-site service keeps your business running.",
    category: "Commercial",
    tags: "commercial curtain cleaning,after-hours curtain cleaning,office curtain cleaning Johannesburg,curtain cleaning without closing,business curtain care",
    author: "JHB Curtain Cleaning",
    readingTime: 5,
    published: true,
    featured: false,
    publishedAt: daysAgo(72),
    coverImage: null,
    content: `Commercial spaces — offices, retail stores, medical practices, and restaurants — can't afford to close during business hours for curtain cleaning. Our after-hours on-site service is designed specifically for businesses that need clean curtains without operational disruption.

## The Commercial Curtain Problem

Commercial curtains work harder than residential drapes. They face:
- Daily handling by staff and customers
- Higher dust and pollution exposure (ground-floor locations)
- Food and beverage stains (restaurants, staff kitchens)
- Handprints and body oils (retail, reception areas)
- Regulatory requirements (fire safety, hygiene standards)

Yet taking curtains down means disrupted operations, exposed windows, and potential security concerns. The solution is on-site, after-hours cleaning.

## How After-Hours Commercial Cleaning Works

### Scheduling
We work outside your operating hours:
- **Offices:** Evenings (18:00–22:00) or weekends
- **Restaurants:** Between lunch and dinner service, or on closed days
- **Retail:** After closing (18:00–22:00) or Sunday
- **Medical practices:** After hours or during scheduled closures
- **Hotels:** Overnight (22:00–06:00)

### On-Site Process
1. We arrive at your premises at the scheduled time
2. Curtains are cleaned in place — no removal, no ladders blocking exits
3. Each area takes 30–60 minutes depending on curtain size
4. Rooms are clean, dry, and usable immediately
5. We secure the premises on departure

### No Disruption
- No furniture to move (we work around it)
- No equipment left behind
- No noise concerns (our equipment is quieter than a vacuum cleaner)
- No security risk (curtains stay on their tracks)

## What We Clean in Commercial Spaces

- Office partition curtains and blinds
- Reception and boardroom drapes
- Retail window displays and fitting room curtains
- Restaurant divider curtains and booth drapes
- Medical practice privacy screens
- Vertical, roller, and Venetian blinds

## Fire Safety Compliance

For commercial venues, we also provide:
- SANS 10400 fire-retardant treatment (with certification)
- Annual compliance reminders
- Full audit documentation for insurance purposes

## Pricing for Commercial Clients

| Service | Price | Notes |
|---|---|---|
| Per curtain drop (standard) | from R350 | Volume discounts available |
| Per blind (roller/vertical) | from R250 | |
| Fire-proofing certification | from R1,200 | SANS 10400 compliant |
| Full premises annual contract | Custom | Includes scheduled cleaning + fire compliance |

**30-day payment terms** available for established commercial accounts.

## Book a Commercial Assessment

Call **+27 75 011 9200** or contact us for a free on-site commercial assessment. We'll inspect your premises, measure all curtains and blinds, and provide a fixed all-inclusive quote — typically within 1 business day.

We serve all Johannesburg commercial areas including Sandton, Rosebank, the CBD, Braamfontein, Midrand, and Centurion.`,
  },
];
