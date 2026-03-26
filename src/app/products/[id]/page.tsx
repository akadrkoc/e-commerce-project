import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Image placeholder */}
        <div className="aspect-square w-full rounded-2xl bg-zinc-100" />

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-zinc-400">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-zinc-500">{product.description}</p>
          <p className="mt-6 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          <AddToCartButton
            id={product.id}
            name={product.name}
            price={product.price}
          />
        </div>
      </div>
    </section>
  );
}
