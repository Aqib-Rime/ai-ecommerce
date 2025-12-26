import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin } from "better-auth/plugins";
import { db } from "@/db";
import {
  ac,
  admin as adminRole,
  manager,
  staff,
  user as userRole,
} from "./permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // TODO: Replace with actual email service (e.g., Resend, SendGrid)
      console.log(`[Password Reset] Send email to ${user.email}`);
      console.log(`[Password Reset] Reset URL: ${url}`);
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin: adminRole,
        manager,
        staff,
        user: userRole,
      },
      defaultRole: "user",
    }),
  ],
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "x-real-ip", "x-client-ip"],
      disableIpTracking: false,
    },
  },
});
