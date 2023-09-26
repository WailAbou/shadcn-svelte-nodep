<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	const focusNext = () => focus((focusedIndex + 1) % $values.length);
	const focusPrevious = () => focus((focusedIndex - 1 + $values.length) % $values.length);

	let focusedIndex = 0;
	let values: Writable<string[]> = writable([]);
	let selectedValueStore: Writable<string> = getContext('tabs');

	setContext('tabs-list', values);

	function focus(index: number) {
		focusedIndex = index;
		$selectedValueStore = $values[focusedIndex];
	}

	function onNavigate(event: KeyboardEvent): void {
		const { key } = event;
		const next: boolean = key === 'ArrowRight';
		const previous: boolean = key === 'ArrowLeft';

		if (next || previous) {
			event.preventDefault();

			if (next) focusNext();
			else if (previous) focusPrevious();
		}
	}
</script>

<div
	on:keydown={onNavigate}
	role="tablist"
	aria-orientation="horizontal"
	tabindex="0"
	data-orientation="horizontal"
	style="outline: none;"
	class={cn('h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', className)}
>
	<slot />
</div>
