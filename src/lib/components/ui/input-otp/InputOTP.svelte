<script lang="ts">
	import { cn } from '$lib/helpers/utils';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let maxLength: number | undefined = undefined;
</script>

<div
	data-input-otp-container="true"
	class={cn('flex items-center gap-2 has-[:disabled]:opacity-50', className)}
	style="position: relative; cursor: text; user-select: none; pointer-events: none; --root-height: 40px;"
>
	<slot />
	<div style="position: absolute; inset: 0px; pointer-events: none;">
		<input
			autocomplete="one-time-code"
			class="disabled:cursor-not-allowed"
			data-input-otp="true"
			inputmode="numeric"
			pattern="^\d+$"
			maxlength={maxLength}
			value=""
			style="position: absolute; inset: 0px; width: 100%; height: 100%; display: flex; text-align: left; opacity: 1; color: transparent; pointer-events: all; background: transparent; caret-color: transparent; border: 0px solid transparent; outline: transparent solid 0px; box-shadow: none; line-height: 1; letter-spacing: -0.5em; font-size: var(--root-height); font-family: monospace; font-variant-numeric: tabular-nums;"
			data-input-otp-mss="0"
			data-input-otp-mse="0"
		/>
	</div>
</div>
