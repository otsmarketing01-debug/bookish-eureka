import { db } from "@/lib/db";

export type CustomerReview = {
  id: string;
  name: string;
  area: string | null;
  service: string;
  rating: number;
  title: string;
  body: string;
  createdAt: Date;
};

export async function getApprovedReviews(limit = 12): Promise<CustomerReview[]> {
  const reviews = await db.review.findMany({
    where: { status: "approved" },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return reviews.map((r) => ({
    id: r.id,
    name: r.name,
    area: r.area,
    service: r.service,
    rating: r.rating,
    title: r.title,
    body: r.body,
    createdAt: r.createdAt,
  }));
}

/** Get approved reviews for a specific service (by exact service name match). */
export async function getApprovedReviewsByService(serviceName: string, limit = 10): Promise<CustomerReview[]> {
  const reviews = await db.review.findMany({
    where: { status: "approved", service: serviceName },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return reviews.map((r) => ({
    id: r.id,
    name: r.name,
    area: r.area,
    service: r.service,
    rating: r.rating,
    title: r.title,
    body: r.body,
    createdAt: r.createdAt,
  }));
}
