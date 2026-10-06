import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * Teaches tailwind-merge the theme's custom font sizes. Without this,
 * `text-label-md` is mistaken for a text color and silently removes classes
 * such as `text-primary-foreground`.
 *
 * Keep in sync with the `--text-*` tokens in styles.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["label-sm", "label-md", "label-lg"],
    },
  },
});

/**
 * Combines class names and resolves Tailwind CSS conflicts, so the last
 * conflicting class wins.
 *
 * @example
 * cn("px-2 py-1", isActive && "bg-primary", "px-4");
 * // => "py-1 bg-primary px-4"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
