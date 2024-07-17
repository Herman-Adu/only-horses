"use server";

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function checkAuthStatus() {
  // destructure getUser from kinde server session
  const { getUser } = getKindeServerSession();

  // await the getUser function to get a user
  const user = await getUser();

  // check if we got a user
  if (!user) return { success: false };

  // find user with matching ids in the database and in kinde auth
  const existingUser = await prisma.user.findUnique({ where: { id: user.id } });

  // No existing user - sign up and create user in the database
  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.given_name + " " + user.family_name,
        image: user.picture,
      },
    });
  }

  return { success: true };
}
