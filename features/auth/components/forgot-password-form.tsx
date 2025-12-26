"use client";

import * as React from "react";
import { useAppForm } from "@/hooks/use-app-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas";
import { authClient } from "@/lib/auth-client";
import { revalidateLogic } from "@tanstack/react-form";

export function ForgotPasswordForm() {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const form = useAppForm({
    defaultValues: {
      email: "",
    } as ForgotPasswordFormValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setSuccess(false);

      const { error: resetError } = await authClient.requestPasswordReset({
        email: value.email,
        redirectTo: "/auth/reset-password",
      });

      if (resetError) {
        setError(resetError.message ?? "Something went wrong");
        return;
      }

      setSuccess(true);
    },
  });

  if (success) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          If an account exists with that email, we&apos;ve sent a password reset
          link. Please check your inbox.
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
      <form.AppField name="email">
        {(field) => (
          <field.FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
          />
        )}
      </form.AppField>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <form.AppForm>
        <form.SubmitButton
          label="Send Reset Link"
          loadingLabel="Sending..."
        />
      </form.AppForm>
    </form>
  );
}
