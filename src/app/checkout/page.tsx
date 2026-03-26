"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-32 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Nothing to checkout</h1>
        <p className="mt-3 text-zinc-500">Add some items to your cart first.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>

      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-zinc-600">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between border-t border-zinc-200 pt-6">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-8 w-full rounded-full bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
      >
        {loading ? "Redirecting to Stripe..." : "Pay with Stripe"}
      </button>

      <p className="mt-4 text-center text-xs text-zinc-400">
        Test mode — no real charges will be made.
      </p>
    </section>
  );
}
