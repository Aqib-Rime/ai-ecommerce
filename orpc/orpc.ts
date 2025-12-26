import { os } from "@orpc/server";
import { requiredAuthMiddleware } from "@/middlewares/auth";

// Public routes - no authentication required
export const pub = os;

// Authenticated routes - requires valid session
export const authed = pub.use(requiredAuthMiddleware);
