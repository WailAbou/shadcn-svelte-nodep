<script lang="ts">
	import { Label } from '$components/ui/label';
	import { Switch } from '$components/ui/switch';
	import { Checkbox } from '$components/ui/checkbox';
	import { Separator } from '$components/ui/separator';
	import { CodeMode } from '$components/custom/svelte-code';
	import githubLight from 'svelte-highlight/styles/github';
	import githubDark from 'svelte-highlight/styles/github-dark';

	let codeMode: CodeMode = CodeMode.None;
	let darkMode: boolean = false;
	let codeCss: string = githubLight;

	$: codeCss = darkMode ? githubDark : githubLight;
</script>

<svelte:head>
	{@html codeCss}
</svelte:head>

<div class="mb-2 flex flex-wrap items-center rounded-md border p-10">
	<h1 class="font-bold">Settings</h1>
	<Separator orientation="vertical" class="mx-4 h-10" />

	<div class="flex items-center">
		<Switch
			id="dark-mode"
			on:checkedChange={({ detail: checked }) => {
				darkMode = checked;
				window.document.body.classList.toggle('dark');
			}}
		/>
		<Label htmlFor="dark-mode" class="mx-2">Dark Mode</Label>
	</div>

	<div class="flex items-center">
		<Switch id="code-mode" on:checkedChange={({ detail: checked }) => (codeMode = checked ? CodeMode.Source : CodeMode.None)} />
		<Label htmlFor="code-mode" class="mx-2">Source Code</Label>
	</div>

	{#if codeMode != CodeMode.None}
		<div class="flex items-center">
			<Checkbox id="html-only" on:checkedChange={({ detail: checked }) => (codeMode = checked ? CodeMode.Html : CodeMode.Source)} />
			<Label htmlFor="html-only" class="ml-2">Html Only</Label>
		</div>
	{/if}
</div>

<slot {codeMode} />
