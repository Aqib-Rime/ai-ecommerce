import { getServerSession } from "@/lib/get-server-session";
import { api } from "@/orpc/server";
import { Suspense } from "react";
import { PageClient } from "./page.client";
import { Navbar } from "@/features/navbar/components/navbar";

export default async function Page() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <SessionInfo />
      </Suspense>
      <PageClient />
    </>
  );
}

async function SessionInfo() {
  const session = await getServerSession();

  const users = await api.users.me();

  return (
    <div>
      <h1>AI E-commerce</h1>
      <p>Welcome {session?.user?.email}</p>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
