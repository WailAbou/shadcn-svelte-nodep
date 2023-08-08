<script lang="ts">
	import { cn, hasValue } from "$lib/utils";
	import { getContext, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
	export let disabled: boolean = false;

	let expandedStore: Writable<boolean> = writable(false);
	const toggleItem = () => toggle(value, expandedStore);

	let { defaultValue, toggle }: { defaultValue: undefined | string | string[], toggle: (newValue: string, expandedStore: Writable<boolean>) => void }  = getContext('accordion');
	setContext('accordionItem', { expandedStore, toggleItem });

	if (hasValue(defaultValue, value)) toggleItem();

</script>

<div aria-disabled={disabled} class="{cn("border-b aria-disabled:opacity-50 aria-disabled:pointer-events-none", className)}">
	<slot />
</div>
