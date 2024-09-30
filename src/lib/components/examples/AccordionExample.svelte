<script lang="ts">
	import { Options } from '$components/custom/options';
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '$components/ui/accordion';
	import { Button } from '$components/ui/button';
	import type { SelectionMode } from '$lib/helpers/types';

	let value: undefined | string | string[];
	let type: SelectionMode = 'single';
	let collapsible: boolean = true;
	let disabled: boolean = false;

	$: uid = { type, collapsible, disabled };
</script>

<Options>
	<p class="flex items-center justify-center">Value: {value}</p>
	<Button on:click={() => (type = type === 'single' ? 'multiple' : 'single')}>Type: {type}</Button>
	<Button on:click={() => (collapsible = !collapsible)}>Collapsible: {collapsible}</Button>
	<Button on:click={() => (disabled = !disabled)}>Disabled: {disabled}</Button>
</Options>

{#key uid}
	<Accordion on:valueChange={({ detail: newValue }) => (value = newValue)} {type} {collapsible} {disabled} class="w-full">
		<AccordionItem value="item-1">
			<AccordionTrigger>Is it accessible?</AccordionTrigger>
			<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-2">
			<AccordionTrigger>Is it styled?</AccordionTrigger>
			<AccordionContent>Yes. It comes with default styles that matches the other components' aesthetic.</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-3">
			<AccordionTrigger>Is it animated?</AccordionTrigger>
			<AccordionContent>Yes. It's animated by default, but you can disable it if you prefer.</AccordionContent>
		</AccordionItem>
	</Accordion>
{/key}
