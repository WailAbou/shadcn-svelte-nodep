<script>
	import { Button } from '$components/ui/button';
	import { useToast } from '$components/ui/toast';
</script>

<Button
	on:click={() =>
		useToast({
			title: 'Scheduled: Catch up',
			description: 'Friday, February 10, 2023 at 5:57 PM',
			actionLabel: 'Undo'
		})}
>
	Test
</Button>
