import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({ take: 3 });

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight sm:text-6xl">
          Coffee, crafted
          <br />
          for you.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-zinc-500">
          Discover single-origin beans and signature blends, roasted to
          perfection and delivered to your door.
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
        <h2 className="text-2xl font-bold tracking-tight">
          Featured Products
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group rounded-2xl border border-zinc-100 p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50"
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-100" />
              <h3 className="mt-4 font-medium group-hover:underline">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-500">{product.category}</p>
              <p className="mt-2 font-semibold">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
