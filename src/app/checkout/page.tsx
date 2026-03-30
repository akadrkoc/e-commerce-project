"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ShippingInfo {
  email: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const initialShipping: ShippingInfo = {
  email: "",
  name: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState<ShippingInfo>(initialShipping);

  function updateField(field: keyof ShippingInfo, value: string) {
    setShipping((prev) => ({ ...prev, [field]: value }));
  }

  const isFormValid =
    shipping.email &&
    shipping.name &&
    shipping.address &&
    shipping.city &&
    shipping.postalCode &&
    shipping.country;

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shipping }),
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
        <h1 className="text-3xl font-bold tracking-tight">
          Nothing to checkout
        </h1>
        <p className="mt-3 text-zinc-500">
          Add some items to your cart first.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>

      <form onSubmit={handleCheckout} className="mt-10 grid gap-10 md:grid-cols-2">
        {/* Shipping Info */}
        <div>
          <h2 className="text-lg font-semibold">Shipping Information</h2>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-zinc-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={shipping.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-black"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm text-zinc-600">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={shipping.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-black"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm text-zinc-600">
                Address
              </label>
              <input
                id="address"
                type="text"
                required
                value={shipping.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-black"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm text-zinc-600">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  value={shipping.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-black"
                  placeholder="Istanbul"
                />
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm text-zinc-600"
                >
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  type="text"
                  required
                  value={shipping.postalCode}
                  onChange={(e) => updateField("postalCode", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-black"
                  placeholder="34000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm text-zinc-600">
                Country
              </label>
              <input
                id="country"
                type="text"
                required
                value={shipping.country}
                onChange={(e) => updateField("country", e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-black"
                placeholder="Turkey"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="mt-6 rounded-2xl bg-zinc-50 p-6">
            <div className="space-y-3">
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

            <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="mt-6 w-full rounded-full bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? "Redirecting to Stripe..." : "Pay with Stripe"}
            </button>

            <p className="mt-4 text-center text-xs text-zinc-400">
              Test mode — no real charges will be made.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
