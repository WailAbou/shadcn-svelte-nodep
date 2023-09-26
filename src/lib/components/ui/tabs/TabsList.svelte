<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { setContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	const focusNext = () => focus((focusedIndex + 1) % tabsTriggers.length);
	const focusPrevious = () => focus((focusedIndex - 1 + tabsTriggers.length) % tabsTriggers.length);

	let focusedIndex = 0;
	let tabsTriggers: Writable<boolean>[] = [];

	setContext('tabs-list', tabsTriggers);

	function focus(index: number) {
		focusedIndex = index;
		tabsTriggers.forEach((trigger, i) => trigger.set(i == focusedIndex));
		console.log(focusedIndex);
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
