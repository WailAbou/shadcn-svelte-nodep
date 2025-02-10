<script lang="ts">
	import { ToastAction, ToastClose, ToastDescription, ToastTitle } from '.';

	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let actionLabel: string | undefined = undefined;
</script>

<li
	role="status"
	aria-live="off"
	aria-atomic="true"
	tabindex="0"
	data-state="open"
	data-swipe-direction="right"
	class="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border bg-background p-6 pr-8 text-foreground shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full"
	style="user-select: none; touch-action: none;"
>
	<div class="grid gap-1">
		{#if title}
			<ToastTitle>{title}</ToastTitle>
		{/if}
		{#if description}
			<ToastDescription>{description}</ToastDescription>
		{/if}
	</div>
	{#if actionLabel}
		<ToastAction>{actionLabel}</ToastAction>
	{/if}
	<ToastClose />
</li>
