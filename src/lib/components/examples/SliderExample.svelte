<script lang="ts">
	import { Slider } from '$components/ui/slider';
	import { Options } from '$components/custom/options';
	import { Button } from '$components/ui/button';

	let value: number;
	let disabled: boolean = false;
	$: step = steps[stepIndex];
	$: range = ranges[rangeIndex];

	let steps: number[] = [1, 5, 20, 50];
	let ranges: number[][] = [
		[0, 100],
		[10, 50],
		[20, 40]
	];
	let [stepIndex, rangeIndex] = [0, 0];

	$: uid = { disabled, step, range };
</script>

<Options>
	<p class="flex items-center justify-center">Value: {value}</p>
	<Button on:click={() => (disabled = !disabled)}>Disabled: {disabled}</Button>
	<Button on:click={() => (stepIndex = (stepIndex + 1) % steps.length)}>Step Size: {step}</Button>
	<Button on:click={() => (rangeIndex = (rangeIndex + 1) % ranges.length)}>Range: {range[0]} - {range[1]}</Button>
</Options>

{#key uid}
	<Slider on:valueChange={({ detail: newValue }) => (value = newValue)} defaultValue={(range[0] + range[1]) / 2} min={range[0]} max={range[1]} {step} {disabled} />
{/key}
