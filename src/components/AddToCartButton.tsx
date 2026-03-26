"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface Props {
  id: string;
  name: string;
  price: number;
}

export default function AddToCartButton({ id, name, price }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({ id, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className="mt-8 w-full rounded-full bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 md:w-auto md:px-12"
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
