<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<tfoot class={cn('[&amp;>tr]:last:border-b-0 border-t bg-muted/50 font-medium', className)}>
	<slot />
</tfoot>
