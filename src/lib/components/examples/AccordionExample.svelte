<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$components/ui/accordion';
	import type { AccordionType } from '$lib/types';

  	let value: undefined | string | string[];
	let collapsible: boolean = true;
	let type: AccordionType = "single";
	let uid: object = {};

	function reset(task: () => void) {
		return () => { uid = {}; value = undefined; task(); }
	}
</script>

<p>Value: {value}</p>
<button on:click={reset(() => collapsible = !collapsible)}>Collapsible: {collapsible}</button><br/>
<button on:click={reset(() => type = (type === "single") ? "multiple" : "single")}>Type: {type}</button><br/>

{#key uid}
<Accordion on:valueChange={e => value = e.detail} {type} {collapsible} class="w-full">
	<AccordionItem value="Item 1">
		<AccordionTrigger>Is it accessible?</AccordionTrigger>
		<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
	</AccordionItem>
	<AccordionItem value="Item 2">
		<AccordionTrigger>Is it styled?</AccordionTrigger>
		<AccordionContent>
			Yes. It comes with default styles that matches the other components' aesthetic.
		</AccordionContent>
	</AccordionItem>
	<AccordionItem value="Item 3">
		<AccordionTrigger>Is it animated?</AccordionTrigger>
		<AccordionContent>
			Yes. It's animated by default, but you can disable it if you prefer.
		</AccordionContent>
	</AccordionItem>
</Accordion>
{/key}