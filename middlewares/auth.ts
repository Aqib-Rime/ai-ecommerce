import { ORPCError, os } from "@orpc/server";
import { getServerSession } from "@/lib/get-server-session";

/**
 * Required authentication middleware
 * Throws UNAUTHORIZED if no valid session
 */
export const requiredAuthMiddleware = os.middleware(async ({ next }) => {
  const session = await getServerSession();

  if (!session?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }

  return next({
    context: { session },
  });
});

/**
 * Optional authentication middleware
 * Adds session to context if available, but doesn't require it
 */
export const optionalAuthMiddleware = os.middleware(async ({ next }) => {
  const session = await getServerSession();

  return next({
    context: { session },
  });
});
