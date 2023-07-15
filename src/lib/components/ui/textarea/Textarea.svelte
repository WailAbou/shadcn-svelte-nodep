<script lang="ts">
	import { cn } from "$lib/utils";

    let className: string | undefined | null = undefined;
	export { className as class };
    
    export let placeholder: string | undefined = undefined;
    export let id: string | undefined = undefined;
    export let disabled: boolean = false;
</script>

<textarea {...$$restProps} {placeholder} {disabled} {id}
    class="{cn("flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}"></textarea>