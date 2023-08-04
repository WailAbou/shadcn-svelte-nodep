<script lang="ts">
	import { clickOutside, cn } from "$lib/utils";
	import { X } from "lucide-svelte";
    import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

    let className: string | undefined | null = undefined;
	export { className as class };

    let isOpenStore: Writable<boolean> = getContext("alert-dialog");
</script>


{#if $isOpenStore}
    <div data-state="open" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" style="pointer-events: auto;" data-aria-hidden="true" aria-hidden="true"></div>
    <div use:clickOutside={() => $isOpenStore = false} role="alertdialog" id="radix-:r1ac:" aria-describedby="radix-:r1ae:" aria-labelledby="radix-:r1ad:" data-state="open" class="{cn(className, "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full")}" tabindex="-1" style="pointer-events: auto;">
        <slot />
        <button type="button" class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X class="h-4 w-4"/><span class="sr-only">Close</span>
        </button>
    </div>
{/if}