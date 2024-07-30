"use server";

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// like, comment, delete, get all posts

// get all posts action
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

// like post action
export async function likePostAction(postId: string) {
  // destructure getUser from kinde server session
  const { getUser } = getKindeServerSession();
  // get the user
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // get the useer profile
  const userProfile = await prisma.user.findUnique({ where: { id: user.id } });
  // check if the user is subscribed
  if (!userProfile?.isSubscribed) return;

  // find the post and likes for the user
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { likes: true, likesList: { where: { userId: user.id } } },
  });

  if (!post) throw new Error("Post not found");

  // update likesList
  let newLikes: number;
  if (post.likesList.length > 0) {
    newLikes = Math.max(post.likes - 1, 0);
    // find likes we are currently deleting
    await prisma.like.deleteMany({
      where: { postId: postId, userId: user.id },
    });
  } else {
    newLikes = post.likes + 1;

    // add new likes
    await prisma.like.create({
      data: { postId: postId, userId: user.id },
    });
  }

  // update the post with new number of likes
  await prisma.post.update({
    where: { id: postId },
    data: { likes: newLikes },
  });

  return { success: true };
}

// comment post action
export async function commentOnPostAction(postId: string, text: string) {
  // destructure getUser from get kinde server session
  const { getUser } = getKindeServerSession();

  // get the user from the getUser()
  const user = await getUser();

  // check for a user as could be null, to maake typescript happy
  if (!user) {
    throw new Error("Unauthorized");
  }

  // get the useer profile
  const userProfile = await prisma.user.findUnique({ where: { id: user.id } });

  // check if the user is subscribed
  if (!userProfile?.isSubscribed) return;

  // if the user is subscribed create new comment
  const comment = await prisma.comment.create({
    data: {
      text,
      postId,
      userId: user.id,
    },
  });

  return { success: true };
}
