<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	let uuid: string = getContext('select-group');
</script>

<div id={uuid} class={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}>
	<slot />
</div>
