<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h3 class={cn('text-2xl font-semibold leading-none tracking-tight', className)}>
	<slot />
</h3>
