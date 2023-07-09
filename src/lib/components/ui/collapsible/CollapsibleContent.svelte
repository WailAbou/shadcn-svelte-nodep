<script lang="ts">
	import { cn } from "$lib/utils";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	let className: string | undefined | null = undefined;
	export { className as class };

    let openStore: Writable<boolean> = getContext("collapsible");
</script>

<div hidden={!$openStore} class="space-y-2" style="{cn(className)}">
    <slot />
</div>