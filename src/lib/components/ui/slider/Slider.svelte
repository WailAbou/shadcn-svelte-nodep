<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: number;
	export let max: number = 100;
	export let min: number = 0;
	export let step: number = 1;
	export let inverted: boolean = false;
	export let disabled: boolean = false;

	let value: number = defaultValue;
</script>

<!-- <svelte:window on:mousemove={syncAreaToScrollBar} on:mouseup={() => (isDragging = false)} /> -->

<span dir="ltr" data-orientation="horizontal" aria-disabled="false" class={cn('relative flex touch-none select-none items-center', className)}>
	<span data-orientation="horizontal" class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
		<span data-orientation="horizontal" class="absolute h-full bg-primary" style="left: 0%; right: 50%;"></span>
	</span>
	<span style="left: calc(50% + 0px);" class="absolute translate-x-[-50%]">
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
