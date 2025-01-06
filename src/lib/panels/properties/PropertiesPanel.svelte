<script>
	import DisplayProperty from '$lib/panels/properties/components/DisplayProperty.svelte';
	import ElementIdentifier from '$lib/panels/properties/components/ElementIdentifiers.svelte';
	import PositionProperty from '$lib/panels/properties/components/PositionProperty.svelte';
	import SpacingProperty from '$lib/panels/properties/components/SpacingProperty.svelte';
</script>

<aside id="properties-panel">
	<!-- -->
	<h2>Selector</h2>
	<div class="accordion-block">
		<ElementIdentifier />
	</div>

	<!-- -->
	<h2>Style Properties</h2>
	<div class="accordion-block">
		<div class="accordion-item">
			<DisplayProperty />
		</div>
		<div class="accordion-item">
			<PositionProperty />
		</div>
		<div class="accordion-item">
			<SpacingProperty />
		</div>
	</div>
</aside>
