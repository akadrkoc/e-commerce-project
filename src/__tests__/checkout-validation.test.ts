import { describe, it, expect } from "vitest";
import { z } from "zod";

const cartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  price: z.number().positive().max(10000),
  quantity: z.number().int().positive().max(99),
});

const shippingSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  address: z.string().min(1).max(300),
  city: z.string().min(1).max(100),
  postalCode: z.string().min(1).max(20),
  country: z.string().min(1).max(100),
});

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(50),
  shipping: shippingSchema,
});

describe("Checkout validation", () => {
  const validPayload = {
    items: [{ id: "1", name: "Ethiopia Yirgacheffe", price: 18.99, quantity: 2 }],
    shipping: {
      email: "test@example.com",
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      postalCode: "10001",
      country: "United States",
    },
  };

  it("accepts valid checkout data", () => {
    const result = checkoutSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects empty cart", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, items: [] });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = checkoutSchema.safeParse({
      ...validPayload,
      shipping: { ...validPayload.shipping, email: "not-an-email" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative price", () => {
    const result = checkoutSchema.safeParse({
      ...validPayload,
      items: [{ id: "1", name: "Coffee", price: -5, quantity: 1 }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects quantity over 99", () => {
    const result = checkoutSchema.safeParse({
      ...validPayload,
      items: [{ id: "1", name: "Coffee", price: 10, quantity: 100 }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing shipping fields", () => {
    const result = checkoutSchema.safeParse({
      items: validPayload.items,
      shipping: { email: "test@example.com" },
    });
    expect(result.success).toBe(false);
  });
});
