import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = checkoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { items, shipping } = result.data;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: shipping.email,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      metadata: {
        customerName: shipping.name,
        address: shipping.address,
        city: shipping.city,
        postalCode: shipping.postalCode,
        country: shipping.country,
      },
      success_url: `${request.headers.get("origin")}/checkout/success`,
      cancel_url: `${request.headers.get("origin")}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
