<script lang="ts">
	import { ArrowRight, ChevronRight, Loader2, Mail } from "lucide-svelte";
	import { Button } from "$components/ui/button";
</script>

<div class="grid grid-cols-2 gap-4">
    <Button>Button</Button>
    <Button variant="secondary">Button</Button>
    <Button variant="destructive">Button</Button>
    <Button variant="outline">Button</Button>
    <Button variant="ghost">Button</Button>
    <Button variant="link">Button</Button>
    <Button><Mail class="mr-2 h-4 w-4" /> Login with Email</Button>
    <Button disabled>
        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
        Please wait
    </Button>
    <Button variant="outline" size="icon"><ChevronRight class="h-4 w-4" /></Button>
    <Button variant="link" href="https://google.nl">Visit Google<ArrowRight class="h-4 w-4 ml-2" /></Button>
</div>