<script lang="ts">
	import { InitResult, type InitFunction } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';
	import { Check } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;

	let initResult: InitResult = new InitResult();
	let selected: Writable<boolean> = writable(false);
	let uuid = crypto.randomUUID();

	let { disabled, init }: { disabled: boolean; init: InitFunction } = getContext('select');
</script>

<div
	use:init={[selected, value, initResult]}
	on:click={initResult.toggleItem}
	data-disabled={disabled ? true : undefined}
	aria-labelledby={uuid}
	role="option"
	aria-selected="false"
	data-state="unchecked"
	tabindex="-1"
	class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		{#if $selected}
			<span aria-hidden="true">
				<Check class="h-4 w-4" />
			</span>
		{/if}
	</span>
	<span id={uuid}>
		<slot />
	</span>
</div>
