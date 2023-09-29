<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let href: string | null | undefined = undefined;
	export let target: HTMLAnchorAttributes['target'] = undefined;
	export let newTab: boolean = false;

	if (newTab) target = '_blank';
</script>

<a
	{href}
	{target}
	{...$$restProps}
	class={cn('font-semibold text-primary underline-offset-2 visited:text-primary/50 hover:cursor-pointer hover:text-primary/50 hover:underline', className)}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<slot />
</a>
