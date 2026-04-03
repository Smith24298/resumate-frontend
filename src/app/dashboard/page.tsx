// FILE: app/dashboard/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  const firstName = user?.firstName ?? "there";
  const email = user?.emailAddresses[0]?.emailAddress ?? "";

  return (
    <DashboardClient userId={userId} firstName={firstName} email={email} />
  );
}
