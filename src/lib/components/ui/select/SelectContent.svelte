<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div
	data-radix-popper-content-wrapper=""
	dir="ltr"
	style="position: fixed; left: 0px; top: 0px; transform: translate(617.333px, 598px); min-width: max-content; --radix-popper-transform-origin: 0% 0px; will-change: transform; z-index: 50; --radix-popper-available-width: 522.1666870117188px; --radix-popper-available-height: 380.33331298828125px; --radix-popper-anchor-width: 180px; --radix-popper-anchor-height: 40px;"
>
	<div
		data-side="bottom"
		data-align="start"
		role="listbox"
		id="radix-:r4l:"
		data-state="open"
		dir="ltr"
		class="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
		tabindex="-1"
		style="box-sizing: border-box; display: flex; flex-direction: column; outline: none; --radix-select-content-transform-origin: var(--radix-popper-transform-origin); --radix-select-content-available-width: var(--radix-popper-available-width); --radix-select-content-available-height: var(--radix-popper-available-height); --radix-select-trigger-width: var(--radix-popper-anchor-width); --radix-select-trigger-height: var(--radix-popper-anchor-height); pointer-events: auto;"
	>
		<div
			data-radix-select-viewport=""
			role="presentation"
			class="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] p-1"
			style="position: relative; flex: 1 1 0%; overflow: auto;"
		>
			<slot />
		</div>
	</div>
</div>

<style>
	[data-radix-select-viewport] {
		scrollbar-width: none;
		-ms-overflow-style: none;
		-webkit-overflow-scrolling: touch;
	}
	[data-radix-select-viewport]::-webkit-scrollbar {
		display: none;
	}
</style>
