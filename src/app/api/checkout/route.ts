import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ShippingInfo {
  email: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export async function POST(request: Request) {
  try {
    const { items, shipping } = (await request.json()) as {
      items: CartItem[];
      shipping: ShippingInfo;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

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
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
