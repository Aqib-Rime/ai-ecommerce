import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type BetterAuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;

export async function getServerSession(): Promise<BetterAuthSession> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}
