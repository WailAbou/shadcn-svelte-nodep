<script lang="ts">
	import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '$components/ui/input-otp';
	import { Options } from '$components/custom/options';
	import { Button } from '$components/ui/button';

	const ONLY_LETTERS = /^[a-zA-Z]+$/;
	const ONLY_NUMBERS = /^\d+$/;

	let value: undefined | string = '';
	let pattern: RegExp = ONLY_NUMBERS;
	let disabled: boolean = false;
</script>

<Options>
	<p class="flex items-center justify-center">
		{#if value === ''}
			Enter your one-time password.
		{:else}
			You entered: {value}
		{/if}
	</p>
	<Button on:click={() => (pattern = pattern === ONLY_NUMBERS ? ONLY_LETTERS : ONLY_NUMBERS)}>Pattern: {pattern === ONLY_NUMBERS ? 'Only Letters' : 'Only Numbers'}</Button>
	<Button on:click={() => (disabled = !disabled)}>Disabled: {disabled}</Button>
</Options>

{#key pattern}
	<InputOTP maxLength={6} {disabled} {pattern} on:valueChange={({ detail: newValue }) => (value = newValue)}>
		<InputOTPGroup>
			<InputOTPSlot />
			<InputOTPSlot />
			<InputOTPSlot />
		</InputOTPGroup>
		<InputOTPSeparator />
		<InputOTPGroup>
			<InputOTPSlot />
			<InputOTPSlot />
			<InputOTPSlot />
		</InputOTPGroup>
	</InputOTP>
{/key}
