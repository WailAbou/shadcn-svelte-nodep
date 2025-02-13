<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let colSpan: number | undefined = undefined;
</script>

<td class={cn('[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle font-medium', className)} colspan={colSpan}>
	<slot />
</td>
