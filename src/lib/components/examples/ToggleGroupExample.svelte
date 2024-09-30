<script lang="ts">
	import { Options } from '$components/custom/options';
	import { Button } from '$components/ui/button';
	import { ToggleGroup, ToggleGroupItem, toggleVariants } from '$components/ui/toggle-group';
	import type { Orientation, SelectionMode } from '$lib/helpers/types';
	import type { VariantProps } from 'class-variance-authority';
	import { Bold, Italic, Underline } from 'lucide-svelte';

	let value: undefined | string | string[] = undefined;
	let type: SelectionMode = 'single';
	let variants: VariantProps<typeof toggleVariants>['variant'][] = ['default', 'outline'];
	let sizes: VariantProps<typeof toggleVariants>['size'][] = ['default', 'sm', 'lg'];
	let orientations: Orientation[] = ['horizontal', 'vertical'];
	let [variantIndex, sizeIndex, orientationIndex] = [0, 0, 0];
	let rovingFocus: boolean = true;
	let loop: boolean = true;
	let disabled: boolean = false;

	$: variant = variants[variantIndex];
	$: size = sizes[sizeIndex];
	$: orientation = orientations[orientationIndex];

	$: uid = { type, disabled, variant, size, orientation, rovingFocus, loop };
</script>

<Options>
	<p class="flex items-center justify-center">Value: {value}</p>
	<Button on:click={() => (type = type === 'single' ? 'multiple' : 'single')}>Type: {type}</Button>
	<Button on:click={() => (variantIndex = (variantIndex + 1) % variants.length)}>Variant: {variant}</Button>
	<Button on:click={() => (sizeIndex = (sizeIndex + 1) % sizes.length)}>Size: {size}</Button>
	<Button on:click={() => (orientationIndex = (orientationIndex + 1) % orientations.length)}>Orientation: {orientation}</Button>
	<Button on:click={() => (rovingFocus = !rovingFocus)}>Roving Focus: {rovingFocus}</Button>
	<Button on:click={() => (loop = !loop)}>Loop: {loop}</Button>
	<Button on:click={() => (disabled = !disabled)}>Disabled: {disabled}</Button>
</Options>

{#key uid}
	<ToggleGroup on:valueChange={({ detail: newValue }) => (value = newValue)} {type} {disabled} {variant} {size} {orientation} {rovingFocus} {loop}>
		<ToggleGroupItem value="bold" ariaLabel="Toggle bold">
			<Bold className="h-4 w-4" />
		</ToggleGroupItem>
		<ToggleGroupItem value="italic" ariaLabel="Toggle italic">
			<Italic className="h-4 w-4" />
		</ToggleGroupItem>
		<ToggleGroupItem value="underline" ariaLabel="Toggle underline">
			<Underline className="h-4 w-4" />
		</ToggleGroupItem>
	</ToggleGroup>
{/key}
