<script lang="ts">
	import { Toast } from '.';
	import { toasts, maxToasts } from './toast';

	export let toastLimit: number = 1;
	$: maxToasts.set(toastLimit);
</script>

<div role="region" aria-label="Notifications (F8)" tabindex="-1" style="">
	{#if $toasts.length > 0}
		<span aria-hidden="true" tabindex="0" class="clip-rect fixed m-[-1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap break-normal border-0 p-0"> </span>
	{/if}

	<ol tabindex="-1" class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
		{#each $toasts as toast (toast.id)}
			<Toast {toast} />
		{/each}
	</ol>

	{#if $toasts.length > 0}
		<span aria-hidden="true" tabindex="0" class="clip-rect fixed m-[-1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap break-normal border-0 p-0"> </span>
	{/if}
</div>
