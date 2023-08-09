<script lang="ts">
    import { Button } from "$components/ui/button";
    import { Label } from "$components/ui/label";
    import { Input } from "$components/ui/input";
    import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription,  DialogFooter  } from "$components/ui/dialog";

    let open: boolean = false;
</script>

<Dialog {open} on:openChange={({detail: isOpen}) => open = isOpen}>
    <DialogTrigger>
      <Button variant="outline">Show Dialog</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" class="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" class="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" on:click={() => open = false}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>