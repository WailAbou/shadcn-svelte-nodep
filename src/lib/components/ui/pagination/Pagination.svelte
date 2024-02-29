<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<nav role="navigation" aria-label="pagination" class={cn('mx-auto flex w-full justify-center', className)}>
	<slot />
</nav>
