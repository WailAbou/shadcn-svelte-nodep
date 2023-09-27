<script lang="ts">
	import type { InitProps } from '$lib/helpers/types';
	import { cn, handleKeyboardInteraction, hasValue } from '$lib/helpers/utils';
	import { getContext, setContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { TabsActivationMode } from '.';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let loop: boolean = true;

	let activeIndex = 0;
	let activeStores: Writable<boolean>[] = [];
	let tabsTriggers: HTMLButtonElement[] = [];
	let { selectedValueStore, activationMode }: { selectedValueStore: Writable<string>; activationMode: TabsActivationMode } = getContext('tabs');

	setContext('tabs-list', init);

	function init(accordionTrigger: Node, { store: expandedStore, value, initResult }: InitProps<boolean>) {
		activeStores.push(expandedStore);
		tabsTriggers.push(accordionTrigger as HTMLButtonElement);

		let index = activeStores.length - 1;
		if (hasValue($selectedValueStore, value)) select(index, value);
		const toggleItem = () => toggle(index);

		[initResult.toggleItem, initResult.index] = [toggleItem, index];
	}

	function toggle(index: number) {
		focus(index);
		select(index, tabsTriggers[index].value);
	}

	function focus(index: number) {
		tabsTriggers[index]?.focus();
		activeIndex = index;
	}

	function select(index: number, newValue: string) {
		activeStores.forEach((activeStore) => activeStore.set(false));
		activeStores[index].set(true);
		$selectedValueStore = newValue;
	}

	const handleNavigation = (event: KeyboardEvent) => {
		const selectMethod = activationMode == 'automatic' ? toggle : focus;
		handleKeyboardInteraction({ event, activeIndex, max: activeStores.length, next: selectMethod, previous: selectMethod, navDir: 'horizontal', loop });
	};
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
