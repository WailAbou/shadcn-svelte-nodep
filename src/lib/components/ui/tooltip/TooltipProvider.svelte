<script lang="ts">
	import { setContext } from 'svelte';

	export let delayDuration: number = 700;
	export let skipDelayDuration: number = 300;
	export let disableHoverableContent: boolean = false;

	setContext('tooltip-provider', { delayDuration, skipDelayDuration, disableHoverableContent });
</script>

<slot />
