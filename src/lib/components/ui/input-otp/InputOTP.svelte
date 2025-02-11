<script lang="ts">
	import { createState } from '$lib/helpers/state';
	import { cn } from '$lib/helpers/utils';
	import { createEventDispatcher, setContext } from 'svelte';
	import { get } from 'svelte/store';

	const dispatch = createEventDispatcher<{ valueChange: string }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let maxLength: number;
	export let pattern: RegExp = /^\d+$/;
	export let disabled: boolean = false;

	let value: string;

	let {
		methods: { init },
		variables: { values, items, activeIndex }
	} = createState(undefined, select);
	setContext('input-otp', { init });

	function select(index: number) {
		items.forEach((item) => item.set(false));
		if (index !== -1) items[index].set(true);

		value = values
			.flatMap((value) => get(value))
			.join('')
			.trim();
		dispatch('valueChange', value);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Backspace' && $activeIndex === maxLength - 1 && get(values[$activeIndex])) {
			values[$activeIndex].set('');
		} else if (event.key === 'Backspace') {
			activeIndex.update((i) => Math.max(i - 1, 0));
			select($activeIndex);
			values[$activeIndex].set('');
		} else if (pattern.test(event.key)) {
			values[$activeIndex].set(event.key);
			activeIndex.update((i) => Math.min(i + 1, maxLength - 1));
			select($activeIndex);
		}
	}
</script>

<div data-input-otp-container="true" class={cn('pointer-events-none relative flex cursor-text select-none items-center gap-2 has-[:disabled]:opacity-50', className)}>
	<slot />
	<div class="pointer-events-none absolute inset-0">
		<input
			on:focusin={() => select(get(activeIndex))}
			on:focusout={() => select(-1)}
			on:keydown={onKeydown}
			autocomplete="one-time-code"
			class="pointer-events-auto absolute inset-0 flex h-full w-full border-0 bg-transparent text-left font-mono text-[40px] tabular-nums leading-none tracking-tighter text-transparent caret-transparent opacity-0 shadow-none outline-none disabled:cursor-not-allowed"
			data-input-otp="true"
			inputmode="numeric"
			pattern={pattern.source}
			maxlength={maxLength}
			{value}
			{disabled}
		/>
	</div>
</div>
