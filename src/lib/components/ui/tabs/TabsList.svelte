<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { createInit, handleKeyboardInteraction } from '$lib/helpers/state';
	import { getContext, setContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { TabsActivationMode } from '.';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let loop: boolean = true;

	let activeIndex = 0;
	let { selectedValue, activationMode }: { selectedValue: Writable<string>; activationMode: TabsActivationMode } = getContext('tabs');

	const [init, values, actives, tabsTriggers] = createInit($selectedValue, select, toggle);
	const handleNavigation = (event: KeyboardEvent) => handleKeyboardInteraction({ event, activeIndex, max: actives.length, next: selectMethod, previous: selectMethod, navDir: 'horizontal', loop });

	setContext('tabs-list', init);

	$: selectMethod = activationMode == 'automatic' ? toggle : focus;

	function toggle(index: number) {
		focus(index);
		select(index);
	}

	function focus(index: number) {
		tabsTriggers[index]?.focus();
		activeIndex = index;
	}

	function select(index: number) {
		actives.forEach((active) => active.set(false));
		actives[index].set(true);
		$selectedValue = values[index];
	}
</script>

<div
	on:keydown={handleNavigation}
	role="tablist"
	aria-orientation="horizontal"
	tabindex="0"
	data-orientation="horizontal"
	style="outline: none;"
	class={cn('h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', className)}
>
	<slot />
</div>
