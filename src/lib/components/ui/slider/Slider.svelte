<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: number = 0;
	export let max: number = 100;
	export let min: number = 0;
	export let step: number = 30;
	export let disabled: boolean = false;

	let [scrollArea, scrollHandle]: HTMLDivElement[] = [];
	let value: number = defaultValue;
	let isDragging = false;

	const updateValue = (event: MouseEvent) => {
		if (isDragging) {
			const start = scrollArea.getBoundingClientRect().x;
			const end = start + scrollArea.clientWidth;
			const newX = Math.min(Math.max(event.clientX, start), end);
			const percentage = Math.round(((newX - start) / (end - start)) * 100);
			value = percentage;
		}
	};
</script>

<svelte:window on:mousemove={updateValue} on:mouseup={() => (isDragging = false)} />

<span dir="ltr" data-orientation="horizontal" aria-disabled="false" class={cn('relative flex touch-none select-none items-center', className)}>
	<span bind:this={scrollArea} data-orientation="horizontal" class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
		<span data-orientation="horizontal" class="absolute left-0 h-full bg-primary" style="right: {100 - value}%;"></span>
	</span>
	<span bind:this={scrollHandle} style="left: {value}%" class="absolute translate-x-[-50%]" on:mousedown={() => (isDragging = true)}>
		<span
			aria-disabled={disabled}
			role="slider"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-orientation="horizontal"
			data-orientation="horizontal"
			tabindex="0"
			aria-valuenow={value}
			class="aria block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50"
		>
		</span>
	</span>
</span>
<input {value} class="hidden" />
