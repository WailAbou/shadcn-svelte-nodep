<script lang="ts">
	import { keyDown, hocus } from '$lib/helpers/actions';
	import type { InitResult, InitFunction } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';
	import { Check } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;

	let initResult: Writable<InitResult> = writable();
	let selected: Writable<boolean> = writable(false);
	let hocusState: Writable<boolean> = writable(false);
	let uuid = crypto.randomUUID();

	let { disabled, init }: { disabled: boolean; init: InitFunction } = getContext('select');

	$: if ($initResult?.currentValue) $selected = get($initResult.currentValue) === value;
</script>

<div
	use:init={[value, selected, initResult]}
	use:hocus={hocusState}
	use:keyDown={[hocusState, $initResult?.toggleItem, ['Space', 'Enter']]}
	on:click={$initResult?.toggleItem}
	data-disabled={disabled ? true : undefined}
	aria-labelledby={uuid}
	aria-selected={$selected}
	data-state={$selected ? 'checked' : 'uncheked'}
	role="option"
	tabindex="-1"
	class={cn(
		'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className
	)}
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
