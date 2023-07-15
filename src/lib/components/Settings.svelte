<script>
	import { Label } from "$components/ui/label";
	import { Switch } from "$components/ui/switch";
</script>

<div class="border rounded-md p-10 mb-2 flex items-center">
    <Switch id="dark-mode" on:checkedChange={() => window.document.body.classList.toggle('dark')} />
    <Label htmlFor="dark-mode" class="ml-2">Dark Mode</Label>
</div>