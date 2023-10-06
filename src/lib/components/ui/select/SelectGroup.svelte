<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { setContext } from 'svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	let uuid: string = crypto.randomUUID();

	setContext(uuid, 'select-group');
</script>

<div aria-labelledby={uuid} role="group">
	<slot />
</div>
