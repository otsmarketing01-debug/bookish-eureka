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
  email: "info@jhbcurtaincleaning.co.za",
  address: {
    street: "10 2nd Ave, Florida",
    locality: "Roodepoort",
    region: "Gauteng",
    postalCode: "1710",
    country: "ZA",
  },
  geo: { latitude: "-26.1757", longitude: "27.9225" },
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
  },
];

export type AreaItem = { slug: string; region: string; suburb: string; painPoint: string };
export const areas: AreaItem[] = [
  { slug: "jhb-north", region: "JHB North", suburb: "Sandton", painPoint: "High pollen counts in leafy suburbs aggravate allergies — we remove trapped allergens from curtains." },
  { slug: "jhb-east", region: "JHB East", suburb: "Edenvale", painPoint: "Dust from open veld and construction settles into hanging fabrics — our extraction removes it." },
  { slug: "jhb-south", region: "JHB South", suburb: "Alberton", painPoint: "Industrial proximity means soot and grime — we restore curtain brightness on-site." },
  { slug: "jhb-west", region: "JHB West", suburb: "Roodepoort", painPoint: "Mining belt dust coats curtains — our dry extraction lifts fine particulates safely." },
  { slug: "jhb-central", region: "JHB Central", suburb: "Rosebank", painPoint: "Urban pollution and traffic soot darken drapes — we clean without removal." },
  { slug: "pretoria-midrand", region: "Pretoria / Midrand", suburb: "Pretoria", painPoint: "Highveld dust and seasonal winds fill curtains with grit — on-site cleaning solves it." },
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
