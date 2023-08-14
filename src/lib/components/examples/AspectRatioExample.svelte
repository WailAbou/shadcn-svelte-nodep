<script lang="ts">
	import { AspectRatio } from '$components/ui/aspect-ratio';
	import { Options } from '$components/custom/options';
	import { Button } from '$components/ui/button';

	let index: number = 0;
	let aspectRatios: number[] = [16 / 9, 2 / 1, 1 / 2, 1 / 1];
	let aspectRatiosDisplay: string[] = ['16 / 9', '2 / 1', '1 / 2', '1 / 1'];
</script>

<Options>
	<Button on:click={() => (index = 0)}>Reset</Button>
	<Button on:click={() => (index = (index + 1) % aspectRatios.length)}>Aspect Ratio: {aspectRatiosDisplay[index]}</Button>
</Options>

<AspectRatio ratio={aspectRatios[index]} class="bg-muted">
	<img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" alt="Gray by Drew Beamer" class="h-full w-full rounded-md object-cover" />
</AspectRatio>
