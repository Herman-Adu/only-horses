"use server";

import prisma from "@/db/prisma";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function createCheckoutSessionAction({
  productId,
  size,
}: {
  productId: string;
  size: string;
}) {
  // Get the user via the getUser() from the kinde server session
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user)
    throw new Error(
      "Unauthorized - you must be logged in to purchase products"
    );

  // Get the product from the database if one exist
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) throw new Error("Product not found");

  // Create an order for this purchase
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      productId: product.id,
      price: product.price,
      size,
    },
  });

  // it's gonna prefill the email for the user
  const customer = await stripe.customers.create({
    email: user.email!,
  });

  // create stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      orderId: order.id, //we are sending this order ID so that we can uh update it once we got the webhook
      size,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/merch/${product.id}`,
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },
    customer: customer.id,

    // expires at 30 minutes(min value is 30 minutes)
    expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
  });

  // push the user to this page after checkout
  return { url: session.url };
}
