<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let href: string | null | undefined = undefined;
	export let isActive: boolean = false;

	const activeClass = isActive ? 'border border-input bg-background' : '';
</script>

<a
	{...isActive ? { 'aria-current': 'page' } : {}}
	class={cn(
		'inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		activeClass,
		className
	)}
	{href}
>
	<slot />
</a>
