<script lang="ts">
	import { preventScroll } from '$lib/helpers/actions';
	import { createState } from '$lib/helpers/state';
	import type { Direction } from '$lib/helpers/types';
	import { createEventDispatcher, setContext } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ valueChange: string | string[] }>();

	export let defaultValue: string | undefined = undefined;
	export let defaultOpen: boolean = false;
	export let disabled: boolean = false;
	export let dir: Direction = 'ltr';

	let value: Writable<string> = writable(defaultValue);
	let selectTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(defaultOpen);
	let selectContentUuid: string = crypto.randomUUID();
	let {
		methods: { init },
		variables: { values, items }
	} = createState(defaultValue, select, value);

	setContext('select', { selectTrigger, isOpen, init, defaultOpen, disabled, selectContentUuid, dir });

	function select(index: number) {
		items.forEach((item) => item.set(false));
		items[index].set(true);

		$value = get(values[index]);
		dispatch('valueChange', $value);
	}
</script>

<svelte:window use:preventScroll={$isOpen} />
<slot />
