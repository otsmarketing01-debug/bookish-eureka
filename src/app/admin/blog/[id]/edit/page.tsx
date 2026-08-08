import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BlogEditor } from "@/components/admin/blog-editor";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <BlogEditor
      initial={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? "",
        category: post.category,
        tags: post.tags,
        author: post.author,
        readingTime: post.readingTime,
        published: post.published,
        featured: post.featured,
      }}
    />
  );
}
