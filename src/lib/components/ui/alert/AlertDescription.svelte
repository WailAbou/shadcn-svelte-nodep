<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn('text-sm [&_p]:leading-relaxed', className)}>
	<slot />
</div>
