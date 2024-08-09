import prisma from "@/db/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const webhookSecret =
  process.env.NODE_ENV === "development"
    ? process.env.STRIPE_WEBHOOK_SECRET_DEV_KEY!
    : process.env.STRIPE_WEBHOOK_SECRET_LIVE_KEY!;

export async function POST(req: Request) {
  // get the body
  const body = await req.text();

  // get the header so you can do a check against the stripe signature
  const signature = headers().get("stripe-signature");

  // Check signature, if no signature
  if (!signature) {
    return new Response("Invalid signature", { status: 400 });
  }

  // keep track of the event
  let event;

  // verify the event by using the secret
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const data = event.data;
  const eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // get the session the user just created
        const session = await stripe.checkout.sessions.retrieve(
          (data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items", "customer_details"],
          }
        );

        const customerId = session.customer as string;
        const customerDetails =
          session.customer_details as Stripe.Checkout.Session.CustomerDetails;
        const lineItems = session.line_items?.data || [];

        // check if we got the email of the customer
        if (customerDetails.email) {
          // find user email in the database
          const user = await prisma.user.findUnique({
            where: { email: customerDetails.email },
          });

          // if no user throw error
          if (!user) throw new Error("User not found");

          // when we want to delete the user's subscription.
          if (!user.customerId) {
            await prisma.user.update({
              where: { id: user.id },
              data: { customerId },
            });
          }

          for (const item of lineItems) {
            // get the priceId
            const priceId = item.price?.id;

            // check if subscription  or 1 time payment
            const isSubscription = item.price?.type === "recurring";

            // if recurring, it means its a subscritpion
            if (isSubscription) {
              // get current data
              let endDate = new Date();

              // check if price id is yearly or monthly
              if (priceId === process.env.STRIPE_YEARLY_PLAN_PRICE_ID) {
                endDate.setFullYear(endDate.getFullYear() + 1); // +1 year from now
              } else if (priceId === process.env.STRIPE_MONTHLY_PLAN_PRICE_ID) {
                endDate.setMonth(endDate.getMonth() + 1); // +1 month from now
              } else {
                throw new Error("Invalid price id");
              }

              // The upsert operation in Prisma is a combination of update and insert. It allows you to update an existing record if it exists or create a new one if it doesn't.
              // update or create  a subscription
              const subscription = await prisma.subscription.upsert({
                where: { userId: user.id },
                update: {
                  planId: priceId,
                  startDate: new Date(),
                  endDate: endDate,
                  price: item.amount_total || 0,
                },
                create: {
                  userId: user.id,
                  planId: priceId!,
                  price: item.amount_total || 0,
                  startDate: new Date(),
                  endDate: endDate,
                },
              });

              // update the isSubscribed field in the user table to show the user has a subscription
              await prisma.user.update({
                where: { id: user.id },
                data: { isSubscribed: true },
              });

              //
            } else {
              // Todo => Handle // one time payment, for our t-shirts or donations
            }
          }
        }
      }
    }

    return NextResponse.json({});

    //
  } catch (error) {}
}