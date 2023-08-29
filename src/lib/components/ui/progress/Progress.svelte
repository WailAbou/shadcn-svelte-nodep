<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: number | null;
	export let max: number = 100;

	$: progressState = value == null ? 'indeterminate' : value === max ? 'complete' : 'loading';
</script>

<div
	role="progressbar"
	aria-valuemin={0}
	aria-valuemax={max}
	aria-valuenow={value}
	data-state={progressState}
	data-max={max}
	data-value={value}
	class="relative h-4 w-[60%] overflow-hidden rounded-full bg-secondary"
>
	<div data-state={progressState} data-max={max} data-value={value} class={cn(className, 'h-full w-full flex-1 bg-primary transition-all')} style="transform: translateX(-{100 - value}%);"></div>
</div>
