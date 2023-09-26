<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;

	let selectedValue: Writable<string> = getContext('tabs');
</script>

{#if value === $selectedValue}
	<div
		data-state="active"
		data-orientation="horizontal"
		role="tabpanel"
		tabindex="0"
		style="animation-duration: 0s;"
		class={cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}
	>
		<slot />
	</div>
{/if}
