<script lang="ts">
	import { ToastProvider } from '$lib/components/ui/toast';
	import '../styles/globals.css';
</script>

<div class="relative flex min-h-screen flex-col" id="page">
	<div class="flex-1">
		<slot />
	</div>
</div>

<ToastProvider />
