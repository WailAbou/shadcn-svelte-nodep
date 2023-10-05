<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<button
	type="button"
	role="combobox"
	aria-controls="radix-:r4l:"
	aria-expanded="false"
	aria-autocomplete="none"
	dir="ltr"
	data-state="closed"
	class={cn(
		'flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
>
	<slot />
</button>
