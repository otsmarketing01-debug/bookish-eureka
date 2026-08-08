import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { blogSeed } from "@/lib/blog-seed-content";

async function main() {
  console.log("Seeding JHB Curtain Cleaning database...");

  // 1. Admin user
  const adminEmail = "admin@jhbcurtaincleaning.co.za";
  const existing = await db.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    await db.user.create({
      data: {
        email: adminEmail,
        name: "Site Admin",
        password: hashPassword("admin12345"),
        role: "admin",
      },
    });
    console.log("✓ Created admin user:", adminEmail, "(password: admin12345)");
  } else {
    console.log("• Admin user already exists");
  }

  // 2. Blog posts
  for (const post of blogSeed) {
    const found = await db.blogPost.findUnique({ where: { slug: post.slug } });
    if (found) {
      await db.blogPost.update({ where: { slug: post.slug }, data: post });
      console.log("↻ Updated post:", post.slug);
    } else {
      await db.blogPost.create({ data: post });
      console.log("✓ Created post:", post.slug);
    }
  }

  // 3. Sample lead
  const leadCount = await db.contactSubmission.count();
  if (leadCount === 0) {
    await db.contactSubmission.create({
      data: {
        name: "Sarah Williams",
        email: "sarah@example.co.za",
        phone: "+27 82 555 1234",
        service: "Curtain & Blind Cleaning",
        area: "Sandton",
        message:
          "I have heavy lined drapes in my lounge and two bedrooms that need cleaning. Can you give me an estimate? They haven't been cleaned in about 2 years.",
      },
    });
    console.log("✓ Created sample lead");
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
