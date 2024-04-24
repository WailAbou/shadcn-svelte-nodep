<script lang="ts">
	import { Breadcrumb, BreadcrumbLink, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbEllipsis } from '$components/ui/breadcrumb';
	import { Slash } from 'lucide-svelte';
</script>

<Breadcrumb>
	<BreadcrumbList>
		<BreadcrumbItem>
			<BreadcrumbLink href="#">Home</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbEllipsis />
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbLink href="#">Components</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
		</BreadcrumbItem>
	</BreadcrumbList>
</Breadcrumb>

<Breadcrumb class="mt-4">
	<BreadcrumbList>
		<BreadcrumbItem>
			<BreadcrumbLink href="#">Home</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator>
			<Slash class="h-4 w-4" />
		</BreadcrumbSeparator>
		<BreadcrumbItem>
			<BreadcrumbLink href="#">Components</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator>
			<Slash class="h-4 w-4" />
		</BreadcrumbSeparator>
		<BreadcrumbItem>
			<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
		</BreadcrumbItem>
	</BreadcrumbList>
</Breadcrumb>
