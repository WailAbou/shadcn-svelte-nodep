<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let { openStore }: { openStore: Writable<boolean> } = getContext('collapsible');
</script>

<div hidden={!$openStore} class={cn(className)}>
	<slot />
</div>
