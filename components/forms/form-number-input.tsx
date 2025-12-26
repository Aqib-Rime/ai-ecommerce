"use client";

import * as React from "react";
import { useFieldContext } from "@/hooks/form-context";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

interface FormNumberInputProps extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "onBlur" | "type"> {
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  allowDecimal?: boolean;
}

export function FormNumberInput({
  label,
  description,
  min,
  max,
  step,
  allowDecimal = false,
  ...props
}: FormNumberInputProps) {
  const field = useFieldContext<number | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      field.handleChange(undefined);
      return;
    }

    const parsed = allowDecimal ? parseFloat(value) : parseInt(value, 10);
    if (!isNaN(parsed)) {
      field.handleChange(parsed);
    }
  };

  return (
    <Field data-invalid={field.state.meta.errors.length > 0}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      <Input
        id={field.name}
        name={field.name}
        type="number"
        inputMode={allowDecimal ? "decimal" : "numeric"}
        value={field.state.value ?? ""}
        onChange={handleChange}
        onBlur={field.handleBlur}
        min={min}
        max={max}
        step={step ?? (allowDecimal ? 0.01 : 1)}
        aria-invalid={field.state.meta.errors.length > 0}
        {...props}
      />
      <FieldError />
    </Field>
  );
}
