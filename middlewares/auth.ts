import { ORPCError, os } from "@orpc/server";
import { getServerSession } from "@/lib/get-server-session";
import { auth } from "@/lib/auth";

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

/**
 * Permission-based middleware factory
 * Checks if the authenticated user has the required permission
 */
export function requirePermission(
  resource: string,
  actions: string | string[]
) {
  const actionList = Array.isArray(actions) ? actions : [actions];

  return os.middleware(async ({ next }) => {
    const session = await getServerSession();

    if (!session?.user) {
      throw new ORPCError("UNAUTHORIZED");
    }

    const hasPermission = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permission: { [resource]: actionList },
      },
    });

    if (!hasPermission) {
      throw new ORPCError("FORBIDDEN");
    }

    return next({
      context: { session },
    });
  });
}
