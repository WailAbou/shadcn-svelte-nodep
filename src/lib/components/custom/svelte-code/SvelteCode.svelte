<script lang="ts">
	import { CodeMode } from '.';
	import { HighlightSvelte } from 'svelte-highlight';

	export let code: string;
	export let codeMode: CodeMode = CodeMode.None;

	function parseHtml(code: string): string {
		const withoutScript = code.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
		const keyRegex = /{#key[^}]*}([\s\S]*?){\/key}/g;
		const keyMatches = withoutScript.match(keyRegex);
		return (keyMatches ? keyMatches.join('') : withoutScript).trim();
	}
</script>

{#if codeMode == CodeMode.Source}
	<HighlightSvelte {code} />
{:else if codeMode == CodeMode.Html}
	<HighlightSvelte code={parseHtml(code)} />
{:else}
	<slot />
{/if}
