"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Coffeein
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
            className="relative text-sm text-zinc-600 transition-colors hover:text-black"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-4 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
