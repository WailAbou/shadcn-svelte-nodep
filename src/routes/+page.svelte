<script lang="ts">
	import * as ex from '$components/examples';
	import { Settings } from '$components/custom/settings';
	import { SvelteCode } from '$components/custom/svelte-code';
	import { Separator } from '$components/ui/separator';

	const names: string[] = ['Accordion', 'Alert', 'AlertDialog', 'Button', 'Checkbox', 'Collapsible', 'Dialog', 'Input', 'Label', 'Link', 'RadioGroup', 'Separator', 'Switch', 'Textarea'];

	const examples = names.map((name) => (ex as any)[`${name}Example`]);
	const codes: string[] = names.map((name) => (ex as any)[`${name}ExampleCode`]);
</script>

<div class="container mx-auto py-10">
	<Settings let:codeMode>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each examples as Example, i}
				<div class="container mx-auto border rounded-md p-10">
					<h1 class="font-bold">{names[i]}</h1>
					<Separator class="my-4" />
					<SvelteCode code={codes[i]} {codeMode}>
						<Example />
					</SvelteCode>
				</div>
			{/each}
		</div>
	</Settings>
</div>
