"use client";

import { useFieldContext } from "@/hooks/form-context";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";

interface FormInputProps extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "onBlur"> {
  label?: string;
  description?: string;
}

export function FormInput({ label, description, ...props }: FormInputProps) {
  const field = useFieldContext<string>();

  return (
    <Field data-invalid={field.state.meta.errors.length > 0}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={field.state.meta.errors.length > 0}
        {...props}
      />
      <FieldError errors={field.state.meta.errors.map((e) => ({ message: String(e) }))} />
    </Field>
  );
}
