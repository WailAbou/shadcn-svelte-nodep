<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { TabsActivationMode } from '.';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: string;
	export let activationMode: TabsActivationMode = 'automatic';

	let selectedValueStore: Writable<string> = writable(defaultValue);

	setContext('tabs', { selectedValueStore, activationMode });
</script>

<div dir="ltr" data-orientation="horizontal" class={cn(className)}>
	<slot />
</div>
