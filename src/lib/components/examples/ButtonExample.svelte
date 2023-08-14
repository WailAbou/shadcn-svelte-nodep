<script lang="ts">
	import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Loader2, Mail } from 'lucide-svelte';
	import { Button } from '$components/ui/button';
</script>

<div class="grid grid-cols-2 gap-4">
	<Button>Primary</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="destructive">Destructive</Button>
	<Button variant="affirmative">Affirmative</Button>
	<Button variant="outline">Outline</Button>
	<Button variant="ghost">Ghost</Button>
	<Button><Mail class="mr-2 h-4 w-4" /> Login with Email</Button>
	<Button disabled>
		<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		Please wait
	</Button>
	<div class="flex justify-between">
		<Button variant="outline" size="icon"><ChevronFirst class="h-4 w-4" /></Button>
		<Button variant="outline" size="icon"><ChevronLeft class="h-4 w-4" /></Button>
		<Button variant="outline" size="icon"><ChevronRight class="h-4 w-4" /></Button>
		<Button variant="outline" size="icon"><ChevronLast class="h-4 w-4" /></Button>
	</div>
</div>
