<script lang="ts">
	import { X } from 'lucide-svelte';
</script>

<button
	type="button"
	class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.affirmative]:text-green-400 group-[.destructive]:text-red-300 group-[.affirmative]:hover:text-green-200 group-[.destructive]:hover:text-red-50 group-[.affirmative]:focus:ring-green-400 group-[.destructive]:focus:ring-red-400 group-[.affirmative]:focus:ring-offset-green-600 group-[.destructive]:focus:ring-offset-red-600"
	on:click
>
	<X class="h-4 w-4" /><span class="sr-only">Close</span>
</button>
