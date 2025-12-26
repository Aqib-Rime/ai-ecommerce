import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, manager, staff, user } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: { admin, manager, staff, user },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
