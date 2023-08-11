<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$components/ui/radio-group';
	import { Label } from '$components/ui/label';
	import { Separator } from '$components/ui/separator';

	let value: undefined | string;
	let disabled: boolean = false;
</script>

<div class="grid grid-cols-1">
	<p>Value: {value}</p>
	<button on:click={() => (disabled = !disabled)}>dis</button>
</div>

<Separator class="my-5" />

<RadioGroup {disabled} on:valueChange={({ detail: newValue }) => (value = newValue)}>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value="default" id="r1" />
		<Label htmlFor="r1">Default</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value="comfortable" id="r2" />
		<Label htmlFor="r2">Comfortable</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value="compact" id="r3" />
		<Label htmlFor="r3">Compact</Label>
	</div>
</RadioGroup>
