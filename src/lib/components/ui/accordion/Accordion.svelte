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
	let focusedIndex = -1;

    const focusNext = () => focus((focusedIndex + 1) % expandedStores.length);
    const focusPrevious = () => focus((focusedIndex - 1 + expandedStores.length) % expandedStores.length);
    const focusLast = () => focus(expandedStores.length - 1);
    const focusFirst = () => focus(0);

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
		const { key } = event;
        const next: boolean = key === "ArrowDown";
        const previous: boolean = key === "ArrowUp";
		const last: boolean = key === "End";
		const first: boolean = key === "Home";

        if (next || previous || last || first) {
			event.preventDefault();

			if (next) focusNext();
			else if (previous) focusPrevious();
			else if (last) focusLast();
			else if (first) focusFirst();
		}
    }
</script>

<div on:keydown={onNavigate} class="{cn(className)}">
	<slot />
</div>
