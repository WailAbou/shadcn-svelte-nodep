<script lang="ts">
	import { cn } from "$lib/utils";
	import { createEventDispatcher, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";

    const dispatch = createEventDispatcher<{openChange: boolean}>();

	let className: string | undefined | null = undefined;
	export { className as class };

    export let defaultOpen: boolean = false;
    export let disabled: boolean = false;

    let openStore: Writable<boolean> = writable(defaultOpen);
    let disabledStore: Writable<boolean> = writable(disabled);

    setContext('collapsible', { openStore, disabledStore });

    $: $disabledStore = disabled;
    $: dispatch("openChange", $openStore);
</script>

<div class="{cn(className)}" >
    <slot />
</div>