import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
}

export default function ProductCard({ id, name, price, category }: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group rounded-2xl border border-zinc-100 p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50"
    >
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-100" />
      <h3 className="mt-4 font-medium group-hover:underline">{name}</h3>
      <p className="mt-1 text-sm text-zinc-500">{category}</p>
      <p className="mt-2 font-semibold">${price.toFixed(2)}</p>
    </Link>
  );
}
