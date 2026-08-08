// Central business configuration for JHB Curtain Cleaning
export const siteConfig = {
  name: "JHB Curtain Cleaning",
  shortName: "JHB Curtain",
  domain: "jhbcurtaincleaning.co.za",
  url: "https://jhbcurtaincleaning.co.za",
  tagline: "Professional On-Site Curtain Cleaning Johannesburg",
  description:
    "Professional on-site curtain cleaning Johannesburg. No removal, no shrinkage guarantee. Free assessment. Serving Sandton, Randburg, Fourways & all JHB suburbs.",
  phone: "+27750119200",
  phoneDisplay: "+27 75 011 9200",
  whatsapp: "27750119200",
  whatsappDisplay: "+27 75 011 9200",
  email: "info@jhbcurtaincleaning.co.za",
  founder: {
    name: "Stephen Dunlop",
    title: "Managing Director & Fabric Care Specialist",
  },
  address: {
    street: "10 2nd Ave, Florida",
    locality: "Roodepoort",
    region: "Gauteng",
    postalCode: "1710",
    country: "ZA",
  },
  geo: { latitude: "-26.1811", longitude: "27.9036" },
  hours: [
    { days: "Mon – Fri", time: "07:00 – 18:00" },
    { days: "Saturday", time: "08:00 – 14:00" },
    { days: "Sunday", time: "Closed" },
  ],
  priceRange: "R450 – R6000",
  rating: { value: "4.9", count: 5000 },
  social: [
    { name: "Facebook", href: "https://facebook.com/jhbcurtaincleaning" },
    { name: "Instagram", href: "https://instagram.com/jhbcurtaincleaning" },
    { name: "LinkedIn", href: "https://linkedin.com/company/jhbcurtaincleaning" },
    { name: "YouTube", href: "https://youtube.com/@jhbcurtaincleaning" },
  ],
  // Local citation directories (sameAs in schema)
  citations: [
    { name: "Snupit", href: "https://www.snupit.co.za/roodeport/florida/jhb-curtain-cleaning" },
    { name: "Brabys", href: "https://www.brabys.com/business/jhb-curtain-cleaning" },
    { name: "Yellow Pages SA", href: "https://www.yellowpages.co.za/comp/jhb-curtain-cleaning" },
  ],
  // Google Business Profile categories
  gbpCategories: [
    "Dry Cleaner",
    "Carpet Cleaning Service",
    "Upholstery Cleaning Service",
    "Commercial Cleaning Service",
  ],
} as const;

export type ServiceItem = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: string; // lucide icon name
  priceFrom: string;
  features: string[];
  faqs: { q: string; a: string }[];
  answerBlock?: string;
};

