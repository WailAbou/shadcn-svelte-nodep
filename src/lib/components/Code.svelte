<script lang="ts">
	import { CodeMode } from "$lib/types/code-mode";
    import { HighlightSvelte } from "svelte-highlight";

    export let code: string;
    export let codeMode: CodeMode = CodeMode.None;

    function parseHtml(code: string): string {
        const scriptRegex = /<script[^>]*>[\s\S]*?<\/script>/gi;
        const withoutScript = code.replace(scriptRegex, '');
        return withoutScript.trimStart();
    }
</script>


{#if codeMode == CodeMode.Source}
    <HighlightSvelte {code} />
{:else if codeMode == CodeMode.Html}
    <HighlightSvelte code={parseHtml(code)} />
{:else}
    <slot/>
{/if}