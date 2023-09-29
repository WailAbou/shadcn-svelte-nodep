<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { createAnimationEnd } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isOpen: Writable<boolean> = getContext('alert-dialog');
	let [finishedAnimation, onAnimationEnd] = createAnimationEnd(isOpen);
</script>

{#if $isOpen || !$finishedAnimation}
	<div
		data-state={$isOpen ? 'open' : 'closed'}
		class="pointer-events-auto fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
		data-aria-hidden="true"
		aria-hidden="true"
	/>
	<div
		on:animationend={onAnimationEnd}
		role="alertdialog"
		data-state={$isOpen ? 'open' : 'closed'}
		class={cn(
			className,
			'pointer-events-auto fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full'
		)}
		tabindex="-1"
	>
		<slot />
	</div>
{/if}
