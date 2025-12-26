"use client";

import { useFieldContext } from "@/hooks/form-context";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

interface FormCheckboxProps {
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function FormCheckbox({ label, description, disabled }: FormCheckboxProps) {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation="horizontal" data-invalid={field.state.meta.errors.length > 0}>
      <CheckboxPrimitive.Root
        id={field.name}
        checked={field.state.value ?? false}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
        onBlur={field.handleBlur}
        disabled={disabled}
        className={cn(
          "border-input bg-input/20 dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded border transition-colors focus-visible:ring-[2px] aria-invalid:ring-[2px] outline-none disabled:cursor-not-allowed disabled:opacity-50",
        )}
        aria-invalid={field.state.meta.errors.length > 0}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} className="size-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <div className="flex flex-col gap-0.5">
        {label && (
          <FieldLabel htmlFor={field.name} className="cursor-pointer">
            {label}
          </FieldLabel>
        )}
        {description && <FieldDescription>{description}</FieldDescription>}
        <FieldError errors={field.state.meta.errors.map((e) => ({ message: String(e) }))} />
      </div>
    </Field>
  );
}
