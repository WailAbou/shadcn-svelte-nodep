<script lang="ts">
	import { setContext } from "svelte";
    import { writable, type Writable } from "svelte/store";

    let isOpenStore: Writable<boolean> = writable(false);

    setContext("alert-dialog", isOpenStore);

    const wheel = (node: HTMLElement) => {
        const handler = (e: Event) => { if ($isOpenStore) e.preventDefault(); };
        node.addEventListener('wheel', handler, { passive: false });
        return { destroy() { node.removeEventListener('wheel', handler); }};
    };
</script>

<svelte:window use:wheel />
<slot />