<script lang="ts">
	import { preventDefault, preventScroll } from '$lib/helpers/actions';
	import { createKeyboardNavigation, createState } from '$lib/helpers/state';
	import type { Direction } from '$lib/helpers/types';
	import { createEventDispatcher, setContext, tick } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ valueChange: string | string[] }>();

	export let defaultValue: string | undefined = undefined;
	export let defaultOpen: boolean = false;
	export let disabled: boolean = false;
	export let dir: Direction = 'ltr';

	let value: Writable<string> = writable(defaultValue);
	let valuePlaceholder: Writable<string> = writable();
	let selectTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(defaultOpen);
	let selectContentUuid: string = crypto.randomUUID();
	let {
		methods: { init, focus, reset },
		variables: { values, items, activeIndex, triggers }
	} = createState(defaultValue, select, value);

	const onKeyDown = (e: KeyboardEvent) => $isOpen && createKeyboardNavigation(e, focus, activeIndex, items.length, 'vertical');

	setContext('select', { valuePlaceholder, selectTrigger, isOpen, init, defaultOpen, disabled, selectContentUuid, dir });

	function select(index: number) {
		items.forEach((item) => item.set(false));
		items[index].set(true);

		$value = get(values[index]);
		$valuePlaceholder = triggers[index].innerText;
		$isOpen = false;

		dispatch('valueChange', $value);
	}

	$: if ($isOpen) {
		tick().then(() => focus($activeIndex));
	} else {
		reset();
	}
</script>

<svelte:window use:preventScroll={$isOpen} on:keydown={onKeyDown} use:preventDefault={[['Tab'], isOpen]} />

<slot />
