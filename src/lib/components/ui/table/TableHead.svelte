<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<th class={cn('[&amp;:has([role=checkbox])]:pr-0 h-12 w-[100px] px-4 text-left align-middle font-medium text-muted-foreground', className)}>
	<slot />
</th>
