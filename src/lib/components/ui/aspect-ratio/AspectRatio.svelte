<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let ratio: number = 1;
</script>

<div class="relative w-full" style="padding-bottom: {100 / ratio}%;">
	<div class={cn('absolute inset-0', className)}>
		<slot />
	</div>
</div>
