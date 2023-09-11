<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn('grid gap-4 p-6 pt-0', className)}>
	<slot />
</div>
