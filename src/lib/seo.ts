import { siteConfig } from "@/lib/config";

// JSON-LD schema generators for SEO (addresses the "0/100 schema markup" gap)
export function localBusinessSchema() {
  const allLinks = [
    ...siteConfig.social.map((s) => s.href),
    ...siteConfig.citations.map((c) => c.href),
  ];
  return {
    "@context": "https://schema.org",
    "@type": ["DryCleaningOrLaundry", "LocalBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/hero-curtains.jpg`,
    logo: `${siteConfig.url}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.title,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    priceRange: siteConfig.priceRange,
    areaServed: [
      { "@type": "City", name: "Johannesburg" },
      { "@type": "AdministrativeArea", name: "Sandton" },
      { "@type": "AdministrativeArea", name: "Fourways" },
      { "@type": "AdministrativeArea", name: "Bryanston" },
      { "@type": "AdministrativeArea", name: "Morningside" },
      { "@type": "AdministrativeArea", name: "Midrand" },
      { "@type": "AdministrativeArea", name: "Pretoria" },
      { "@type": "AdministrativeArea", name: "Roodepoort" },
      { "@type": "AdministrativeArea", name: "Edenvale" },
      { "@type": "AdministrativeArea", name: "Alberton" },
      { "@type": "AdministrativeArea", name: "Rosebank" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating.value,
      reviewCount: String(siteConfig.rating.count),
    },
    sameAs: allLinks,
  };
}

/**
 * Unified @graph schema graph — combines all entity types into a single
 * JSON-LD block per the audit deliverable. Includes:
 * - DryCleaningOrLaundry + LocalBusiness (organization)
 * - Service with OfferCatalog (tiered pricing)
 * - FAQPage (AEO-targeted Q&As)
 * Uses @id references for entity linking.
 */
export function schemaGraph(faqs?: { q: string; a: string }[]) {
  const orgId = `${siteConfig.url}/#organization`;
  const allLinks = [
    ...siteConfig.social.map((s) => s.href),
    ...siteConfig.citations.map((c) => c.href),
  ];

  const graph: any[] = [
    // Organization / LocalBusiness
    {
      "@type": ["DryCleaningOrLaundry", "LocalBusiness"],
      "@id": orgId,
      name: siteConfig.name,
      legalName: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
      image: `${siteConfig.url}/hero-curtains.jpg`,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      priceRange: "R800 - R5500",
      founder: {
        "@type": "Person",
        name: siteConfig.founder.name,
        jobTitle: siteConfig.founder.title,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: parseFloat(siteConfig.geo.latitude),
        longitude: parseFloat(siteConfig.geo.longitude),
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "08:00",
          closes: "14:00",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Johannesburg" },
        { "@type": "AdministrativeArea", name: "Sandton" },
        { "@type": "AdministrativeArea", name: "Fourways" },
        { "@type": "AdministrativeArea", name: "Bryanston" },
        { "@type": "AdministrativeArea", name: "Morningside" },
        { "@type": "AdministrativeArea", name: "Midrand" },
        { "@type": "AdministrativeArea", name: "Pretoria" },
        { "@type": "AdministrativeArea", name: "Roodepoort" },
        { "@type": "AdministrativeArea", name: "Edenvale" },
        { "@type": "AdministrativeArea", name: "Alberton" },
        { "@type": "AdministrativeArea", name: "Rosebank" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: siteConfig.rating.value,
        reviewCount: String(siteConfig.rating.count),
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: allLinks,
    },
    // Service with OfferCatalog (tiered pricing)
    {
      "@type": "Service",
      "@id": `${siteConfig.url}/#service-curtain-cleaning`,
      serviceType: "On-Site Mobile Curtain & Blind Dry Cleaning",
      provider: { "@id": orgId },
      areaServed: { "@type": "City", name: "Johannesburg" },
      description: "Professional solvent-based on-site curtain and blind dry cleaning executed directly on the rail without removal or shrinkage risk across Greater Johannesburg.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "On-Site Curtain Cleaning Tiered Rates",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Small Property Curtain Cleaning (1-2 Rooms)" },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "800.00",
              priceCurrency: "ZAR",
              valueAddedTaxIncluded: true,
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Medium Property Curtain Cleaning (3-4 Rooms)" },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "1500.00",
              priceCurrency: "ZAR",
              valueAddedTaxIncluded: true,
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Large Property Curtain Cleaning (5+ Rooms)" },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "3000.00",
              priceCurrency: "ZAR",
              valueAddedTaxIncluded: true,
            },
          },
        ],
      },
    },
  ];

  // Add FAQPage if FAQs provided
  if (faqs && faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function serviceSchema(name: string, description: string, priceFrom: string, offers: { name: string; price: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    provider: { "@type": "LocalBusiness", name: siteConfig.name },
    description,
    areaServed: { "@type": "City", name: "Johannesburg" },
    offers: {
      "@type": "Offer",
      price: priceFrom.replace(/[^0-9]/g, ""),
      priceCurrency: "ZAR",
      description: `Starting price from ${priceFrom}`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      itemListElement: offers.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.name },
        price: o.price.replace(/[^0-9]/g, ""),
        priceCurrency: "ZAR",
      })),
    },
  };
}

