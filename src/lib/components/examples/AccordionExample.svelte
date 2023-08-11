<script lang="ts">
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, type AccordionType } from '$components/ui/accordion';
	import { Button } from '$components/ui/button';
	import { Separator } from '$components/ui/separator';

	let value: undefined | string | string[];
	let collapsible: boolean = true;
	let type: AccordionType = 'single';
	let uid: object = {};

	function reset(task: VoidFunction) {
		return () => {
			uid = {};
			value = undefined;
			task();
		};
	}
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
	<p>Value: {value}</p>
	<Button on:click={reset(() => (collapsible = !collapsible))}>Collapsible: {collapsible}</Button>
	<Button on:click={reset(() => (type = type === 'single' ? 'multiple' : 'single'))}>Type: {type}</Button>
</div>

<Separator class="mt-5" />

{#key uid}
	<Accordion on:valueChange={({ detail: newValue }) => (value = newValue)} {type} {collapsible} class="w-full">
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
