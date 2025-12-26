import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from "@orpc/server";
import { ZodSmartCoercionPlugin } from "@orpc/zod";
import {
  type BetterAuthSession,
  getServerSession,
} from "@/lib/get-server-session";
import { router } from "@/routers";

// Initialize OpenAPI handler
const openAPIHandler = new OpenAPIHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
  plugins: [new ZodSmartCoercionPlugin()],
});

// Request handler
async function handleRequest(request: Request) {
  const session = await getServerSession();

  const { response } = await openAPIHandler.handle(request, {
    prefix: "/api/rpc",
    context: {
      session: session as BetterAuthSession | undefined,
    },
  });

  return response ?? new Response("Not found", { status: 404 });
}

// Export handlers for all HTTP methods
export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
