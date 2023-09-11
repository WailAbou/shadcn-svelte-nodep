<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}>
	<slot />
</div>
