<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { Ellipsis } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<span role="presentation" aria-hidden="true" class={cn('flex h-4 w-4 items-center justify-center', className)}>
	<Ellipsis class="h-4 w-4" />
	<span class="sr-only">More</span>
</span>
