<script lang="ts">
	export let altText: string | undefined = undefined;
</script>

<button
	type="button"
	class="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.affirmative]:border-muted/40 group-[.destructive]:border-muted/40 group-[.affirmative]:hover:border-affirmative/30 group-[.destructive]:hover:border-destructive/30 group-[.affirmative]:hover:bg-affirmative group-[.destructive]:hover:bg-destructive group-[.affirmative]:hover:text-affirmative-foreground group-[.destructive]:hover:text-destructive-foreground group-[.affirmative]:focus:ring-foreground group-[.destructive]:focus:ring-destructive"
	data-radix-toast-announce-alt={altText}
>
	<slot />
</button>
