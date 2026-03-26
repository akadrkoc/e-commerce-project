import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Ethiopia Yirgacheffe",
    description:
      "Bright and fruity with notes of blueberry, lemon, and dark chocolate. A classic single-origin from the birthplace of coffee.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=80",
    category: "Single Origin",
  },
  {
    name: "Colombia Supremo",
    description:
      "Smooth and balanced with caramel sweetness, nutty undertones, and a clean finish. Perfect for everyday brewing.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    category: "Single Origin",
  },
  {
    name: "House Blend",
    description:
      "Our signature blend combining Brazilian and Central American beans. Rich body with chocolate and toasted almond notes.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&q=80",
    category: "Blend",
  },
  {
    name: "Espresso Roast",
    description:
      "Dark and bold with a velvety crema. Notes of dark chocolate, brown sugar, and a smoky finish. Ideal for espresso drinks.",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80",
    category: "Blend",
  },
  {
    name: "Kenya AA",
    description:
      "Complex and wine-like with bright acidity. Blackcurrant, grapefruit, and a syrupy sweetness make this a standout cup.",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
    category: "Single Origin",
  },
  {
    name: "Decaf Swiss Water",
    description:
      "All the flavor, none of the caffeine. Chemically-free decaf process preserving chocolate and hazelnut notes.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    category: "Decaf",
  },
];

async function main() {
  console.log("Seeding products...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: product,
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
