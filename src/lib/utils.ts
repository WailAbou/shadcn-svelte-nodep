import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasValue(source: undefined | string | string[], target: string) {
  return !Array.isArray(source) && source === target || Array.isArray(source) && source?.includes(target);
}

export function clickOutside(node: Node, callbackFunction: any) {
  function onClick(event: any) {
    if (!node.contains(event.target)) {
      callbackFunction();
    }
  }
  
  document.body.addEventListener('click', onClick);
  
  return {
    update(newCallbackFunction: any) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener('click', onClick);
    }
  }
}