import { Suspense } from "react";
import { getSession } from "@/lib/get-session";
import LogoutButton from "@/components/auth/logout-button";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">WedPlan</h1>

      <Suspense fallback={<p>Loading user information...</p>}>
        <UserInfo />
      </Suspense>
    </main>
  );
}

async function UserInfo() {
  const session = await getSession();

  console.log("Current user:", session?.user);

  return (
    <>
      <p>Welcome, {session?.user.name ?? "Guest"}!</p>
      <p>Role: {session?.user.role ?? "Not logged in"}</p>
      <LogoutButton/>
    </>
  );
}