import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({ take: 3 });

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight sm:text-6xl">
          Good coffee,
          <br />
          no compromise.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-zinc-500">
          We source small-batch beans from farms we trust and roast them
          fresh every week. Simple as that.
        </p>
        <Link
          href="/products"
          className="mt-10 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-black"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </>
  );
}
