<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$components/ui/radio-group';
	import { Label } from '$components/ui/label';
	import { Button } from '$components/ui/button';
	import { Options } from '$components/custom/options';

	let value: undefined | string;
	let disabled: boolean = false;

	$: uid = { disabled };
</script>

<Options>
	<p class="flex items-center justify-center">Value: {value}</p>
	<Button on:click={() => (disabled = !disabled)}>Disabled: {disabled}</Button>
</Options>

{#key uid}
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
{/key}
