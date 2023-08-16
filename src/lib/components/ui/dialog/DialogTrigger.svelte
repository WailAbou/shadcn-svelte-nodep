<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isOpenStore: Writable<boolean> = getContext('alert-dialog');
</script>

<button type="button" class={cn('flex flex-1 items-center justify-between py-4 font-medium hover:underline', className)} on:click|stopPropagation={() => ($isOpenStore = !$isOpenStore)}>
	<slot />
</button>
