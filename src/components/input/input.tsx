import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A single-line text field.
 *
 * Has no size variants: it matches the height of a medium button, and can be
 * resized through `className`. Set `aria-invalid` to show the error state, so
 * the visual state always matches what assistive technologies announce.
 *
 * @example
 * ```tsx
 * <Input type="email" placeholder="name@company.com" />
 * ```
 *
 * @example
 * ```tsx
 * <Input aria-invalid aria-describedby="email-error" />
 * ```
 */
function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Neutralizes native input styles, since the library doesn't ship a global CSS reset.
        "m-0 appearance-none font-sans",
        "h-10.5 w-full min-w-0 rounded-md border border-input bg-background px-3 text-foreground",
        // 16px on small screens prevents iOS Safari from zooming in when the field is focused.
        "text-body-lg md:text-body-md",
        "placeholder:text-muted-foreground",
        "selection:bg-primary selection:text-primary-foreground",
        "file:mr-3 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-sans file:text-label-md file:text-foreground",
        "outline-none transition-[color,background-color,border-color,box-shadow]",
        "hover:not-disabled:border-primary",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-error aria-invalid:focus-visible:ring-error/40",
        "disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
