<script lang="ts">
    import { cn } from "$lib/utils";
	import { setContext } from "svelte";
	import type { Writable } from "svelte/store";

    let className: string | undefined | null = undefined;
    export { className as class };

    export let defaultValue: string | undefined = undefined;
    export let disabled: boolean = false;

    let previousCheckedStore: Writable<boolean>;

    setContext('radio-group', { defaultValue, disabled, toggle });

    function toggle(checkedStore: Writable<boolean>) {
        if (previousCheckedStore) $previousCheckedStore = false;
        checkedStore.set(true);
        previousCheckedStore = checkedStore;
    }
</script>

<div role="radiogroup" aria-required="false" dir="ltr" tabindex="0" class="{cn("grid gap-2 outline-none", className)}">
    <slot />
</div>