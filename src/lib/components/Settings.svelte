<script>
	import Checkbox from "./ui/checkbox/Checkbox.svelte";
	import Label from "./ui/label/Label.svelte";
</script>

<div class="border rounded-md p-10 mb-2 flex items-center">
    <Checkbox id="dark-mode" on:checkedChange={() => window.document.body.classList.toggle('dark')} />
    <Label htmlFor="dark-mode" class="ml-2">Dark Mode</Label>
</div>