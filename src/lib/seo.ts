import { siteConfig } from "@/lib/config";

// JSON-LD schema generators for SEO (addresses the "0/100 schema markup" gap)
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
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
      { "@type": "City", name: "Pretoria" },
      { "@type": "City", name: "Midrand" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating.value,
      reviewCount: String(siteConfig.rating.count),
    },
    sameAs: siteConfig.social.map((s) => s.href),
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
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
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
