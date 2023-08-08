<script lang="ts">
	import { cn, hasValue, removeValue } from "$lib/utils";
	import { createEventDispatcher, setContext } from "svelte";
	import type { Writable } from "svelte/store";
	import type { AccordionType } from ".";

	const dispatch = createEventDispatcher<{valueChange: string | string[]}>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let collapsible: boolean = false;
	export let defaultValue: undefined | string | string[] = undefined;
	export let type: AccordionType;

	let previousExpandedStore: Writable<boolean>;
	let value: undefined | string | string[];
	
	setContext('accordion', { defaultValue, toggle });

	$: isSingle = (type === "single");
	$: value = isSingle ? "" : [];

	function toggle(newValue: string, expandedStore: Writable<boolean>) {
		expandedStore.update(expanded => collapsible ? !expanded : true);
		let isNewValue = !hasValue(value, newValue);

		if (isSingle && $previousExpandedStore && isNewValue) $previousExpandedStore = false;
		
		if (collapsible || isNewValue) {
			previousExpandedStore = expandedStore;

			if (Array.isArray(value)) isNewValue ? value.push(newValue) : removeValue(value, newValue); 
			else value = newValue;

			dispatch("valueChange", value);
		}
	}
</script>

<div class="{cn(className)}">
	<slot />
</div>
