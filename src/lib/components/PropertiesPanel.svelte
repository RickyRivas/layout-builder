<script>
	import DisplayProperty from '$lib/propertyComponents/DisplayProperty.svelte';
	import ElementIdentifier from '$lib/propertyComponents/ElementIdentifiers.svelte';
	import PositionProperty from '$lib/propertyComponents/PositionProperty.svelte';
</script>

<aside id="properties-panel">
	<h2>Selector</h2>
	<div id="accordion">
		<div class="accordion-item">
			<ElementIdentifier />
		</div>
	</div>
	<h2>All Properties</h2>
	<div id="accordion">
		<div class="accordion-item">
			<DisplayProperty />
		</div>
		<div class="accordion-item">
			<PositionProperty />
		</div>
	</div>
</aside>
