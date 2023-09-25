<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: number | null;
	export let max: number = 100;
	export let getValueLabel = defaultGetValueLabel;

	$: progressState = value == null ? 'indeterminate' : value === max ? 'complete' : 'loading';
	$: valueLabel = value != null ? getValueLabel() : null;

	function defaultGetValueLabel() {
		return `${Math.round(((value ?? 0) / max) * 100)}%`;
	}
</script>

<div
	role="progressbar"
	aria-valuemin={0}
	aria-valuemax={max}
	aria-valuenow={value}
	aria-valuetext={valueLabel}
	data-state={progressState}
	data-max={max}
	data-value={value}
	class={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
>
	<div data-state={progressState} data-max={max} data-value={value} class="h-full w-full flex-1 bg-primary transition-all" style="transform: translateX(-{100 - (value ?? -1)}%);"></div>
</div>
