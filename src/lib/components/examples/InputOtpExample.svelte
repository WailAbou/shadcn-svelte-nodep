<script>
	import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '$components/ui/input-otp';
</script>

<InputOTP maxLength={6}>
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

<!-- <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
	<InputOTPGroup>
		<InputOTPSlot index={0} />
		<InputOTPSlot index={1} />
		<InputOTPSlot index={2} />
		<InputOTPSlot index={3} />
		<InputOTPSlot index={4} />
		<InputOTPSlot index={5} />
	</InputOTPGroup>
</InputOTP>

<InputOTP maxLength={6}>
	<InputOTPGroup>
		<InputOTPSlot index={0} />
		<InputOTPSlot index={1} />
	</InputOTPGroup>
	<InputOTPSeparator />
	<InputOTPGroup>
		<InputOTPSlot index={2} />
		<InputOTPSlot index={3} />
	</InputOTPGroup>
	<InputOTPSeparator />
	<InputOTPGroup>
		<InputOTPSlot index={4} />
		<InputOTPSlot index={5} />
	</InputOTPGroup>
</InputOTP> -->

<!-- <div class="space-y-2">
	<InputOTP maxLength={6} {value} onChange={(value) => setValue(value)}>
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
			<InputOTPSlot index={2} />
			<InputOTPSlot index={3} />
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
		</InputOTPGroup>
	</InputOTP>
	<div class="text-center text-sm">
		{#if value === ''}
			Enter your one-time password.
		{:else}
			You entered: {value}
		{/if}
	</div>
</div> -->
