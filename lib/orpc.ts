import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { BatchLinkPlugin } from "@orpc/client/plugins";
import type { RouterClient } from "@orpc/server";
import { createRouterUtils } from "@orpc/tanstack-query";
import type { router } from "@/routers";

// Global type declaration for SSR optimization
declare global {
  // eslint-disable-next-line no-var
  var $client: RouterClient<typeof router> | undefined;
}

// RPC link configuration
const link = new RPCLink({
  url:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/rpc`
      : "http://localhost:3000/api/rpc",
  plugins: [
    new BatchLinkPlugin({
      groups: [
        {
          condition: () => true,
          context: {},
        },
      ],
    }),
  ],
});

// Create client with global singleton fallback
export const client: RouterClient<typeof router> =
  globalThis.$client ?? createORPCClient(link);

// TanStack Query utilities
export const orpc = createRouterUtils(client);
