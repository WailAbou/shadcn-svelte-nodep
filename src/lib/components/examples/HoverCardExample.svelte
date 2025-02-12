<script lang="ts">
	import { CalendarDays, Sidebar } from 'lucide-svelte';
	import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
	import { HoverCard, HoverCardContent, HoverCardTrigger } from '$components/ui/hover-card';
	import { Link } from '$components/ui/link';
	import type { Side } from '$lib/helpers/types';

	let sides: Side[] = ['bottom', 'top', 'left', 'right'];
</script>

<div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
	{#each sides as side}
		<HoverCard>
			<HoverCardTrigger>
				<Link>Hover card {side}</Link>
			</HoverCardTrigger>
			<HoverCardContent {side} class="w-80">
				<div class="flex justify-between space-x-4">
					<Avatar>
						<AvatarImage src="https://github.com/vercel.png" />
						<AvatarFallback>VC</AvatarFallback>
					</Avatar>
					<div class="space-y-1">
						<h4 class="text-sm font-semibold">@nextjs</h4>
						<p class="text-sm">The React Framework – created and maintained by @vercel.</p>
						<div class="flex items-center pt-2">
							<CalendarDays class="mr-2 h-4 w-4 opacity-70" />{' '}
							<span class="text-xs text-muted-foreground"> Joined December 2021 </span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	{/each}
</div>
