<script lang="ts">
	import type { Orientation } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let orientation: Orientation = 'horizontal';
	export let decorative: boolean = true;

	const ariaOrientation = orientation === 'vertical' ? orientation : undefined;
	const semanticProps = decorative ? { role: 'none' } : { 'aria-orientation': ariaOrientation, role: 'separator' };
</script>

<div {...semanticProps} class={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)} />
