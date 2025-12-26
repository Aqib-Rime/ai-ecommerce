"use client";

import { useFieldContext } from "@/hooks/form-context";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

interface FormTextareaProps
  extends Omit<React.ComponentProps<"textarea">, "value" | "onChange" | "onBlur"> {
  label?: string;
  description?: string;
}

export function FormTextarea({ label, description, ...props }: FormTextareaProps) {
  const field = useFieldContext<string>();

  return (
    <Field data-invalid={field.state.meta.errors.length > 0}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={field.state.meta.errors.length > 0}
        {...props}
      />
      <FieldError />
    </Field>
  );
}
