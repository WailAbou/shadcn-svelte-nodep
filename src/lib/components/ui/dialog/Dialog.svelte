<script lang="ts">
	import { createEventDispatcher, setContext } from "svelte";
    import { writable, type Writable } from "svelte/store";

    const dispatch = createEventDispatcher<{openChange: boolean}>();

    export let defaultOpen: boolean = false;
    export let open: boolean = false;

    if (defaultOpen) open = true;
    let isOpenStore: Writable<boolean> = writable(open);
    
    $: $isOpenStore = open;
    $: dispatch("openChange", $isOpenStore);

    setContext("alert-dialog", isOpenStore);

    function onWheel(event: WheelEvent): void {
        if ($isOpenStore) event.preventDefault();
    }

    function onKeydown({ key }: KeyboardEvent): void {
        if (key === "Escape") $isOpenStore = false;
    }
</script>

<svelte:window on:wheel|nonpassive={onWheel} on:keydown={onKeydown}  />
<slot />