export const services: ServiceItem[] = [
  {
    slug: "curtain-blind-cleaning",
    name: "Curtain & Blind Cleaning",
    short: "On-site dry cleaning for all curtain and blind types.",
    description:
      "Our flagship service. We clean your curtains and blinds exactly where they hang using a zero-water dry-cleaning extraction process. No removal, no shrinkage, no disruption to your home or business.",
    icon: "Wind",
    priceFrom: "R800",
    features: [
      "Voile & sheer curtains",
      "Lined drapes & blackout lining",
      "Silk blends & velvet",
      "Roman, roller & vertical blinds",
      "On-site, no removal",
      "Zero shrinkage guarantee",
    ],
    faqs: [
      { q: "Will my curtains shrink?", a: "No. Our dry-cleaning process uses zero water, which means zero shrinkage risk." },
      { q: "Can you clean delicate fabrics?", a: "Yes. We handle voiles, sheers, silk blends, velvet, and lined drapes safely." },
      { q: "Do I need to take my curtains down?", a: "No. We clean your curtains exactly where they hang." },
      { q: "What about blackout lining?", a: "Blackout-lined curtains are safely cleaned on-site." },
    ],
    answerBlock:
      "On-site curtain and blind dry cleaning by JHB Curtain Cleaning uses mobile solvent extraction to clean drapes, sheers, voiles, and blinds directly on their rails without removal across Johannesburg. The waterless process dissolves embedded Highveld dust and allergens while eliminating shrinkage risks entirely. Service takes 1 to 3 hours per property with curtains dry and usable immediately.",
  },
  {
    slug: "mattress-sanitisation",
    name: "Mattress Sanitisation",
    short: "Deep sanitisation that removes dust mites, allergens & stains.",
    description:
      "A healthy bedroom starts with a clean mattress. Our sanitisation process eliminates dust mites, bacteria, and allergens while treating stains — improving sleep quality for allergy sufferers.",
    icon: "BedDouble",
    priceFrom: "R650",
    features: [
      "Dust mite elimination",
      "Allergen & bacteria removal",
      "Stain & odour treatment",
      "UV sanitisation",
      "Safe for children & pets",
      "Same-day service",
    ],
    faqs: [
      { q: "How often should I sanitise my mattress?", a: "Every 6 months for regular use, or quarterly for allergy sufferers." },
      { q: "Is it safe for babies?", a: "Yes, our process uses eco-friendly, non-toxic products safe for the whole family." },
    ],
    answerBlock:
      "Mattress sanitisation by JHB Curtain Cleaning uses deep extraction and UV treatment to eliminate dust mites, bacteria, and allergens from mattresses across Johannesburg. The process is safe for children and pets, uses eco-friendly non-toxic products, and takes 30 to 60 minutes per mattress. Same-day service available with the mattress usable immediately after treatment.",
  },
  {
    slug: "upholstery-carpet-cleaning",
    name: "Upholstery & Carpet Cleaning",
    short: "Revive couches, chairs & carpets with deep extraction cleaning.",
    description:
      "From lounge suites to office carpets, our deep-extraction cleaning lifts embedded dirt, stains, and allergens — restoring fabric colour and extending the life of your furnishings.",
    icon: "Sofa",
    priceFrom: "R500",
    features: [
      "Lounge suites & couches",
      "Dining & office chairs",
      "Wall-to-wall carpets",
      "Rugs & runners",
      "Stain & pet odour removal",
      "Fast drying time",
    ],
    faqs: [
      { q: "How long until carpets are dry?", a: "Typically 4–6 hours with our low-moisture extraction method." },
    ],
    answerBlock:
      "Upholstery and carpet cleaning by JHB Curtain Cleaning uses deep extraction to lift embedded dirt, stains, and allergens from couches, chairs, and carpets across Johannesburg. The low-moisture method ensures fast 4 to 6 hour drying time. Safe for all fabric types including delicate weaves, with rooms usable the same day.",
  },
  {
    slug: "master-guarding",
    name: "Master Guarding (Stain Protection)",
    short: "Invisible shield that repels stains & extends fabric life.",
    description:
      "Master Guarding applies an invisible, breathable protector to your curtains, upholstery, and carpets. Spills bead up instead of soaking in — making future cleaning easier and extending fabric life.",
    icon: "ShieldCheck",
    priceFrom: "R450",
    features: [
      "Repels oil & water-based stains",
      "Breathable — won't alter fabric feel",
      "Extends fabric lifespan",
      "Reduces cleaning frequency",
      "Safe for all fabric types",
      "12-month protection",
    ],
    faqs: [
      { q: "Is Master Guarding worth it?", a: "Yes — it dramatically reduces staining and extends the time between professional cleans, saving money long-term." },
    ],
    answerBlock:
      "Master Guarding by JHB Curtain Cleaning applies an invisible, breathable stain-repellent shield to curtains, upholstery, and carpets across Johannesburg. The treatment repels oil and water-based stains for 12 months, does not alter fabric feel or appearance, and reduces future cleaning frequency. Application takes 15 to 30 minutes per item.",
  },
  {
    slug: "fire-proofing",
    name: "Fire Proofing Curtains",
    short: "SANS-compliant fire retardant treatment for commercial spaces.",
    description:
      "Theatres, hotels, and commercial venues require fire-retardant curtains. Our SANS-compliant fire-proofing treatment meets local fire safety regulations and is certified for commercial use.",
    icon: "Flame",
    priceFrom: "R1200",
    features: [
      "SANS 10400 compliant",
      "Certified fire-retardant treatment",
      "For theatres, hotels & venues",
      "Doesn't alter fabric appearance",
      "Certification documentation",
      "Annual re-treatment available",
    ],
    faqs: [
      { q: "Do I need a fire certificate?", a: "Commercial venues with curtains generally require fire-retardant certification under SANS 10400. We provide documentation." },
    ],
    answerBlock:
      "Fire proofing by JHB Curtain Cleaning applies SANS 10400 compliant fire-retardant treatment to commercial curtains and stage drapes across Johannesburg. The treatment does not alter fabric appearance, includes certification documentation, and is suitable for theatres, hotels, and venues. Annual re-treatment is available for continued compliance.",
  },
  {
    slug: "rug-care",
    name: "Rug Care (Persian & Oriental)",
    short: "Specialist cleaning for delicate Persian & Oriental rugs.",
    description:
      "Persian, Oriental, and hand-woven rugs need specialist care. We use gentle, fibre-specific cleaning that preserves natural dyes and extends the life of your investment pieces.",
    icon: "Square",
    priceFrom: "R900",
    features: [
      "Persian & Oriental rugs",
      "Natural dye preservation",
      "Fringe cleaning & repair",
      "Pet urine & odour removal",
      "Pickup & delivery",
      "Gentle hand-cleaning",
    ],
    faqs: [
      { q: "Will my rug's colours run?", a: "No. We test dyes before cleaning and use fibre-specific, colour-safe methods." },
    ],
    answerBlock:
      "Persian and Oriental rug cleaning by JHB Curtain Cleaning uses gentle, fibre-specific hand-cleaning that preserves natural dyes across Johannesburg. The process includes dye testing, fringe cleaning, and pet odour removal with pickup and delivery available. Safe for hand-woven, silk, and wool rugs with colours protected throughout.",
  },
];

