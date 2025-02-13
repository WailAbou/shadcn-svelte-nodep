<script lang="ts">
	import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, sheetVariants } from '$components/ui/sheet';
	import { Button } from '$components/ui/button';
	import { Label } from '$components/ui/label';
	import { Input } from '$components/ui/input';
	import type { VariantProps } from 'class-variance-authority';

	let sides: VariantProps<typeof sheetVariants>['side'][] = ['right', 'left', 'top', 'bottom'];
</script>

<div class="grid grid-cols-2 items-center justify-items-center gap-4 lg:grid-cols-4">
	{#each sides as side}
		<Sheet>
			<SheetTrigger>
				<Button variant="outline">Open {side}</Button>
			</SheetTrigger>
			<SheetContent {side}>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
				</SheetHeader>
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" class="text-right">Name</Label>
						<Input id="name" value="Pedro Duarte" class="col-span-3" />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" class="text-right">Username</Label>
						<Input id="username" value="@peduarte" class="col-span-3" />
					</div>
				</div>
				<SheetFooter>
					<SheetClose>
						<Button type="submit">Save changes</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	{/each}
</div>
