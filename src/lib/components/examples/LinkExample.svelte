<script>
	import { ArrowRight } from "lucide-svelte";
	import { Link } from "$components/ui/link";
</script>

<div class="grid grid-cols-2 gap-4">
    <div class="flex items-center">
        <p>Click <Link href="https://google.nl">here</Link> please!</p>
    </div>
    <div class="flex items-center">
        <p>Click <Link target="_blank" href="https://google.com">here</Link> please!<ArrowRight class="h-4 w-4 ml-2 inline-block" /></p>
    </div>
</div>