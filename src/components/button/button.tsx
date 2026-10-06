import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    // Neutralizes native button styles, since the library doesn't ship a global CSS reset.
    "m-0 cursor-pointer appearance-none border-0 bg-transparent p-0 font-sans",
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "outline-none transition-[color,background-color,border-color,box-shadow]",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "disabled:cursor-not-allowed",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "hover:not-disabled:bg-primary-hover active:not-disabled:bg-primary-active",
          "disabled:bg-primary-disabled disabled:text-primary-disabled-foreground",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:not-disabled:bg-secondary-hover active:not-disabled:bg-secondary-active",
          "disabled:bg-secondary-disabled disabled:text-secondary-disabled-foreground",
        ],
        outline: [
          "border border-input bg-background text-foreground",
          "hover:not-disabled:bg-subtle-hover active:not-disabled:bg-subtle-active",
          "disabled:border-border disabled:text-muted-foreground",
        ],
        ghost: [
          "text-foreground",
          "hover:not-disabled:bg-subtle-hover active:not-disabled:bg-subtle-active",
          "disabled:text-muted-foreground",
        ],
        destructive: [
          "bg-error text-error-foreground",
          "hover:not-disabled:bg-error-hover active:not-disabled:bg-error-active",
          "focus-visible:ring-error/40",
          "disabled:bg-error-disabled disabled:text-error-disabled-foreground",
        ],
      },
      size: {
        sm: "h-9 gap-2 rounded-md px-3 text-label-sm",
        md: "h-10.5 gap-3 rounded-md px-4 text-label-md",
        lg: "h-12 gap-4 rounded-lg px-6 text-label-lg",
      },
      iconOnly: {
        true: "px-0",
        false: "",
      },
    },
    compoundVariants: [
      // Icon-only buttons are square, matching the height of their size.
      { iconOnly: true, size: "sm", class: "w-9" },
      { iconOnly: true, size: "md", class: "w-10.5" },
      { iconOnly: true, size: "lg", class: "w-12" },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "md",
      iconOnly: false,
    },
  },
);

type ButtonBaseProps = Omit<
  ComponentProps<"button">,
  "aria-label" | "aria-labelledby"
> &
  Omit<VariantProps<typeof buttonVariants>, "iconOnly"> & {
    /**
     * Renders the child element instead of a `<button>`, merging the button's
     * props and styles onto it. Useful for links that should look like buttons.
     *
     * @example
     * ```tsx
     * <Button asChild>
     *   <a href="/products">View products</a>
     * </Button>
     * ```
     */
    asChild?: boolean;
  };

/**
 * Icon-only buttons have no visible text, so an accessible name is required
 * through `aria-label` or `aria-labelledby`.
 */
type ButtonLabelProps =
  | { iconOnly?: false; "aria-label"?: string; "aria-labelledby"?: string }
  | { iconOnly: true; "aria-label": string; "aria-labelledby"?: string }
  | { iconOnly: true; "aria-label"?: string; "aria-labelledby": string };

export type ButtonProps = ButtonBaseProps & ButtonLabelProps;

/**
 * Triggers an action, such as submitting a form or opening a dialog.
 *
 * Defaults to `variant="secondary"`: primary buttons should be an intentional
 * choice, usually one per view. Also defaults to `size="md"` and
 * `type="button"`, which prevents accidental form submissions.
 *
 * @example
 * ```tsx
 * <Button variant="primary">Save product</Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button iconOnly aria-label="Delete product" variant="ghost">
 *   <TrashIcon />
 * </Button>
 * ```
 */
function Button({
  className,
  variant,
  size,
  iconOnly,
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      type={asChild ? type : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, iconOnly }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
