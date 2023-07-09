<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SeparatorOrientation } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	export let orientation: SeparatorOrientation = "horizontal";
	export let decorative: boolean = true;

    const ariaOrientation = orientation === 'vertical' ? orientation : undefined;
    const semanticProps = decorative ? { role: 'none' } : { 'aria-orientation': ariaOrientation, role: 'separator' };

</script>

<div {...semanticProps} class={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}/>