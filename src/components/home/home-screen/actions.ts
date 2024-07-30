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

// delete post action
export async function deletePostAction(postId: string) {
  const { getUser } = getKindeServerSession();
  // get the user
  const user = await getUser();

  // find ther post
  const post = await prisma.post.findUnique({ where: { id: postId } });

  // check if admin user
  if (post?.userId !== user?.id) throw new Error("Only admin can delete posts");

  // delete the post
  await prisma.post.delete({ where: { id: postId } });

  return { success: true };
}
