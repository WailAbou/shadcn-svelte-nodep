<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
</script>

<div
	role="option"
	aria-labelledby="radix-:rfr:"
	aria-selected="false"
	data-state="unchecked"
	tabindex="-1"
	class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
	data-radix-collection-item=""
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"></span><span id="radix-:rfr:"><slot /></span>
</div>
