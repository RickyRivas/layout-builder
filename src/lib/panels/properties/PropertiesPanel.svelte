<script>
	import ElementIdentifier from '$lib/panels/properties/ElementIdentifiers.svelte';
	import PositionProperty from '$lib/panels/properties/position/PositionProperty.svelte';
	import SpacingProperties from '$lib/panels/properties/spacing/SpacingProperties.svelte';
	import DisplayProperties from '$lib/panels/properties/display/DisplayProperties.svelte';
	import SizingProperties from './sizing/SizingProperties.svelte';
</script>

<aside id="properties-panel">
	<!-- -->
	<h2>Selector</h2>
	<ElementIdentifier />
	<!-- -->
	<h2>Style Properties</h2>
	<DisplayProperties />
	<PositionProperty />
	<SpacingProperties />
	<SizingProperties />
</aside>
