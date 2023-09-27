<script lang="ts">
	import { Link } from '$components/ui/link';
	import { badgeVariants } from '$components/ui/badge';
	import { buttonVariants } from '$components/ui/button';
</script>

<div class="grid grid-cols-2 gap-4">
	<div class="flex items-center">
		<p>Click <Link href="https://google.nl">this</Link> for a redirect</p>
	</div>
	<div class="flex items-center">
		<p>Click <Link newTab href="https://google.com">this</Link> to open a new tab</p>
	</div>
	<div class="flex items-center">
		<p>Click <Link newTab href="https://google.com" class={buttonVariants({ variant: 'outline', size: 'sm' })}>this</Link> button link</p>
	</div>
	<div class="flex items-center">
		<p>Click <Link newTab href="https://google.com" class={badgeVariants({ variant: 'outline' })}>this</Link> badge link</p>
	</div>
</div>
