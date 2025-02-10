<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { createState, createKeyboardNavigation } from '$lib/helpers/state';
	import { getContext, setContext } from 'svelte';
	import { get, type Writable } from 'svelte/store';
	import type { TabsActivationMode } from '.';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let loop: boolean = true;

	let { selectedValue, activationMode }: { selectedValue: Writable<string>; activationMode: TabsActivationMode } = getContext('tabs');
	let {
		methods: { init, toggle, focus },
		variables: { values, items, activeIndex }
	} = createState($selectedValue, select);
	const onKeyDown = (e: KeyboardEvent) => createKeyboardNavigation(e, selectMethod, activeIndex, items.length, 'horizontal', false, false, loop);

	setContext('tabs-list', init);

	$: selectMethod = activationMode == 'automatic' ? toggle : focus;

	function select(index: number) {
		items.forEach((item) => item.set(false));
		items[index].set(true);
		$selectedValue = get(values[index]);
	}
</script>

<div
	on:keydown={onKeyDown}
	role="tablist"
	aria-orientation="horizontal"
	tabindex="0"
	data-orientation="horizontal"
	style="outline: none;"
	class={cn('h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', className)}
>
	<slot />
</div>
