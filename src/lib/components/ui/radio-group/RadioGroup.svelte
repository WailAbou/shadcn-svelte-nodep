<script lang="ts">
    import { cn, type InitProps } from "$lib/utils";
    import { createEventDispatcher, setContext } from "svelte";
    import type { Writable } from "svelte/store";

    const dispatch = createEventDispatcher<{valueChange: string}>();

    let className: string | undefined | null = undefined;
    export { className as class };
    export let defaultValue: string | undefined = undefined;
    export let disabled: boolean = false;

    let radioGroup: HTMLDivElement;
    let value: string;
    let checkedStores: Writable<boolean>[] = [];
    let radioButtons: HTMLButtonElement[] = [];
    let focusedIndex = 0;

    const toggleNext = () => toggle((focusedIndex + 1) % checkedStores.length);
    const togglPrevious = () => toggle((focusedIndex - 1 + checkedStores.length) % checkedStores.length);

    setContext('radio-group', { disabled, defaultValue, init });

    function init(radioButton: Node, { store: checkedStore, value, onInit }: InitProps<boolean>) {        
        checkedStores.push(checkedStore);
        radioButtons.push(radioButton as HTMLButtonElement);

        let index = checkedStores.length - 1;
        if (value === defaultValue) select(index, value);
        const toggleItem = () => toggle(index);

        onInit({toggleItem, index});
    }

    function toggle(index: number) {
        focus(index);
        select(index, radioButtons[index].value);
    }
    
    function focus(index: number) {
        radioButtons[index]?.focus();
        focusedIndex = index;
    }

    function select(index: number, newValue: string) {
        checkedStores.forEach(store => store.set(false));
        checkedStores[index].set(true);
        
        value = newValue;
        dispatch("valueChange", value);
    }
    
    function onNavigate(event : KeyboardEvent): void {
        const next: boolean = event.key === "ArrowRight" || event.key === "ArrowDown";
        const previous: boolean = event.key === "ArrowLeft" || event.key === "ArrowUp";
        if (next || previous) {
            event.preventDefault(); 
            next ? toggleNext() : togglPrevious();
        }
    }
</script>

<div bind:this={radioGroup} on:keydown={onNavigate} role="radiogroup" aria-required="false" dir="ltr" tabindex="-1" class="{cn("grid gap-2 outline-none", className)}">
    <slot />
</div>