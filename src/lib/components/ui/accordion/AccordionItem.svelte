<script lang="ts">
	import { cn, hasValue } from "$lib/utils";
	import { getContext, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;

	let { defaultValue, collapisbleStore, toggleAllItems }: { defaultValue: undefined | string | string[], collapisbleStore: Writable<boolean>, toggleAllItems: (itemValue: string, callback: any) => void }  = getContext('accordion');
	let expandedStore = writable(false);

	setContext('accordionItem', { expandedStore, toggle });

	if (hasValue(defaultValue, value)) toggle();

	function toggle() {
		$expandedStore = $collapisbleStore ? !$expandedStore : true;
		toggleAllItems(value, expandedStore);
	}
</script>

<div class="{cn("border-b", className)}">
	<slot />
</div>
