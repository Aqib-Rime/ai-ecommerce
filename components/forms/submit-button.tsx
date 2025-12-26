"use client";

import { useFormContext } from "@/hooks/form-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "type"> {
  label?: string;
  loadingLabel?: string;
}

export function SubmitButton({
  label = "Submit",
  loadingLabel = "Submitting...",
  className,
  disabled,
  children,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => {
        if (isSubmitting && loadingLabel && !children) {
          return (
            <Button
              type="submit"
              disabled={disabled || isSubmitting}
              className={cn("w-full", className)}
              {...props}
            >
              <Loader2 className="size-4 animate-spin" />
              {loadingLabel}
            </Button>
          );
        }

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
      }}
    </form.Subscribe>
  );
}
