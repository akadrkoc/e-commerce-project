import { notFound } from "next/navigation";
import Image from "next/image";
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
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

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
