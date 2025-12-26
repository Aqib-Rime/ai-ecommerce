"use client";

import { useFieldContext } from "@/hooks/form-context";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

interface FormSwitchProps {
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function FormSwitch({ label, description, disabled }: FormSwitchProps) {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation="horizontal" data-invalid={field.state.meta.errors.length > 0}>
      <SwitchPrimitive.Root
        id={field.name}
        checked={field.state.value ?? false}
        onCheckedChange={(checked) => field.handleChange(checked)}
        onBlur={field.handleBlur}
        disabled={disabled}
        className={cn(
          "border-input bg-input dark:bg-input/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border transition-colors focus-visible:ring-[2px] aria-invalid:ring-[2px] outline-none disabled:cursor-not-allowed disabled:opacity-50",
        )}
        aria-invalid={field.state.meta.errors.length > 0}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "bg-background pointer-events-none block size-4 rounded-full shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          )}
        />
      </SwitchPrimitive.Root>
      <div className="flex flex-col gap-0.5">
        {label && (
          <FieldLabel htmlFor={field.name} className="cursor-pointer">
            {label}
          </FieldLabel>
        )}
        {description && <FieldDescription>{description}</FieldDescription>}
        <FieldError />
      </div>
    </Field>
  );
}
