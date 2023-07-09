<script lang="ts">
	import { cn } from "$lib/utils";
	import type { VariantProps } from "class-variance-authority";
	import { alertVariants } from "./alertVariants";

    let className: string | undefined | null = undefined;
	export { className as class };

    export let variant: VariantProps<typeof alertVariants>["variant"] = "default";
</script>

<div role="alert" class={cn(alertVariants({ variant }), className)}>
    <slot />
</div>