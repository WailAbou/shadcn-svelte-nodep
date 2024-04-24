<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let href: string | null | undefined = undefined;
</script>

<a class={cn('transition-colors hover:text-foreground', className)} {href}>
	<slot />
</a>