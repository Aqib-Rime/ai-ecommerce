"use client";

import * as React from "react";
import { useFieldContext } from "@/hooks/form-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";

interface FormPasswordInputProps extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "onBlur" | "type"> {
  label?: string;
  description?: string;
}

export function FormPasswordInput({ label, description, className, ...props }: FormPasswordInputProps) {
  const field = useFieldContext<string>();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Field data-invalid={field.state.meta.errors.length > 0}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          type={showPassword ? "text" : "password"}
          value={field.state.value ?? ""}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={field.state.meta.errors.length > 0}
          className="pr-9"
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute right-0.5 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          <HugeiconsIcon
            icon={showPassword ? ViewOffIcon : ViewIcon}
            strokeWidth={2}
            className="size-3.5 text-muted-foreground"
          />
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
      </div>
      <FieldError errors={field.state.meta.errors.map((e) => ({ message: String(e) }))} />
    </Field>
  );
}
