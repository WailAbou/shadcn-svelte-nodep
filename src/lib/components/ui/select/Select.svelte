<script lang="ts">
	import { preventScroll } from '$lib/helpers/actions';
	import type { Direction } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultOpen: boolean = false;
	export let disabled: boolean = false;
	export let dir: Direction = 'ltr';

	let selectTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(defaultOpen);
	let selectedValue: Writable<string> = writable();
	let selectContentUuid: string = crypto.randomUUID();

	setContext('select', { selectTrigger, isOpen, selectedValue, defaultOpen, disabled, selectContentUuid, dir });
</script>

<svelte:window use:preventScroll={$isOpen} />
<slot />
