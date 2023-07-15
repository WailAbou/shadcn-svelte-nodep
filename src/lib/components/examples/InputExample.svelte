<script>
	import { Input } from "$components/ui/input";
	import { Label } from "$components/ui/label";
	import { Button } from "$components/ui/button";
</script>

<div class="grid grid-cols-1 gap-y-4">
    <Input type="email" placeholder="Email" />

    <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
    </div>

    <Input disabled type="email" placeholder="Email" />

    <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
    </div>

    <div class="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Subscribe</Button>
    </div>
</div>