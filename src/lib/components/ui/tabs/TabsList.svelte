<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div
	role="tablist"
	aria-orientation="horizontal"
	tabindex="0"
	data-orientation="horizontal"
	style="outline: none;"
	class={cn('h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', className)}
>
	<slot />
</div>
