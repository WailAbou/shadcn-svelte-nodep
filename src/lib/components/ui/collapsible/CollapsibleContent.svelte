<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let { open }: { open: Writable<boolean> } = getContext('collapsible');
</script>

<div hidden={!$open} class={cn(className)}>
	<slot />
</div>
