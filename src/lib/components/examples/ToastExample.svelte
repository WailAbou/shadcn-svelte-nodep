<script lang="ts">
	import { Button } from '$components/ui/button';
	import { toast, toastVariants } from '$components/ui/toast';
	import type { VariantProps } from 'class-variance-authority';

	function showToast(variant: VariantProps<typeof toastVariants>['variant']) {
		toast({
			variant,
			title: 'Scheduled: Catch up',
			description: 'Friday, February 10, 2023 at 5:57 PM',
			actionLabel: 'Undo'
		});
	}
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<Button variant="default" on:click={() => showToast('default')}>Show Default Toast</Button>
	<Button variant="affirmative" on:click={() => showToast('affirmative')}>Show Affirmative Toast</Button>
	<Button variant="destructive" on:click={() => showToast('destructive')}>Show Destructive Toast</Button>
</div>
