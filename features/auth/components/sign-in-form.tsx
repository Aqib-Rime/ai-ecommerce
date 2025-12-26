"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAppForm } from "@/hooks/use-app-form";
import { signInSchema, type SignInFormValues } from "../schemas";
import { signIn } from "@/lib/auth-client";
import { revalidateLogic } from "@tanstack/react-form";

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } as SignInFormValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: signInSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      const { error: signInError } = await signIn.email({
        email: value.email,
        password: value.password,
      });

      if (signInError) {
        setError(signInError.message ?? "Invalid email or password");
        return;
      }

      router.push("/");
    },
  });

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

      <form.AppField name="password">
        {(field) => (
          <field.FormPasswordInput
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        )}
      </form.AppField>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <form.AppForm>
        <form.SubmitButton label="Sign In" loadingLabel="Signing In..." />
      </form.AppForm>
    </form>
  );
}
