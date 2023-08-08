import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  	return twMerge(clsx(inputs));
}

export function removeValue<T>(source: T[], target: T): T[] {
	const index = source.indexOf(target);
	if (index !== -1) {
		source.splice(index, 1);
	}
	return source;
};

export function hasValue<T>(source: undefined | T | T[], target: T): boolean {
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