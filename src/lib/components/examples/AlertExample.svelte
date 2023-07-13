<script lang="ts">
	import { CheckCircle2, Info, XCircle } from "lucide-svelte";
	import { Alert, AlertTitle, AlertDescription } from "$components/ui/alert";
</script>

<Alert>
    <Info class="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
        You can add components to your app using the cli.
    </AlertDescription>
</Alert>

<Alert variant="destructive" class="mt-4">
    <XCircle class="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
        Your session has expired. Please log in again.
    </AlertDescription>
</Alert>

<Alert variant="affirmative" class="mt-4">
    <CheckCircle2 class="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
        Your session has expired. Please log in again.
    </AlertDescription>
</Alert>