export type SuburbDetail = {
  name: string;
  slug: string;
  focus: string;
  keywords: string[];
};

export type AreaItem = {
  slug: string;
  region: string;
  suburb: string;
  painPoint: string;
  h1: string;
  intro: string;
  environmentalFactors: string[];
  answerBlock: string;
  suburbs?: SuburbDetail[];
};

export const areas: AreaItem[] = [
  {
    slug: "jhb-north",
    region: "JHB North",
    suburb: "Sandton",
    painPoint: "High pollen counts in leafy suburbs aggravate allergies — we remove trapped allergens from curtains.",
    h1: "Curtain Cleaning Sandton & Johannesburg North",
    intro:
      "Sandton, Morningside, Bryanston, and Fourways are home to luxury estates, high-rise apartments, and double-volume residences with premium drapery. Our mobile solvent dry-cleaning technology cleans your curtains exactly where they hang — no removal, no shrinkage, no disruption to your home or business.",
    environmentalFactors: [
      "Highveld acacia pollen trapped in sheer voiles and lined drapes",
      "Urban traffic pollution from the M1 and Sandton CBD",
      "Dust from construction and development across the northern corridor",
      "Sun exposure degrading fabrics in north-facing windows",
    ],
    answerBlock:
      "On-site curtain dry cleaning by JHB Curtain Cleaning utilizes mobile solvent extraction equipment to clean window drapes, blinds, and sheer fabrics directly on their rails without removal across Sandton, Morningside, Bryanston, and Fourways. The waterless process dissolves embedded Highveld dust and pollen while eliminating shrinkage risks. Service takes 2 to 4 hours per property with curtains usable immediately.",
    suburbs: [
      { name: "Sandton & Morningside", slug: "sandton", focus: "Luxury high-rise drapes, motorized sheer voiles, and urban traffic pollution removal.", keywords: ["curtain cleaning Sandton", "on-site curtain dry cleaners Morningside", "high-rise drape cleaning Sandton"] },
      { name: "Fourways & Dainfern", slug: "fourways", focus: "Double-volume estate curtains, mobile scaffolding capabilities, and Highveld pollen care.", keywords: ["curtain cleaning Fourways", "double-volume drape cleaning Dainfern", "estate curtain cleaning Fourways"] },
      { name: "Bryanston & Hyde Park", slug: "bryanston", focus: "Delicate silk blends, velvet care, and hand-woven fabric protection.", keywords: ["curtain cleaning Bryanston", "silk drape cleaning Hyde Park", "velvet curtain cleaning Bryanston"] },
    ],
  },
  {
    slug: "jhb-east",
    region: "JHB East",
    suburb: "Edenvale",
    painPoint: "Dust from open veld and construction settles into hanging fabrics — our extraction removes it.",
    h1: "Curtain Cleaning Edenvale & Johannesburg East",
    intro:
      "Bedfordview, Edenvale, and Kempton Park homes and businesses face dust from open veld, construction activity, and the O.R. Tambo airport corridor. Our on-site solvent dry-cleaning extracts embedded grit without water — protecting your curtains from shrinkage while restoring their vibrancy.",
    environmentalFactors: [
      "Open veld dust and seasonal winds across the East Rand",
      "Construction dust from ongoing residential development",
      "Airport corridor pollution near O.R. Tambo",
      "Industrial proximity in Kempton Park and Isando",
    ],
    answerBlock:
      "JHB Curtain Cleaning provides mobile solvent dry cleaning across Bedfordview, Edenvale, and Kempton Park. Our waterless process extracts Highveld dust, construction grit, and airport corridor pollution from curtains without removal or shrinkage. The service is safe for all fabrics including silk, velvet, and blackout-lined drapes, with rooms usable immediately after cleaning.",
    suburbs: [
      { name: "Bedfordview & Edenvale", slug: "bedfordview", focus: "Residential drapes and commercial venue window treatments.", keywords: ["curtain cleaning Bedfordview", "drape cleaning Edenvale", "on-site curtain cleaning East Rand"] },
      { name: "Kempton Park & O.R. Tambo Corridor", slug: "kempton-park", focus: "Hospitality properties, hotel corridors, and SANS-compliant fire-proofing certifications.", keywords: ["curtain cleaning Kempton Park", "hotel curtain cleaning O.R. Tambo", "fire proofing curtains Kempton Park"] },
    ],
  },
  {
    slug: "jhb-south",
    region: "JHB South",
    suburb: "Alberton",
    painPoint: "Industrial proximity means soot and grime — we restore curtain brightness on-site.",
    h1: "Curtain Cleaning Alberton & Johannesburg South",
    intro:
      "Alberton, Glenvista, and the JHB South industrial belt experience higher levels of airborne soot and industrial particulates. Our solvent extraction lifts fine black grime from curtains without water — restoring brightness and removing allergens in a single on-site visit.",
    environmentalFactors: [
      "Industrial belt soot and fine particulate matter",
      "Mining residue dust from the south-western reef",
      "Traffic pollution from the N12 and R59 corridors",
      "Dry Highveld winters concentrating airborne pollutants",
    ],
    answerBlock:
      "JHB Curtain Cleaning serves Alberton, Glenvista, and Johannesburg South with mobile solvent dry cleaning that extracts industrial soot and mining-belt dust from curtains without removal. The waterless process is safe for all fabrics and eliminates shrinkage risk. Curtains are clean, dry, and usable immediately after the 2-4 hour on-site service.",
    suburbs: [
      { name: "Alberton & Glenvista", slug: "alberton", focus: "Residential curtain cleaning with industrial-soil extraction.", keywords: ["curtain cleaning Alberton", "drape cleaning Glenvista", "industrial soot curtain cleaning JHB South"] },
      { name: "Southgate & Mondeor", slug: "southgate", focus: "Residential and light commercial curtain and blind cleaning.", keywords: ["curtain cleaning Southgate", "blind cleaning Mondeor", "curtain cleaning Johannesburg South"] },
    ],
  },
  {
    slug: "jhb-west",
    region: "JHB West",
    suburb: "Roodepoort",
    painPoint: "Mining belt dust coats curtains — our dry extraction lifts fine particulates safely.",
    h1: "Curtain Cleaning Roodepoort & Johannesburg West",
    intro:
      "Roodepoort, Florida, and Constantia Kloof sit on the western mining belt, where fine silica dust from mine dumps coats curtains year-round. As Roodepoort is our home base (10 2nd Ave, Florida), we offer rapid dispatch and deep local knowledge. Our solvent extraction lifts the finest particulates without water or shrinkage.",
    environmentalFactors: [
      "Silica dust from western mining belt and mine dumps",
      "Dry Highveld winds carrying fine particulates",
      "Residential development dust from Constantia and Ruimsig",
      "Base of operations — fastest response times",
    ],
    answerBlock:
      "JHB Curtain Cleaning is based in Florida, Roodepoort, and provides rapid-dispatch mobile solvent dry cleaning across the western suburbs. Our waterless process extracts fine silica mining-belt dust from curtains without removal or shrinkage. As our home base, Roodepoort clients benefit from our fastest response times and deep local knowledge of western Highveld dust challenges.",
    suburbs: [
      { name: "Roodepoort & Florida", slug: "roodepoort", focus: "Base of local operations — residential services and rapid dispatch.", keywords: ["curtain cleaning Roodepoort", "curtain cleaning Florida", "on-site curtain cleaning Roodepoort"] },
      { name: "Constantia Kloof & Ruimsig", slug: "constantia", focus: "Estate residential drapes and new-development curtain care.", keywords: ["curtain cleaning Constantia", "drape cleaning Ruimsig", "estate curtain cleaning Johannesburg West"] },
    ],
  },
  {
    slug: "jhb-central",
    region: "JHB Central",
    suburb: "Rosebank",
    painPoint: "Urban pollution and traffic soot darken drapes — we clean without removal.",
    h1: "Curtain Cleaning Rosebank & Johannesburg Central",
    intro:
      "Rosebank, Parktown, Braamfontein, and the JHB CBD experience the highest urban pollution levels — traffic soot, diesel particulates, and building dust darken drapes faster than any other zone. Our on-site solvent extraction removes urban grime without water, protecting delicate fabrics in heritage homes and corporate offices alike.",
    environmentalFactors: [
      "Heavy traffic soot and diesel particulates from urban density",
      "Building and construction dust in the redevelopment corridor",
      "Heritage home fabric preservation (Parktown, Westcliff)",
      "Corporate office window treatments and boardroom blinds",
    ],
    answerBlock:
      "JHB Curtain Cleaning provides mobile solvent dry cleaning across Rosebank, Parktown, and the Johannesburg CBD. Our waterless process extracts urban traffic soot and diesel particulates from curtains without removal or shrinkage. The service is safe for heritage fabrics in Parktown homes and corporate office window treatments, with rooms usable immediately after cleaning.",
    suburbs: [
      { name: "Rosebank & Parktown", slug: "rosebank", focus: "Corporate office window treatments, blinds, and heritage home drapes.", keywords: ["curtain cleaning Rosebank", "office blind cleaning Parktown", "heritage drape cleaning Johannesburg"] },
      { name: "Braamfontein & CBD", slug: "cbd", focus: "Commercial and retail curtain and blind cleaning.", keywords: ["curtain cleaning Braamfontein", "commercial curtain cleaning Johannesburg CBD", "office blind cleaning Johannesburg"] },
    ],
  },
  {
    slug: "pretoria-midrand",
    region: "Pretoria / Midrand",
    suburb: "Pretoria",
    painPoint: "Highveld dust and seasonal winds fill curtains with grit — on-site cleaning solves it.",
    h1: "Curtain Cleaning Pretoria & Midrand",
    intro:
      "Pretoria, Centurion, and Midrand span the northern Highveld, where dry winters and strong seasonal winds fill curtains with fine grit. Our mobile solvent dry-cleaning brings waterless extraction directly to your home or office — removing embedded dust without the shrinkage risk of steam cleaning.",
    environmentalFactors: [
      "Dry Highveld winters with strong seasonal winds",
      "Open veld dust across Centurion and Midrand developments",
      "Pollen from Pretoria's jacaranda-lined streets",
      "Commercial corridor dust from the N1 and M1 intersection",
    ],
    answerBlock:
      "JHB Curtain Cleaning provides mobile solvent dry cleaning across Pretoria, Centurion, and Midrand. Our waterless process extracts Highveld dust, jacaranda pollen, and wind-blown grit from curtains without removal or shrinkage. The service covers residential homes and commercial offices, with curtains clean and usable immediately after the 2-4 hour on-site visit.",
    suburbs: [
      { name: "Pretoria East & Centurion", slug: "pretoria-east", focus: "Residential estate drapes and family home curtain care.", keywords: ["curtain cleaning Pretoria", "drape cleaning Centurion", "on-site curtain cleaning Pretoria East"] },
      { name: "Midrand & Halfway House", slug: "midrand", focus: "Corporate office blinds and commercial curtain maintenance.", keywords: ["curtain cleaning Midrand", "office blind cleaning Midrand", "commercial curtain cleaning Halfway House"] },
    ],
  },
];