/**
 * Service schema with AggregateRating and embedded reviews.
 * If there are service-specific reviews, uses those; otherwise falls back
 * to the site-wide aggregate rating.
 */
export function serviceWithReviewsSchema(
  service: { name: string; description: string; priceFrom: string; offers: { name: string; price: string }[] },
  reviews: { name: string; rating: number; title: string; body: string; service: string; createdAt: string | Date }[]
) {
  const base = serviceSchema(service.name, service.description, service.priceFrom, service.offers);
  const provider = base.provider as { "@type": string; name: string };

  if (reviews.length > 0) {
    // Build aggregate from service-specific reviews
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    return {
      ...base,
      provider: {
        ...provider,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avg.toFixed(1),
          reviewCount: String(reviews.length),
          bestRating: "5",
          worstRating: "1",
        },
      },
      review: reviews.slice(0, 10).map((r) => ({
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(r.rating),
          bestRating: "5",
          worstRating: "1",
        },
        author: { "@type": "Person", name: r.name },
        datePublished: new Date(r.createdAt).toISOString(),
        name: r.title,
        reviewBody: r.body,
      })),
    };
  }

  // No service-specific reviews — use site-wide aggregate rating on the provider
  return {
    ...base,
    provider: {
      ...provider,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: siteConfig.rating.value,
        reviewCount: String(siteConfig.rating.count),
        bestRating: "5",
        worstRating: "1",
      },
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Professional On-Site Curtain Cleaning",
    description:
      "Four simple steps to perfectly clean curtains — without taking them down.",
    step: [
      { "@type": "HowToStep", position: 1, name: "Free Assessment", text: "A certified technician inspects fabric type, soiling levels, and provides a no-obligation quote." },
      { "@type": "HowToStep", position: 2, name: "Pre-Treatment", text: "Spot-treat stains, test fabric colourfastness, and apply fibre-specific pre-conditioning agents." },
      { "@type": "HowToStep", position: 3, name: "Deep Clean", text: "On-site dry-cleaning extraction removes dust, allergens, and odours without water." },
      { "@type": "HowToStep", position: 4, name: "Protect & Finish", text: "Optional Master Guarding protection, rehanging, and steam-press finishing." },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(post: { title: string; excerpt: string; slug: string; publishedAt: string | Date; author: string; coverImage?: string | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.publishedAt).toISOString(),
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    ...(post.coverImage ? { image: post.coverImage } : {}),
  };
}

type ReviewItem = {
  name: string;
  rating: number;
  title: string;
  body: string;
  service: string;
  createdAt: string | Date;
};

/**
 * Generates schema.org Review JSON-LD for a single customer review.
 * Used on the testimonials page for rich search-result snippets.
 */
export function reviewSchema(review: ReviewItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Service",
      name: review.service,
      provider: { "@type": "LocalBusiness", name: siteConfig.name },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(review.rating),
      bestRating: "5",
      worstRating: "1",
    },
    author: { "@type": "Person", name: review.name },
    datePublished: new Date(review.createdAt).toISOString(),
    name: review.title,
    reviewBody: review.body,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

/**
 * Generates an AggregateRating + review batch for a LocalBusiness.
 * Combines the site's overall rating with individual customer reviews.
 */
export function aggregateReviewSchema(reviews: ReviewItem[]) {
  const reviewCount = siteConfig.rating.count + reviews.length;
  const allRatings = [...reviews.map((r) => r.rating)];
  const avgFromReviews = allRatings.length > 0
    ? allRatings.reduce((a, b) => a + b, 0) / allRatings.length
    : parseFloat(siteConfig.rating.value);
  // Weighted: blend the site rating with customer review average
  const ratingValue = reviews.length > 0
    ? ((parseFloat(siteConfig.rating.value) * siteConfig.rating.count) + (avgFromReviews * reviews.length)) / reviewCount
    : parseFloat(siteConfig.rating.value);

  return {
    ...localBusinessSchema(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      reviewCount: String(reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
        worstRating: "1",
      },
      author: { "@type": "Person", name: r.name },
      datePublished: new Date(r.createdAt).toISOString(),
      name: r.title,
      reviewBody: r.body,
    })),
  };
}
