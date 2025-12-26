"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAppForm } from "@/hooks/use-app-form";
import { signUpSchema, type SignUpFormValues } from "../schemas";
import { signUp } from "@/lib/auth-client";
import { revalidateLogic } from "@tanstack/react-form";

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as SignUpFormValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      const { error: signUpError } = await signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (signUpError) {
        setError(
          signUpError.message ?? "Something went wrong. Please try again."
        );
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
      <form.AppField name="name">
        {(field) => (
          <field.FormInput
            label="Name"
            placeholder="Enter your name"
            autoComplete="name"
          />
        )}
      </form.AppField>

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
            placeholder="Create a password"
            autoComplete="new-password"
          />
        )}
      </form.AppField>

      <form.AppField name="confirmPassword">
        {(field) => (
          <field.FormPasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
        )}
      </form.AppField>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <form.AppForm>
        <form.SubmitButton
          label="Create Account"
          loadingLabel="Creating Account..."
        />
      </form.AppForm>
    </form>
  );
}
