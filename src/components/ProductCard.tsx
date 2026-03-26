import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductCard({ id, name, price, category, image }: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group rounded-2xl border border-zinc-100 p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h3 className="mt-4 font-medium group-hover:underline">{name}</h3>
      <p className="mt-1 text-sm text-zinc-500">{category}</p>
      <p className="mt-2 font-semibold">${price.toFixed(2)}</p>
    </Link>
  );
}
