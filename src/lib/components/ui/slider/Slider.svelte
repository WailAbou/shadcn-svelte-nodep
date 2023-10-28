<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { TestTube } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ valueChange: number }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: number = 0;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;
	export let disabled: boolean = false;

	let value: number;
	let isDragging: boolean = false;
	let scrollArea: HTMLDivElement;
	let handleX: number;

	const mappedDefaultValue = ((defaultValue - min) / (max - min)) * 100;
	updateValues(mappedDefaultValue);

	const onMouseMove = (event: MouseEvent) => {
		if (isDragging) {
			const start = scrollArea.getBoundingClientRect().x;
			const end = start + scrollArea.clientWidth;
			const absolutePercentage = ((event.clientX - start) / (end - start)) * 100;
			updateValues(absolutePercentage);
		}
	};

	function updateValues(value: number) {
		const steppedPercentage = Math.round(value * (1 / step)) / (1 / step);
		const clampedPercentage = Math.min(Math.max(steppedPercentage, 0), 100);
		const mappedValue = Math.round((clampedPercentage / 100) * (max - min) + min);

		handleX = clampedPercentage;
		value = mappedValue;
		dispatch('valueChange', value);
	}
</script>

<svelte:window on:mousemove={onMouseMove} on:mouseup={() => (isDragging = false)} />

<span
	dir="ltr"
	data-orientation="horizontal"
	on:mousedown={(e) => {
		isDragging = true;
		onMouseMove(e);
	}}
	aria-disabled={disabled}
	class={cn('relative flex touch-none select-none items-center aria-disabled:pointer-events-none aria-disabled:opacity-50', className)}
>
	<span bind:this={scrollArea} data-orientation="horizontal" class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
		<span data-orientation="horizontal" class="absolute left-0 h-full bg-primary" style="right: {100 - handleX}%;"></span>
	</span>
	<span style="left: {handleX}%" class="absolute translate-x-[-50%]">
		<span
			role="slider"
			aria-orientation="horizontal"
			data-orientation="horizontal"
			tabindex="0"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			class="aria block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		>
		</span>
	</span>
</span>
<input {value} class="hidden" {disabled} />
