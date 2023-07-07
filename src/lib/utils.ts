import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasValue(source: undefined | string | string[], target: string) {
  return !Array.isArray(source) && source === target || Array.isArray(source) && source?.includes(target);
}