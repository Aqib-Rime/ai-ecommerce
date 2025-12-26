"use client";
import { useSession } from "@/lib/auth-client";
import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";

export function PageClient() {
  const { data: session } = useSession();
  const { data: users } = useQuery(orpc.users.me.queryOptions());
  return (
    <div>
      <h1>AI E-commerce</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
