import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables schema.
   * These are only available on the server.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url(),
  },

  /**
   * Client-side environment variables schema.
   * These are exposed to the client (prefixed with NEXT_PUBLIC_).
   */
  client: {
    // Add your client-side env vars here, e.g.:
    // NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  /**
   * Runtime environment variables.
   * Map your env vars to the schema above.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  },

  /**
   * Skip validation in certain environments.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Treat empty strings as undefined.
   */
  emptyStringAsUndefined: true,
});
