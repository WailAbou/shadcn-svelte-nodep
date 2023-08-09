<script lang="ts">
	import { clickOutside, cn } from "$lib/utils";
    import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

    let className: string | undefined | null = undefined;
	export { className as class };

    let isOpenStore: Writable<boolean> = getContext("alert-dialog");
    let finishedAnimation: boolean = true;
    $: { if ($isOpenStore) finishedAnimation = false; }

    function onAnimationend(event: AnimationEvent) {
        if (event.animationName === "exit") finishedAnimation = true;   
    }
</script>

{#if $isOpenStore || !finishedAnimation}
    <div data-state={$isOpenStore ? 'open' : 'closed'} class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-auto" data-aria-hidden="true" aria-hidden="true"></div>
    <div on:animationend={onAnimationend} use:clickOutside={() => $isOpenStore = false} role="alertdialog" data-state={$isOpenStore ? 'open' : 'closed'} class="{cn(className, "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full pointer-events-auto")}" tabindex="-1">
        <slot />
    </div>
{/if}