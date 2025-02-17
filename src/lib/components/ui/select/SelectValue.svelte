<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { ChevronDown } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let placeholder: string;

	let { valuePlaceholder }: { valuePlaceholder: Writable<string> } = getContext('select');
</script>

<span class={cn('pointer-events-none', className)}>
	{$valuePlaceholder || placeholder}
</span>
<ChevronDown class="h-4 w-4" />
