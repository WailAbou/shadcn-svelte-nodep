<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { ChevronDown } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let placeholder: string;
</script>

<span class={cn('pointer-events-none', className)}>{placeholder}</span>
<ChevronDown class="h-4 w-4" />
