<script lang="ts">
    import { cn } from "$lib/utils";
	import { createEventDispatcher, setContext } from "svelte";
	import type { Writable } from "svelte/store";

    const dispatch = createEventDispatcher<{valueChange: string}>();

    let className: string | undefined | null = undefined;
    export { className as class };
    export let defaultValue: string | undefined = undefined;
    export let disabled: boolean = false;

    let value: string;
    let checkedStores: Writable<boolean>[] = [];
    let radioButtons: HTMLButtonElement[] = [];
    let focusedIndex = 0;

    const toggleNext = () => toggle((focusedIndex + 1) % checkedStores.length);
    const togglPrevious = () => toggle((focusedIndex - 1 + checkedStores.length) % checkedStores.length);

    setContext('radio-group', { disabled, init });

    function init(checkedStore: Writable<boolean>, targetValue: string, radioButton: HTMLButtonElement) {
        checkedStores.push(checkedStore);
        radioButtons.push(radioButton);

        let index = checkedStores.length - 1;
        if (targetValue === defaultValue) select(index, targetValue);
        return { toggleItem: () => toggle(index), index };
    }

    function toggle(targetIndex: number) {
        focus(targetIndex);
        select(targetIndex, radioButtons[targetIndex].value);
    }
    
    function focus(targetIndex: number) {
		radioButtons[targetIndex]?.focus();
        focusedIndex = targetIndex;
	}

    function select(targetIndex: number, targetValue: string) {
        checkedStores.forEach(store => store.set(false));
        checkedStores[targetIndex].set(true);
        
        value = targetValue;
        dispatch("valueChange", value);
    }
    
    function onNavigate(event: KeyboardEvent): void {
        const { key } = event;
        const next: boolean = key === "ArrowRight" || key === "ArrowDown";
        const previous: boolean = key === "ArrowLeft" || key === "ArrowUp";

        if (next || previous) {
            event.preventDefault(); 
            next ? toggleNext() : togglPrevious();
        }
    }
</script>

<div on:keydown={onNavigate} role="radiogroup" aria-required="false" dir="ltr" tabindex="-1" class="{cn("grid gap-2 outline-none", className)}">
    <slot />
</div>