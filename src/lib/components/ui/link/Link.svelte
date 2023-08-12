<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let href: string | null | undefined = undefined;
	export let target: HTMLAnchorAttributes['target'] = undefined;
	export let newTab: boolean = false;

	if (newTab) target = '_blank';
</script>

<a {href} {target} {...$$restProps} class={cn('text-primary underline visited:text-primary/50 hover:text-primary/50', className)} on:click on:change on:keydown on:keyup on:mouseenter on:mouseleave>
	<slot />
</a>
