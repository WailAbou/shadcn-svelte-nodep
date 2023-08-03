<script lang="ts">
	import { createEventDispatcher, setContext } from "svelte";
    import { writable, type Writable } from "svelte/store";

    const dispatch = createEventDispatcher<{openChange: boolean}>();

    export let defaultOpen: boolean = false;
    
    let isOpenStore: Writable<boolean> = writable(defaultOpen);
    $: dispatch("openChange", $isOpenStore);

    setContext("alert-dialog", isOpenStore);

    const wheel = (node: HTMLElement) => {
        const handler = (e: Event) => { if ($isOpenStore) e.preventDefault(); };
        node.addEventListener('wheel', handler, { passive: false });
        return { destroy() { node.removeEventListener('wheel', handler); }};
    };
</script>

<svelte:window use:wheel />
<slot />