import BaseLayout from "@/components/BaseLayout";
import UserProfile from "./UserProfile";
import Posts from "./Posts";
import prisma from "@/db/prisma";
import { getUserProfileAction } from "@/app/update-profile/actions";
import { notFound } from "next/navigation";

const HomeScreen = async () => {
  // find admin user with admin email
  const admin = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
  });

  // get the current user from actions
  const user = await getUserProfileAction();

  // fixes the possible null referencce for isSubscribed, check if user is authenticated
  if (!user) return notFound();

  return (
    <BaseLayout>
      <UserProfile />
      <Posts admin={admin!} isSubscribed={user?.isSubscribed} />
    </BaseLayout>
  );
};

export default HomeScreen;
