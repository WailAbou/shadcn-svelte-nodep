<script>
	import { Button } from "$components/ui/button";
	import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, 
    AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction  } from "$components/ui/alert-dialog";
</script>

<AlertDialog>
    <AlertDialogTrigger>
        <Button variant="outline">Show Alert Dialog</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>