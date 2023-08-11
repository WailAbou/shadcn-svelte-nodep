<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let htmlFor: string;
</script>

<label class={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none', className)} for={htmlFor}>
	<slot />
</label>
