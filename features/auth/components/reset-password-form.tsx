"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAppForm } from "@/hooks/use-app-form";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas";
import { authClient } from "@/lib/auth-client";
import { revalidateLogic } from "@tanstack/react-form";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const form = useAppForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    } as ResetPasswordFormValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      const { error: resetError } = await authClient.resetPassword({
        newPassword: value.password,
        token,
      });

      if (resetError) {
        setError(resetError.message ?? "Failed to reset password");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 2000);
    },
  });

  if (success) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Your password has been reset successfully. Redirecting to sign in...
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <form.AppField name="password">
        {(field) => (
          <field.FormPasswordInput
            label="New Password"
            placeholder="Enter your new password"
            autoComplete="new-password"
          />
        )}
      </form.AppField>

      <form.AppField name="confirmPassword">
        {(field) => (
          <field.FormPasswordInput
            label="Confirm Password"
            placeholder="Confirm your new password"
            autoComplete="new-password"
          />
        )}
      </form.AppField>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <form.AppForm>
        <form.SubmitButton
          label="Reset Password"
          loadingLabel="Resetting..."
        />
      </form.AppForm>
    </form>
  );
}
