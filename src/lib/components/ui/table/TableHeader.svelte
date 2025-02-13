<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<thead class={cn('[&amp;_tr]:border-b', className)}>
	<slot />
</thead>
