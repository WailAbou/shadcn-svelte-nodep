<script lang="ts">
    import { cn } from "$lib/utils";
	import { Circle } from "lucide-svelte";
	import { getContext } from "svelte";
	import { writable, type Writable } from "svelte/store";

    let className: string | undefined | null = undefined;
    export { className as class };

    export let value: string;
    export let id: string | undefined = undefined;
    export let disabled: boolean = false;

    let radioButton: HTMLButtonElement;
    let toggle: () => void;
    let checkedStore: Writable<boolean> = writable(false);
    let { defaultValue, disabled: allDisabled, init }: { defaultValue: string, disabled: boolean, init: (checkedStore: Writable<boolean>, radioButton: HTMLButtonElement) => () => void }  = getContext("radio-group");
    
    disabled = disabled || allDisabled;

    $: if (radioButton) {
        toggle = init(checkedStore, radioButton);
        if (defaultValue === value) toggle();
    }
    
</script>

<button bind:this={radioButton} on:click={() => toggle()} {id} {disabled} tabindex="-1" type="button" role="radio" aria-checked="{$checkedStore}" data-state="{$checkedStore ? "checked" : "unchecked"}" value="default" 
    class="{cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}">
    {#if $checkedStore}
        <span data-state="checked" class="flex items-center justify-center">
            <Circle class="h-2.5 w-2.5 fill-current text-current" />
        </span>
    {/if}
</button>
<input checked={$checkedStore} {disabled} aria-hidden="true" tabindex="-1" type="radio" value="all" class="absolute pointer-events-none opacity-0 !m-0 h-4 w-4">