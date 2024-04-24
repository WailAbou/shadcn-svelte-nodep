<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<nav class={cn(className)} aria-label="breadcrumb">
	<slot />
</nav>
