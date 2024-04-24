<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<span role="link" aria-disabled="true" aria-current="page" class={cn('font-normal text-foreground', className)}>
	<slot />
</span>
