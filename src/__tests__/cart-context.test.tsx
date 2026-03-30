import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct = {
  id: "1",
  name: "Ethiopia Yirgacheffe",
  price: 18.99,
  image: "/coffee.jpg",
};

describe("CartContext", () => {
  it("starts with an empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("adds an item to the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe("Ethiopia Yirgacheffe");
    expect(result.current.items[0].quantity).toBe(1);
  });

  it("increments quantity when adding the same item twice", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.addItem(mockProduct));

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it("removes an item from the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.removeItem("1"));

    expect(result.current.items).toHaveLength(0);
  });

  it("updates quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.updateQuantity("1", 5));

    expect(result.current.items[0].quantity).toBe(5);
  });

  it("removes item when quantity is set to 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.updateQuantity("1", 0));

    expect(result.current.items).toHaveLength(0);
  });

  it("calculates total price correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.addItem({ ...mockProduct, id: "2", name: "Decaf", price: 15.0 }));

    expect(result.current.totalPrice).toBeCloseTo(33.99);
    expect(result.current.totalItems).toBe(2);
  });

  it("clears the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.clearCart());

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalPrice).toBe(0);
  });
});
