<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { ChevronRight } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let href: string | null | undefined = undefined;
</script>

<a
	class={cn(
		'inline-flex h-10 items-center justify-center gap-1 whitespace-nowrap rounded-md px-4 py-2 pr-2.5 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	aria-label="Go to next page"
	{href}
>
	<span>Next</span>
	<ChevronRight class="h-4 w-4" />
</a>
