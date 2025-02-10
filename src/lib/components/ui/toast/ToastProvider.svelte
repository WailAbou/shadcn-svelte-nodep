<script lang="ts">
	import { Toast } from '.';
</script>

<div role="region" aria-label="Notifications (F8)" tabindex="-1" style="">
	<span
		aria-hidden="true"
		tabindex="0"
		style="position: fixed; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;"
	></span>
	<ol tabindex="-1" class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
		<Toast />
	</ol>
	<span
		aria-hidden="true"
		tabindex="0"
		style="position: fixed; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;"
	></span>
</div>
