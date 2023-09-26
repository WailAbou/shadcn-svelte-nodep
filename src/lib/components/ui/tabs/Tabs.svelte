<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: string;

	let selectedValueStore: Writable<string> = writable(defaultValue);

	setContext('tabs', selectedValueStore);
</script>

<div dir="ltr" data-orientation="horizontal" class={cn(className)}>
	<slot />
</div>
