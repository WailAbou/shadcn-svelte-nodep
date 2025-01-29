<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { Dot } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div role="separator" class={cn(className)}>
	<Dot />
</div>
