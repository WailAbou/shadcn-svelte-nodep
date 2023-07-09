<script lang="ts">
	import { AlertCircle, Terminal } from "lucide-svelte";
	import { Alert, AlertTitle, AlertDescription } from "$components/ui/alert";
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