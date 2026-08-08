import { db } from "@/lib/db";

export type GalleryItem = {
  id: string;
  title: string;
  location: string;
  service: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
};

export async function getPublishedGallery(): Promise<GalleryItem[]> {
  const items = await db.galleryShowcase.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return items.map((i) => ({ ...i }));
}
