import "server-only";
import { createRouterClient } from "@orpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import { getServerSession } from "@/lib/get-server-session";
import { router } from "@/routers";

// Cache context creation to avoid redundant calls in server components
const createContext = cache(async () => {
  const heads = await headers();
  const session = await getServerSession();

  return {
    headers: heads,
    session,
  };
});

const caller = createRouterClient(router, {
  context: createContext,
});

export const api = caller;
