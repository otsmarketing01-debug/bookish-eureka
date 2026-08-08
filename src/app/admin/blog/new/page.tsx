import { BlogEditor } from "@/components/admin/blog-editor";

export default function NewBlogPostPage() {
  return (
    <BlogEditor
      initial={{
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "Guides",
        tags: "",
        author: "JHB Curtain Cleaning",
        readingTime: 0,
        published: false,
        featured: false,
      }}
    />
  );
}
