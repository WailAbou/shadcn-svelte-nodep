<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { onMount } from 'svelte';
	import { ToastAction, ToastClose, ToastDescription, ToastTitle } from '.';
	import { toastVariants } from './toastVariants';
	import { type Toast, toasts, maxToasts } from './toast';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let toast: Toast;

	let timer: ReturnType<typeof setTimeout>;
	let swipeState: string | null = null;
	let startX: number | null = null;
	let moveX: number = 0;
	let endX: number = window.innerWidth;

	function startTimer() {
		timer = setTimeout(() => (toast.open = false), 5000);
	}

	function clearTimer() {
		clearTimeout(timer);
	}

	function onTransitionEnd(event: TransitionEvent) {
		if (!toast.open && swipeState === 'end') {
			closeToast();
		}
	}

	function onAnimationEnd(event: AnimationEvent) {
		if (event.animationName === 'exit' && !toast.open && swipeState === null) {
			closeToast();
		}
	}

	function closeToast() {
		toasts.update((currentToasts) => currentToasts.filter((t) => t.id !== toast.id));
		clearTimer();
	}

	function onPointerdown(event: PointerEvent) {
		startX = event.clientX;
		swipeState = null;
		moveX = 0;
	}

	function onPointerMove(event: PointerEvent) {
		if (startX !== null) {
			const dx = event.clientX - startX;
			if (dx > 0) {
				swipeState = 'move';
				moveX = dx;
			}
		}
	}

	function onPointerUp() {
		if (swipeState === 'move') {
			const threshold = 100;
			if (moveX > threshold) {
				swipeState = 'end';
				toast.open = false;
			} else {
				swipeState = 'cancel';
				moveX = 0;
			}
		}
		startX = null;
	}

	onMount(startTimer);

	$: if ($toasts.length > $maxToasts) {
		const oldestToast = $toasts.sort((t1, t2) => t1.id - t2.id)?.at(0);
		if (oldestToast?.id === toast?.id) toast.open = false;
	}
</script>

<li
	role="status"
	aria-live="off"
	aria-atomic="true"
	tabindex="0"
	data-state={toast.open ? 'open' : 'closed'}
	data-swipe-direction="right"
	data-swipe={swipeState}
	style="--toast-swipe-move-x: {moveX}px; --toast-swipe-end-x: {endX}px;"
	class={cn(toastVariants({ variant: toast.variant }), className)}
	on:transitionend={onTransitionEnd}
	on:animationend={onAnimationEnd}
	on:mouseenter={clearTimer}
	on:mouseleave={startTimer}
	on:pointerdown={onPointerdown}
	on:pointermove={onPointerMove}
	on:pointerup={onPointerUp}
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
		<ToastAction
			on:click={() => {
				toast.open = false;
				toast.actionEvent?.();
			}}
		>
			{toast.actionLabel}
		</ToastAction>
	{/if}
	<ToastClose on:click={() => (toast.open = false)} />
</li>
