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

	let value: undefined | string | string[];
	let expandedStores: Writable<boolean>[] = [];
	let accordionTriggers: HTMLButtonElement[] = [];
	let focusedIndex = 0;

    const focusNext = () => focus((focusedIndex + 1) % expandedStores.length);
    const focusPrevious = () => focus((focusedIndex - 1 + expandedStores.length) % expandedStores.length);

	setContext('accordion', { defaultValue, init });

	$: isSingle = (type === "single");
	$: value = isSingle ? "" : [];

	function init(expandedStore: Writable<boolean>, targetValue: string, accordionTrigger: HTMLButtonElement): VoidFunction {
        expandedStores.push(expandedStore);
        accordionTriggers.push(accordionTrigger);

        let clickedIndex = expandedStores.length - 1;
		if (hasValue(defaultValue, targetValue)) select(clickedIndex, targetValue);
		return () => toggle(clickedIndex, targetValue);
    }

	function toggle(targetIndex: number, targetValue: string) {
		focus(targetIndex);
		select(targetIndex, targetValue);
	}

	function focus(targetIndex: number) {
		accordionTriggers[targetIndex]?.focus();
        focusedIndex = targetIndex;
	}

	function select(targetIndex: number, targetValue: string) {
		expandedStores.forEach((store, i) => { 
			if (isSingle && i !== targetIndex) store.set(false); 
		});
        expandedStores[targetIndex].update(expanded => collapsible ? !expanded : true);

		if (Array.isArray(value)) {
			if (!hasValue(value, targetValue)) value.push(targetValue)
			else if (collapsible) removeValue(value, targetValue);
		}
		else value = targetValue;
		
		dispatch("valueChange", value);
	}

	function onNavigate(event : KeyboardEvent): void {
        const next: boolean = event.key === "ArrowDown";
        const previous: boolean = event.key === "ArrowUp";
        if (next || previous) {
			event.preventDefault();
        	next ? focusNext() : focusPrevious();
		}
    }
</script>

<div on:keydown={onNavigate} class="{cn(className)}">
	<slot />
</div>