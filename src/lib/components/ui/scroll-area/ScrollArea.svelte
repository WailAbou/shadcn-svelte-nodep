<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div dir="ltr" class={cn('relative overflow-hidden', className)}>
	<div class="h-full w-full overflow-x-hidden overflow-y-scroll rounded-[inherit]" data-scroll-area-viewport>
		<div style="min-width: 100%; display: table;">
			<slot />
		</div>
	</div>
	<div
		data-orientation="vertical"
		data-state="visible"
		class="absolute right-0 top-0 flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
		style="bottom: {0};"
	>
		<div data-state="visible" class="relative flex-1 rounded-full bg-border" style="height: {42.77981171548117}px; "></div>
	</div>
</div>

<style>
	[data-scroll-area-viewport] {
		scrollbar-width: none;
		-ms-overflow-style: none;
		-webkit-overflow-scrolling: touch;
	}
	[data-scroll-area-viewport]::-webkit-scrollbar {
		display: none;
	}
</style>