export type SectorItem = { slug: string; name: string; icon: string; value: string };
export const sectors: SectorItem[] = [
  { slug: "hotels", name: "Hotels", icon: "Hotel", value: "Discreet overnight cleaning that keeps rooms revenue-ready — no downtime, no guest disruption." },
  { slug: "corporate", name: "Corporate", icon: "Building2", value: "After-hours curtain and blind cleaning for offices, boardrooms, and reception areas." },
  { slug: "healthcare", name: "Healthcare", icon: "HeartPulse", value: "Hygiene-critical sanitisation for clinics, hospitals, and care facilities." },
  { slug: "education", name: "Education", icon: "GraduationCap", value: "Term-break curtain cleaning for schools, colleges, and universities." },
  { slug: "theatres", name: "Theatres", icon: "Drama", value: "Fire-proofed stage curtains with SANS certification for theatres and venues." },
  { slug: "residential", name: "Residential", icon: "Home", value: "Gentle, family-safe home curtain cleaning with a no-shrinkage guarantee." },
];

export const processSteps = [
  { step: 1, name: "Free Assessment", icon: "ClipboardCheck", text: "A certified technician inspects fabric type, soiling levels, and provides a no-obligation quote." },
  { step: 2, name: "Pre-Treatment", icon: "SprayCan", text: "Spot-treat stains, test fabric colourfastness, and apply fibre-specific pre-conditioning agents." },
  { step: 3, name: "Deep Clean", icon: "Sparkles", text: "On-site dry-cleaning extraction removes dust, allergens, and odours without water." },
  { step: 4, name: "Protect & Finish", icon: "ShieldCheck", text: "Optional Master Guarding protection, rehanging, and steam-press finishing." },
];

