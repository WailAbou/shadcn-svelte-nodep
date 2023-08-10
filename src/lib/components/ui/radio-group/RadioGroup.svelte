<script lang="ts">
    import { cn } from "$lib/utils";
	import { setContext } from "svelte";
	import type { Writable } from "svelte/store";

    let className: string | undefined | null = undefined;
    export { className as class };

    export let defaultValue: string | undefined = undefined;
    export let disabled: boolean = false;

    let checkedStores: Writable<boolean>[] = [];
    let radioButtons: HTMLButtonElement[] = [];
    let focusedIndex = -1;

    setContext('radio-group', { defaultValue, disabled, init });

    function init(checkedStore: Writable<boolean>, radioButton: HTMLButtonElement) {
        checkedStores.push(checkedStore);
        radioButtons.push(radioButton);
        let newFocusedIndex = checkedStores.length - 1;

        return function toggle() {
            checkedStores.forEach(store => store.set(false));
            checkedStore.set(true);
            focusedIndex = newFocusedIndex;
        }
    }
    
    function onKeydown({ key }: KeyboardEvent): void {
        const next: boolean = key === "ArrowRight" || key === "ArrowDown";
        const previous: boolean = key === "ArrowLeft" || key === "ArrowUp";

        if (next) focusedIndex = (focusedIndex + 1) % checkedStores.length;
        else if (previous) focusedIndex = (focusedIndex - 1 + checkedStores.length) % checkedStores.length;
        else return;

        checkedStores.forEach(store => store.set(false));
        checkedStores[focusedIndex].set(true);
        radioButtons[focusedIndex].focus();
    }
</script>

<div on:keydown|preventDefault={onKeydown} role="radiogroup" aria-required="false" dir="ltr" tabindex="0" class="{cn("grid gap-2 outline-none", className)}">
    <slot />
</div>