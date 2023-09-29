<script lang="ts">
	import { Button } from '$components/ui/button';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let isOpen: Writable<boolean> = getContext('alert-dialog');
</script>

<Button on:click={() => ($isOpen = !$isOpen)}>
	<slot />
</Button>
