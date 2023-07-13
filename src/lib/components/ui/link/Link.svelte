<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };

    export let href: string | null | undefined = undefined;
    export let target: HTMLAnchorAttributes["target"] = undefined;
	export let newTab: boolean = false;

	if (newTab) target = "_blank";
</script>

<a {href} class={cn("underline text-primary hover:text-primary/50 visited:text-primary/50", className)} {...$$restProps} {target} on:click on:change on:keydown on:keyup on:mouseenter on:mouseleave>
	<slot />
</a>