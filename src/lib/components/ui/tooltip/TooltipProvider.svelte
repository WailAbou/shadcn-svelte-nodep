<script lang="ts">
	import { setContext } from 'svelte';

	export let delayDuration: number = 700;
	export let skipDelayDuration: number = 300;

	setContext('tooltip-provider', { delayDuration, skipDelayDuration });
</script>

<slot />
