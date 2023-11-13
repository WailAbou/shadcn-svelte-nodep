<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { clickOutside, focusTrap } from '$lib/helpers/actions';
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
		use:clickOutside={[() => isOpen.set(false)]}
		use:focusTrap
		data-state={$isOpen ? 'open' : 'closed'}
		role="dialog"
		class={cn(
			'pointer-events-auto fixed inset-y-0 right-0 z-50 h-full w-3/4 gap-4 border-l bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
			className
		)}
		tabindex="-1"
	>
		<slot />
	</div>
{/if}
