<script lang="ts">
    import { cn } from "$lib/utils";
	import { createEventDispatcher, setContext } from "svelte";
	import { get, type Writable } from "svelte/store";

    const dispatch = createEventDispatcher<{valueChange: string}>();

    let className: string | undefined | null = undefined;
    export { className as class };
    export let defaultValue: string | undefined = undefined;
    export let disabled: boolean = false;

    let value: string;
    let checkedStores: Writable<boolean>[] = [];
    let radioButtons: HTMLButtonElement[] = [];
    let focusedIndex = -1;

    setContext('radio-group', { disabled, defaultValue, init });

    function init(checkedStore: Writable<boolean>, radioButton: HTMLButtonElement) {
        checkedStores.push(checkedStore);
        radioButtons.push(radioButton);
        let clickedIndex = checkedStores.length - 1;
        
        if (get(checkedStore)) focusedIndex = clickedIndex;

        return () => toggle(clickedIndex);
    }

    function toggle(newIndex: number) {
        checkedStores.forEach(store => store.set(false));
        checkedStores[newIndex].set(true);
        
        radioButtons[newIndex]?.focus();
        focusedIndex = newIndex;
        
        value = radioButtons[newIndex].value;
        dispatch("valueChange", value);
    }
    
    function onNavigate(event : KeyboardEvent): void {
        const next: boolean = event.key === "ArrowRight" || event.key === "ArrowDown";
        const previous: boolean = event.key === "ArrowLeft" || event.key === "ArrowUp";

        if (next || previous) event.preventDefault();

        if (next) toggle((focusedIndex + 1) % checkedStores.length);
        else if (previous) toggle((focusedIndex - 1 + checkedStores.length) % checkedStores.length);
    }
</script>

<div on:keydown={onNavigate} role="radiogroup" aria-required="false" dir="ltr" tabindex="-1" class="{cn("grid gap-2 outline-none", className)}">
    <slot />
</div>