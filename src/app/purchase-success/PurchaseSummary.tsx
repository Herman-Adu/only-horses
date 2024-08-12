"use client";

import UnderlinedText from "@/components/decorators/UnderlinedText";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ZoomedImage from "@/components/ZoomedImage";
import Link from "next/link";

const PurchaseSummary = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <ZoomedImage
          imgSrc="/tshirts/4.png"
          className="h-96 w-96 rounded-md my-5"
        />

        <h1 className="text-2xl font-bold mb-4">
          Purchase <UnderlinedText>Successful!</UnderlinedText>
          🎉
        </h1>

        <p className="text-center text-md mb-6">
          Your order is being processed and you will receive a confirmation
          email shortly. If you don't receive an email within 24 hours, please
          contact us with your order ID.
        </p>

        <p className="text-muted-foreground">
          Order ID:{" "}
          <span className="font-bold text-foreground text-sky-400">1234</span>
        </p>

        <Card className="w-full my-5">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p>Only Horses T-shirt</p>
              <p>£11.99</p>
            </div>

            <div className="flex justify-between">
              <p>Size: Small</p>
              <p>Quantity: 1</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Shipping Address</h3>
              <p>Address: Some Address</p>
              <p>City: Some Address</p>
              <p>State: </p>
              <p>Postal Code: SL6 0QF</p>
              <p>Country: UK</p>
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-md mb-6 text-muted-foreground text-lg">
          Thanks for trusting us with your purchase!
        </p>

        <div className="flex justify-center">
          <Link href={"/merch"} className={buttonVariants()}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSummary;
