import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
