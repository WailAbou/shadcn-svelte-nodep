<script lang="ts">
	import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '$components/ui/input-otp';
	import { Options } from '$components/custom/options';

	let value: undefined | string = '';
</script>

<Options>
	<p class="flex items-center justify-center">
		{#if value === ''}
			Enter your one-time password.
		{:else}
			You entered: {value}
		{/if}
	</p>
</Options>

<InputOTP on:valueChange={({ detail: newValue }) => (value = newValue)}>
	<InputOTPGroup>
		<InputOTPSlot index={0} />
		<InputOTPSlot index={1} />
		<InputOTPSlot index={2} />
	</InputOTPGroup>
	<InputOTPSeparator />
	<InputOTPGroup>
		<InputOTPSlot index={3} />
		<InputOTPSlot index={4} />
		<InputOTPSlot index={5} />
	</InputOTPGroup>
</InputOTP>
