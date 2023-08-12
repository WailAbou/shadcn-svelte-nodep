<script lang="ts">
	import { Label } from '$components/ui/label';
	import { Switch } from '$components/ui/switch';
	import { Button } from '$components/ui/button';
	import { Options } from '$components/custom/options';

	let disabled: boolean = false;

	$: uid = { disabled };
</script>

<Options>
	<Button on:click={() => (disabled = !disabled)}>Disabled: {disabled}</Button>
</Options>

{#key uid}
	<div class="flex items-center space-x-2">
		<Switch {disabled} id="airplane-mode" />
		<Label htmlFor="airplane-mode">Airplane Mode</Label>
	</div>
{/key}
