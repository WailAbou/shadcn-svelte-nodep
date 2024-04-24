<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<li class={cn('inline-flex items-center gap-1.5', className)}>
	<slot />
</li>
