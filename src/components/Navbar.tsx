import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Coffee Lab
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm text-zinc-600 transition-colors hover:text-black"
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className="text-sm text-zinc-600 transition-colors hover:text-black"
          >
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}
