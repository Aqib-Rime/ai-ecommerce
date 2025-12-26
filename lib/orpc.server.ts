import "server-only";
import { createRouterClient } from "@orpc/server";
import { headers } from "next/headers";
import { router } from "@/routers";
import { getServerSession } from "./get-server-session";

// Global singleton for optimized SSR
globalThis.$client = createRouterClient(router, {
  context: async () => {
    const heads = await headers();
    const session = await getServerSession();

    return {
      headers: heads,
      session,
    };
  },
});