export const testimonials = [
  { name: "Thandiwe M.", area: "Sandton", text: "They cleaned my heavy lined drapes without taking them down — no shrinkage, looked brand new. Brilliant service.", rating: 5 },
  { name: "Hotel Manager, Rosebank", area: "Rosebank", text: "We run a 120-room hotel and they cleaned all curtains overnight with zero guest disruption. Highly recommend.", rating: 5 },
  { name: "Pieter & Anneke", area: "Roodepoort", text: "Honest quoting, on time, and the dust mite removal has helped my son's allergies enormously.", rating: 5 },
  { name: "Dr. Naidoo", area: "Edenvale", text: "Professional from start to finish. The fire-proofing certificate passed our venue inspection first time.", rating: 5 },
  { name: "Lerato K.", area: "Fourways", text: "Booked online, got a quote within the hour, and they arrived exactly when promised. My voiles are sparkling.", rating: 5 },
  { name: "Sandton City Hotel", area: "Sandton", text: "Their after-hours service means we never lose a booking to maintenance. Genuine professionals.", rating: 5 },
];

export type PricingTier = {
  name: string;
  priceFrom: string;
  description: string;
  popular?: boolean;
  items: { label: string; price: string; note?: string }[];
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Curtain & Blind Cleaning",
    priceFrom: "R450",
    description: "On-site dry cleaning for all curtain and blind types. Priced per drop/panel.",
    items: [
      { label: "Voile / Sheer panels", price: "R450 – R800" },
      { label: "Unlined drapes", price: "R600 – R1,200" },
      { label: "Lined drapes", price: "R900 – R1,800", note: "incl. blackout lining" },
      { label: "Heavy / volume curtains", price: "R2,500 – R6,000" },
      { label: "Roman / roller blinds", price: "R350 – R700 / blind" },
    ],
  },
  {
    name: "Mattress Sanitisation",
    priceFrom: "R650",
    description: "Deep sanitisation eliminating dust mites, bacteria, and allergens.",
    items: [
      { label: "Single / Three-quarter", price: "R650" },
      { label: "Double / Queen", price: "R850" },
      { label: "King / Super King", price: "R1,100" },
      { label: "Stain treatment (per stain)", price: "R150" },
      { label: "UV sanitisation add-on", price: "R200" },
    ],
  },
  {
    name: "Upholstery & Carpet",
    priceFrom: "R500",
    description: "Deep-extraction cleaning for furnishings and floor coverings.",
    items: [
      { label: "Lounge suite (3+2+1)", price: "R1,500 – R2,200" },
      { label: "Single couch / sofa", price: "R500 – R900" },
      { label: "Dining / office chair", price: "R150 – R250 / chair" },
      { label: "Wall-to-wall carpet (per m²)", price: "R45 – R65" },
      { label: "Rug cleaning", price: "R350 – R1,500" },
    ],
  },
  {
    name: "Specialist Services",
    priceFrom: "R450",
    description: "Protection, certification, and specialist fabric care.",
    popular: true,
    items: [
      { label: "Master Guarding (stain protection)", price: "from R450", note: "per item" },
      { label: "Fire proofing (commercial)", price: "from R1,200", note: "SANS certified" },
      { label: "Persian / Oriental rug cleaning", price: "from R900" },
      { label: "Velvet / silk specialist clean", price: "from R1,100" },
      { label: "Hotel / commercial (per room)", price: "from R650", note: "volume discounts" },
    ],
  },
];

export const pricingFaqs = [
  { q: "Is there a call-out fee?", a: "No. Our on-site assessment is completely free with no obligation. You only pay if you proceed with the clean." },
  { q: "Are your quotes all-inclusive?", a: "Yes. The price you're quoted includes labour, equipment, pre-treatment, and stain removal — no hidden extras." },
  { q: "Do you offer payment terms?", a: "Residential clients pay on completion. Commercial clients can apply for 30-day terms on a contract basis." },
  { q: "Do you offer volume discounts?", a: "Yes. Hotels, offices, and multi-room residential jobs receive discounted per-unit pricing. Request a commercial quote." },
  { q: "What payment methods do you accept?", a: "EFT, card, and cash. Commercial accounts are invoiced." },
  { q: "Is there a minimum charge?", a: "Yes, R450 minimum per visit to cover technician dispatch. This is applied as credit toward your cleaning total." },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
export function getSector(slug: string) {
  return sectors.find((s) => s.slug === slug);
}
