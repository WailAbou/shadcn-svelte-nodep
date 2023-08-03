<script lang="ts">
	import { CodeMode } from "$lib/types/code-mode";
	import { getContext } from "svelte";
    import { HighlightSvelte } from "svelte-highlight";
	import type { Writable } from "svelte/store";

    export let code: string;

    let codeMode: Writable<CodeMode> = getContext('code-mode');

    function parseHtml(code: string): string {
        const scriptRegex = /<script[^>]*>[\s\S]*?<\/script>/gi;
        const withoutScript = code.replace(scriptRegex, '');
        return withoutScript.trimStart();
    }
</script>


{#if $codeMode == CodeMode.Source}
    <HighlightSvelte {code} />
{:else if $codeMode == CodeMode.Html}
    <HighlightSvelte code={parseHtml(code)} />
{:else}
    <slot/>
{/if}