<script>
	import Checkbox from "$components/ui/checkbox/Checkbox.svelte";
	import Label from "$components/ui/label/Label.svelte";
</script>

<div class="grid grid-cols-1 gap-y-4">
    <div class="flex items-center space-x-2">
        <Checkbox id="terms1" />
        <Label htmlFor="terms1">
        Accept terms and conditions
        </Label>
    </div>

    <div class="items-top flex space-x-2">
        <Checkbox id="terms2" />
        <div class="grid gap-1.5 leading-none">
            <Label htmlFor="terms2">
                Accept terms and conditions
            </Label>
            <p class="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    </div>

    <div class="flex items-center space-x-2">
        <Checkbox id="terms3" disabled />
        <Label htmlFor="terms3">
            Accept terms and conditions
        </Label>
    </div>
</div>