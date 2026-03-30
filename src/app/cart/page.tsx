"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-32 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
          <span className="text-3xl">&#9749;</span>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Your cart is empty
        </h1>
        <p className="mt-3 text-zinc-500">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/products"
          className="mt-8 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
      <p className="mt-1 text-sm text-zinc-500">
        {totalItems} {totalItems === 1 ? "item" : "items"}
      </p>

      <div className="mt-10 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-100 p-5"
          >
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="mt-0.5 text-sm text-zinc-500">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <p className="text-lg font-semibold sm:text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-sm transition-colors hover:bg-zinc-100"
                >
                  &minus;
                </button>
                <span className="w-6 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-sm transition-colors hover:bg-zinc-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-zinc-400 transition-colors hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 rounded-2xl bg-zinc-50 p-6">
        <div className="flex items-center justify-between">
          <p className="text-zinc-600">Subtotal</p>
          <p className="font-medium">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-zinc-600">Shipping</p>
          <p className="font-medium">Free</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block w-full rounded-full bg-black py-3 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}
