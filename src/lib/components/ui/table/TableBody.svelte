<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<tbody class={cn('[&amp;_tr:last-child]:border-0', className)}>
	<slot />
</tbody>
