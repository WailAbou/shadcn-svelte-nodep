<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<caption class={cn('mt-4 text-sm text-muted-foreground', className)}>
	<slot />
</caption>
