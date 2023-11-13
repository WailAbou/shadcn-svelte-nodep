<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { clickOutside, focusTrap } from '$lib/helpers/actions';
	import { createAnimationEnd } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { VariantProps } from 'class-variance-authority';
	import { sheetVariants } from './sheetVariants';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let side: VariantProps<typeof sheetVariants>['side'] = 'right';

	let isOpen: Writable<boolean> = getContext('sheet');
	let [finishedAnimation, onAnimationEnd] = createAnimationEnd(isOpen);
</script>

{#if $isOpen || !$finishedAnimation}
	<div
		on:animationend={onAnimationEnd}
		data-state={$isOpen ? 'open' : 'closed'}
		class="pointer-events-auto fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
		data-aria-hidden="true"
		aria-hidden="true"
	/>
	<div use:clickOutside={[() => isOpen.set(false)]} use:focusTrap data-state={$isOpen ? 'open' : 'closed'} role="dialog" class={cn(sheetVariants({ side, className }))} tabindex="-1">
		<slot />
	</div>
{/if}
