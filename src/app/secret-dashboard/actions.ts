"use server";

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

  // get all products from database
  const products = await prisma.product.findMany();

  //  return products
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
  // check if admin
  const admin = await checkIfAdmin();

  // Only admin can add products to the database
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

async function checkIfAdmin() {
  // de=structure getUser function from kinde auth
  const { getUser } = getKindeServerSession();

  // get the user by await  getUser() function
  const user = await getUser();

  // check if user sending the request is admin
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  // if there is no yser or user is not admin return false
  if (!user || !isAdmin) return false;

  // we have an admin user
  return user;
}
