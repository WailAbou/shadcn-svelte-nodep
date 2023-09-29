<script lang="ts">
	import { setContext } from 'svelte';

	export let delayDuration: number = 700;

	setContext('tooltip-provider', { delayDuration });
</script>

<slot />
