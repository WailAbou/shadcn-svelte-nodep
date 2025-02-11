<script lang="ts">
	import { Button } from '$components/ui/button';
	import { useToast, toastVariants } from '$components/ui/toast';
	import { Options } from '$components/custom/options';
	import type { VariantProps } from 'class-variance-authority';

	let index: number = 0;
	let variants: VariantProps<typeof toastVariants>['variant'][] = ['default', 'affirmative', 'destructive'];
</script>

<Options>
	<Button on:click={() => (index = (index + 1) % variants.length)}>Variant: {variants[index]}</Button>
</Options>

<Button
	variant={variants[index]}
	on:click={() =>
		useToast({
			variant: variants[index],
			title: 'Scheduled: Catch up',
			description: 'Friday, February 10, 2023 at 5:57 PM',
			actionLabel: 'Undo'
		})}
>
	Show Toast
</Button>
