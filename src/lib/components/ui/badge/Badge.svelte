<script lang="ts">
	import { badgeVariants } from './badgeVariants';
	import type { VariantProps } from 'class-variance-authority';
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: VariantProps<typeof badgeVariants>['variant'] = 'default';
</script>

<span class={cn(badgeVariants({ variant, className }))} {...$$restProps}>
	<slot />
</span>
