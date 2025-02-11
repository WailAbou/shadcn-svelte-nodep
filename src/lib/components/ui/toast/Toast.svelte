<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { onMount } from 'svelte';
	import { ToastAction, ToastClose, ToastDescription, ToastTitle } from '.';
	import { toastVariants } from './toastVariants';
	import { type Toast, toasts } from './toast';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let toast: Toast;

	let timer: ReturnType<typeof setTimeout>;

	function startTimer() {
		timer = setTimeout(() => {
			toast.open = false;
			console.log('close');
		}, 5000);
	}

	function clearTimer() {
		clearTimeout(timer);
	}

	function onAnimationEnd(event: AnimationEvent) {
		if (event.animationName === 'exit') {
			closeToast();
		}
	}

	function closeToast() {
		toasts.update((currentToasts) => currentToasts.filter((t) => t !== toast));
		clearTimer();
	}

	onMount(() => {
		console.log('mount');
		startTimer();
	});
</script>

<li
	role="status"
	aria-live="off"
	aria-atomic="true"
	tabindex="0"
	data-state={toast.open ? 'open' : 'closed'}
	data-swipe-direction="right"
	class={cn(toastVariants({ variant: toast.variant }), className)}
	on:animationend={onAnimationEnd}
	on:mouseenter={clearTimer}
	on:mouseleave={startTimer}
>
	<div class="grid gap-1">
		{#if toast.title}
			<ToastTitle>{toast.title}</ToastTitle>
		{/if}
		{#if toast.description}
			<ToastDescription>{toast.description}</ToastDescription>
		{/if}
	</div>
	{#if toast.actionLabel}
		<ToastAction>{toast.actionLabel}</ToastAction>
	{/if}
	<ToastClose on:click={closeToast} />
</li>
