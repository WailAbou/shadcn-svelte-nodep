<script>
	import { Textarea } from '$components/ui/textarea';
	import { Button } from '$components/ui/button';
	import { Label } from '$components/ui/label';
</script>

<div class="grid grid-cols-1 gap-y-4">
	<Textarea placeholder="Type your message here." />

	<Textarea placeholder="Type your message here." disabled />

	<div class="grid w-full gap-1.5">
		<Label htmlFor="message">Your message</Label>
		<Textarea placeholder="Type your message here." id="message" />
	</div>

	<div class="grid w-full gap-1.5">
		<Label htmlFor="message-2">Your Message</Label>
		<Textarea placeholder="Type your message here." id="message-2" />
		<p class="text-sm text-muted-foreground">Your message will be copied to the support team.</p>
	</div>

	<div class="grid w-full gap-2">
		<Textarea placeholder="Type your message here." />
		<Button>Send message</Button>
	</div>
</div>
