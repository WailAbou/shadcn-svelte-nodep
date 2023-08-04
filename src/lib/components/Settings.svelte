<script lang="ts">
	import { Label } from "$components/ui/label";
	import { Switch } from "$components/ui/switch";
	import { Checkbox } from "$components/ui/checkbox";
	import { CodeMode } from "$lib/types/code-mode";
	import githubLight from "svelte-highlight/styles/github";
	import githubDark from "svelte-highlight/styles/github-dark";

    let codeMode: CodeMode = CodeMode.None;
    let darkMode: boolean = false;
    let codeCss: string = githubLight;

    $: codeCss = darkMode ? githubDark : githubLight;
</script>

<svelte:head>
  {@html codeCss}
</svelte:head>

<div class="border rounded-md p-10 mb-2 flex items-center">
    <Switch id="dark-mode" on:checkedChange={({detail: checked}) => { darkMode = checked; window.document.body.classList.toggle('dark'); }} />
    <Label htmlFor="dark-mode" class="mx-2">Dark Mode</Label>

    <Switch id="code-mode" on:checkedChange={({detail: checked}) => codeMode = checked ? CodeMode.Source : CodeMode.None} />
    <Label htmlFor="code-mode" class="mx-2">Source Code</Label>

    {#if codeMode != CodeMode.None}
        <Checkbox id="html-only" on:checkedChange={({detail: checked}) => codeMode = checked ? CodeMode.Html : CodeMode.Source} />
        <Label htmlFor="html-only" class="ml-2">Html Only</Label>
    {/if}
</div>

<slot {codeMode} />