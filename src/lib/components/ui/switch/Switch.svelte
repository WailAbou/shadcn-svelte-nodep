<script lang="ts">
    import { cn } from "$lib/utils";
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{checkedChange: boolean}>();
    let className: string | undefined | null = undefined;
    export { className as class };

    export let id: string | undefined = undefined;
    export let disabled: boolean = false;
    export let defaultChecked: boolean = false;
    export let required: boolean = false;

    let checked: boolean = defaultChecked;

    function toggle() {
        checked = !checked;
        dispatch("checkedChange", checked);
    }
</script>

<button {id} {disabled} on:click={toggle} aria-checked="{checked}" data-state="{checked ? "checked" : "unchecked"}" type="button" role="switch" value="on" class="{cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className)}">
    <span data-state="{checked ? "checked" : "unchecked"}" class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"></span>
</button>
<input {required} aria-hidden="true" tabindex="-1" type="checkbox" value="on" class="absolute pointer-events-none opacity-0 !m-0 h-6 w-11">