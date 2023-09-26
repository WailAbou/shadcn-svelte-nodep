<script lang="ts">
	import { Toggle } from '$components/ui/toggle';
	import { Bold, Italic, Underline } from 'lucide-svelte';
</script>

<Toggle ariaLabel="Toggle italic">
	<Bold class="h-4 w-4" />
</Toggle>

<Toggle variant="outline" ariaLabel="Toggle italic">
	<Italic class="h-4 w-4" />
</Toggle>

<Toggle ariaLabel="Toggle italic">
	<Italic class="mr-2 h-4 w-4" />
	Italic
</Toggle>

<Toggle size="sm" ariaLabel="Toggle italic">
	<Italic class="h-4 w-4" />
</Toggle>

<Toggle size="lg" ariaLabel="Toggle italic">
	<Italic class="h-4 w-4" />
</Toggle>

<Toggle ariaLabel="Toggle italic" disabled>
	<Underline class="h-4 w-4" />
</Toggle>
