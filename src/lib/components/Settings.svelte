<script lang="ts">
	import { Label } from "$components/ui/label";
	import { Switch } from "$components/ui/switch";
	import { Checkbox } from "$components/ui/checkbox";
	import { CodeMode } from "$lib/types/code-mode";
	import { writable, type Writable } from "svelte/store";
	import { setContext } from "svelte";
	import githubLight from "svelte-highlight/styles/github";
	import githubDark from "svelte-highlight/styles/github-dark";

    let darkMode: boolean = false;
    let codeCss: string = githubLight;
    let codeMode: Writable<CodeMode> = writable(CodeMode.None);

    $: codeCss = darkMode ? githubDark : githubLight;
    
    setContext('code-mode', codeMode);
</script>

<svelte:head>
  {@html codeCss}
</svelte:head>

<div class="border rounded-md p-10 mb-2 flex items-center">
    <Switch id="dark-mode" on:checkedChange={({detail: checked}) => { darkMode = checked; window.document.body.classList.toggle('dark'); }} />
    <Label htmlFor="dark-mode" class="mx-2">Dark Mode</Label>

    <Switch id="code-mode" on:checkedChange={({detail: checked}) => $codeMode = checked ? CodeMode.Source : CodeMode.None} />
    <Label htmlFor="code-mode" class="mx-2">Source Code</Label>

    {#if $codeMode}
        <Checkbox id="html-only" on:checkedChange={({detail: checked}) => $codeMode = checked ? CodeMode.Html : CodeMode.Source} />
        <Label htmlFor="html-only" class="ml-2">Html Only</Label>
    {/if}
</div>

<slot/>