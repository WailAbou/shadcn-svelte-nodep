<script>
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$components/ui/tooltip';
	import { Button } from '$components/ui/button';
</script>

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger>
			<Button variant="outline">Hover</Button>
		</TooltipTrigger>
		<TooltipContent>
			<p>Add to library</p>
		</TooltipContent>
	</Tooltip>
</TooltipProvider>
