"use server";

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// like, comment, delete, get all posts

export async function getPostsAction() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  // include the comments and like in the query.
  const posts = await prisma.post.findMany({
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      likesList: { where: { userId: user.id } },
    },
  });

  return posts;
}
