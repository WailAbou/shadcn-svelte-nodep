<script lang="ts">
	import * as ex from '$components/examples';
	import { Settings } from '$components/custom/settings';
	import { SvelteCode } from '$components/custom/svelte-code';
	import { Separator } from '$components/ui/separator';

	const names: string[] = [
		'Accordion',
		'Alert',
		'AlertDialog',
		'AspectRatio',
		'Avatar',
		'Badge',
		'Button',
		'Card',
		'Checkbox',
		'Collapsible',
		'Dialog',
		'Input',
		'Label',
		'Link',
		'Progress',
		'RadioGroup',
		'ScrollArea',
		'Separator',
		'Skeleton',
		'Switch',
		'Tabs',
		'Textarea',
		'Toggle',
		'Tooltip'
	];

	const examples = names.map((name) => (ex as any)[`${name}Example`]);
	const codes: string[] = names.map((name) => (ex as any)[`${name}ExampleCode`]);
</script>

<div class="container mx-auto py-10">
	<Settings let:codeMode>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each examples as Example, i}
				<div class="container mx-auto rounded-md border p-10">
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
