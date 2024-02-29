<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { MoreHorizontal } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<span aria-hidden="true" class={cn('flex h-9 w-9 items-center justify-center', className)}>
	<MoreHorizontal class="h-4 w-4" />
	<span class="sr-only">More pages</span>
</span>
