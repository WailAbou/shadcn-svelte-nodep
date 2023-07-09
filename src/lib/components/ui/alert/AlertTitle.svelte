<script lang="ts">
	import { cn } from "$lib/utils";
	import type { AlertTitleLevel } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	export let level: AlertTitleLevel = "h5";
</script>

<svelte:element this={level} class={cn("mb-1 font-medium leading-none tracking-tight", className)}>
	<slot />
</svelte:element>