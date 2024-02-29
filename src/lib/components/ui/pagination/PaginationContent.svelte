<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<ul class={cn('flex flex-row items-center gap-1', className)}>
	<slot />
</ul>
