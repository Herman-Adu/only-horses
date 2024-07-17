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
  // de-structure getUser() function from kinde server session
  const { getUser } = getKindeServerSession();

  // await  getUser() function to pull down the user
  const user = await getUser();

  // check if user sending the request is admin
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  // if not throw error
  if (!user || !isAdmin) {
    throw new Error("Unauthorised");
  }

  // mimic an error for testing purposes - media is required
  //   if (!mediaUrl) {
  //     throw new Error("Media URL is required");
  //   }

  // otherwise creat new post with data passed in from the content tab in the dashboard
  const newPost = await prisma.post.create({
    data: {
      text,
      mediaUrl,
      mediaType,
      isPublic,
      userId: user.id,
    },
  });

  // handle this logic in the form submit in the content tab
  return { success: true, post: newPost };
}
