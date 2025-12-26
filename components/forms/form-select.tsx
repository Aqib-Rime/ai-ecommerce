"use client";

import { useFieldContext } from "@/hooks/form-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface FormSelectProps {
  label?: string;
  description?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
}

export function FormSelect({
  label,
  description,
  placeholder,
  options,
  disabled,
}: FormSelectProps) {
  const field = useFieldContext<string>();

  return (
    <Field data-invalid={field.state.meta.errors.length > 0}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      <Select
        value={field.state.value ?? ""}
        onValueChange={(value) => field.handleChange(value)}
        disabled={disabled}
      >
        <SelectTrigger
          id={field.name}
          className="w-full"
          aria-invalid={field.state.meta.errors.length > 0}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError />
    </Field>
  );
}
