"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-32 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <span className="text-3xl">&#10003;</span>
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        Order confirmed!
      </h1>
      <p className="mt-3 text-zinc-500">
        Thank you for your purchase. Your coffee is on its way.
      </p>
      <Link
        href="/products"
        className="mt-8 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Continue Shopping
      </Link>
    </section>
  );
}
