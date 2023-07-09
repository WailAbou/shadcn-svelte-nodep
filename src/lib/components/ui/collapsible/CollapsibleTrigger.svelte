<script lang="ts">
	import { cn } from "$lib/utils";
	import { getContext, setContext } from "svelte";
	import type { Writable } from "svelte/store";

	let className: string | undefined | null = undefined;
	export { className as class };

    let openStore: Writable<boolean> = getContext("collapsible");
</script>

<div class="{cn(className)}" on:click={() => $openStore = !$openStore}>
    <slot />
</div>