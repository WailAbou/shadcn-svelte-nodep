<script lang="ts">
	import { Progress } from '$components/ui/progress';
	import { Options } from '$components/custom/options';
	import { Button } from '$components/ui/button';

	let index: number = 0;
	let values: (number | null)[] = [33, 66, 100, null];

	$: value = values[index];

	function customGetValueLabel() {
		return `${Math.round((value ?? 0 / 100) * 100)}% Battery`;
	}
</script>

<Options>
	<Button on:click={() => (index = 0)}>Reset</Button>
	<Button on:click={() => (index = (index + 1) % values.length)}>Value: {values[index]}</Button>
</Options>

<Progress {value} />
