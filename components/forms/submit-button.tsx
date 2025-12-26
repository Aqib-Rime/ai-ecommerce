"use client";

import { useFormContext } from "@/hooks/form-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends Omit<React.ComponentProps<typeof Button>, "type"> {
  label?: string;
  loadingLabel?: string;
  isExecuting?: boolean;
}

export function SubmitButton({
  label = "Submit",
  loadingLabel = "Submitting...",
  isExecuting = false,
  className,
  disabled,
  children,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext();
  const isSubmitting = form.state.isSubmitting || isExecuting;

  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
      className={cn("w-full", className)}
      {...props}
    >
      {children ?? (isSubmitting ? loadingLabel : label)}
    </Button>
  );
}
