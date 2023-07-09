<script>
	import { AlertCircle, Terminal } from "lucide-svelte";
	import Alert from "../ui/alert/Alert.svelte";
	import AlertDescription from "../ui/alert/AlertDescription.svelte";
	import AlertTitle from "../ui/alert/AlertTitle.svelte";
</script>

<Alert>
    <Terminal class="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
        You can add components to your app using the cli.
    </AlertDescription>
</Alert>

<Alert variant="destructive" class="mt-4">
    <AlertCircle class="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
        Your session has expired. Please log in again.
    </AlertDescription>
</Alert>