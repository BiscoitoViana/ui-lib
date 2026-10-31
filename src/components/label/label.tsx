import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type LabelProps = ComponentProps<"label"> & {
  /**
   * Shows a required indicator. It's visual only and hidden from assistive
   * technologies: also set `required` on the associated field, which is what
   * screen readers announce.
   */
  required?: boolean;
};

/**
 * A caption for a form field.
 *
 * Associate it with a field through `htmlFor`, so clicking the label focuses
 * the field and screen readers announce the label as the field's name.
 *
 * @example
 * ```tsx
 * <Label htmlFor="product-name" required>Product name</Label>
 * <Input id="product-name" required />
 * ```
 */
function Label({
  className,
  children,
  required = false,
  ...props
}: LabelProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is passed by the consumer through props.
    <label
      data-slot="label"
      className={cn("font-sans text-label-md text-foreground", className)}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-1 text-error-text">
          *
        </span>
      )}
    </label>
  );
}

export { Label };
