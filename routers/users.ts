import { ORPCError } from "@orpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { user } from "@/db/schema";
import { authed, pub } from "@/orpc/orpc";

// =============================================================================
// GET CURRENT USER - GET /users/me
// =============================================================================

export const me = authed
  .route({
    method: "GET",
    path: "/users/me",
    summary: "Get the current authenticated user",
    tags: ["Users"],
  })
  .handler(async ({ context }) => {
    const currentUser = await db.query.user.findFirst({
      where: eq(user.id, context.session.user.id),
    });

    if (!currentUser) {
      throw new ORPCError("NOT_FOUND", {
        message: "User not found",
      });
    }

    return { success: true, data: currentUser };
  });

// =============================================================================
// GET USER BY ID - GET /users/:id
// =============================================================================

export const getById = authed
  .route({
    method: "GET",
    path: "/users/{id}",
    summary: "Get a user by ID",
    tags: ["Users"],
  })
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const foundUser = await db.query.user.findFirst({
      where: eq(user.id, input.id),
    });

    if (!foundUser) {
      throw new ORPCError("NOT_FOUND", {
        message: "User not found",
      });
    }

    return { success: true, data: foundUser };
  });

// =============================================================================
// HEALTH CHECK - GET /health (public)
// =============================================================================

export const health = pub
  .route({
    method: "GET",
    path: "/health",
    summary: "Health check endpoint",
    tags: ["System"],
  })
  .handler(async () => {
    return { success: true, message: "OK", timestamp: new Date().toISOString() };
  });
