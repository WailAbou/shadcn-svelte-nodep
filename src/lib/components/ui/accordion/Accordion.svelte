<script lang="ts">
	import { cn, hasValue } from "$lib/utils";
	import { createEventDispatcher, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";
	import type { AccordionType } from ".";

	const dispatch = createEventDispatcher<{valueChange: string | string[]}>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let collapsible: boolean = false;
	export let defaultValue: undefined | string | string[] = undefined;
	export let type: AccordionType;

	let collapisbleStore: Writable<boolean> = writable(collapsible);
	let previousExpandedStore: Writable<boolean>;
	let value: undefined | string | string[];
	
	setContext('accordion', { defaultValue, collapisbleStore, toggleAllItems });

	$: $collapisbleStore = collapsible;
	$: isSingle = (type === "single");
	$: value = isSingle ? "" : [];

	function toggleAllItems(newValue: string, currentExpandedStore: Writable<boolean>) {
		let isNewValue = !hasValue(value, newValue);

		if (isSingle && $previousExpandedStore && isNewValue) $previousExpandedStore = false;
		
		if (collapsible || isNewValue) {
			previousExpandedStore = currentExpandedStore;

			if (Array.isArray(value)) {
				isNewValue ? value.push(newValue) : value.splice(value.indexOf(newValue, 0), 1); 
			} else {
				value = newValue;
			}

			dispatch("valueChange", value);
		}
	}
</script>

<div class="{cn(className)}">
	<slot />
</div>
