"use server";

import prisma from "@/db/prisma";
import { centsToDollars } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { promises } from "dns";

// post content types
type PostArgs = {
  text: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  isPublic: boolean;
};

export async function createPostAction({
  isPublic,
  mediaUrl,
  mediaType,
  text,
}: PostArgs) {
  // check if admin
  const admin = await checkIfAdmin();

  //Not admin user - Only admin can create posts
  if (!admin) {
    throw new Error("Unauthorised");
  }

  // mimic an error for testing purposes - media is required
  //   if (!mediaUrl) {
  //     throw new Error("Media URL is required");
  //   }

  // Admin user - create new post
  const newPost = await prisma.post.create({
    data: {
      text,
      mediaUrl,
      mediaType,
      isPublic,
      userId: admin.id,
    },
  });

  // handle this logic in the form submit in the content tab
  return { success: true, post: newPost };
}

export async function getAllProductsAction() {
  const admin = await checkIfAdmin();

  if (!admin) {
    throw new Error("Unauthorised");
  }

  const products = await prisma.product.findMany();

  return products;
}

type ProductArgs = {
  name: string;
  image: string;
  price: string;
};

export async function addNewProductToStoreAction({
  name,
  image,
  price,
}: ProductArgs) {
  const admin = await checkIfAdmin();

  if (!admin) {
    throw new Error("Unauthorised");
  }

  // check we have all the data needed to add a new product
  if (!name || !image || !price) {
    throw new Error("Please provide all the required fields");
  }

  // get price in cents
  const priceInCents = Math.round(parseFloat(price) * 100);

  // checkk if price is a number
  if (isNaN(priceInCents)) {
    throw new Error("Price must be a number");
  }

  // create the new product in datsbase
  const newProduct = await prisma.product.create({
    data: {
      image,
      price: priceInCents,
      name,
    },
  });

  // handle this logic in the add new product form
  return { success: true, product: newProduct };
}

export async function toggleProductArchiveAction(productId: string) {
  const isAdmin = await checkIfAdmin();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  // find the product to toogle
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw new Error("Product not found");
  }

  // update isArchived field on product
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      isArchived: !product.isArchived,
    },
  });

  // // handle this logic in the product card archive button
  return { success: true, product: updatedProduct };
}

export async function getDashboardDataAction() {
  // First created all your promises

  // Aggregate total revenue data
  const totalRevenuePromise = Promise.all([
    prisma.order.aggregate({
      _sum: {
        price: true,
      },
    }),
    prisma.subscription.aggregate({
      _sum: {
        price: true,
      },
    }),
  ]);

  // Get the total number of sales and subscriptions in promises
  const totalSalesPromise = prisma.order.count();
  const totalSubscriptionsPromise = prisma.subscription.count();

  // aggregate recent sales data in a promise
  const recentSalesPromise = prisma.order.findMany({
    take: 4,
    orderBy: {
      orderDate: "desc",
    },
    select: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      price: true,
      orderDate: true,
    },
  });

  // aggregate recent subscriptions data in a promise
  const recentSubscriptionsPromise = prisma.subscription.findMany({
    take: 4,
    orderBy: {
      startDate: "desc",
    },
    select: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      price: true,
      startDate: true,
    },
  });

  // run all promises in parallel so that they don't block each other
  const [
    totalRevenueResult,
    totalSales,
    totalSubscriptions,
    recentSales,
    recentSubscriptions,
  ] = await Promise.all([
    totalRevenuePromise,
    totalSalesPromise,
    totalSubscriptionsPromise,
    recentSalesPromise,
    recentSubscriptionsPromise,
  ]);

  // total up the orders and subscriptions promises
  const totalRevenue =
    (totalRevenueResult[0]._sum.price || 0) +
    (totalRevenueResult[1]._sum.price || 0);

  // return result of all the promises so we can consume it
  return {
    totalRevenue: centsToDollars(totalRevenue),
    totalSales,
    totalSubscriptions,
    recentSales,
    recentSubscriptions,
  };
}

// utility function
async function checkIfAdmin() {
  // de=structure getUser function from kinde auth
  const { getUser } = getKindeServerSession();

  // get the user by await  getUser() function
  const user = await getUser();

  // check if user sending the request is admin
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  // if there is no user or user is not admin return false
  if (!user || !isAdmin) return false;

  // we have an admin user
  return user;
}
