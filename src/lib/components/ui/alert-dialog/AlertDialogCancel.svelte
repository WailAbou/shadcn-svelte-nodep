<script lang="ts">
	import { Button } from "$components/ui/button";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

    let isOpenStore: Writable<boolean> = getContext("alert-dialog");
</script>

<Button variant="outline" on:click={() => $isOpenStore = !$isOpenStore}>
    <slot />
</Button>