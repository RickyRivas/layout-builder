<script>
	import ElementIdentifier from '$lib/panels/properties/ElementIdentifiers.svelte';
	import PositionProperty from '$lib/panels/properties/position/PositionProperty.svelte';
	import SpacingProperties from '$lib/panels/properties/spacing/SpacingProperties.svelte';
	import DisplayProperties from '$lib/panels/properties/display/DisplayProperties.svelte';
	import SizingProperties from '$lib/panels/properties/sizing/SizingProperties.svelte';
	import TypographyProperties from './typography/TypographyProperties.svelte';
	import BackgroundProperties from './background/BackgroundProperties.svelte';
</script>

<ElementIdentifier />
<DisplayProperties />
<PositionProperty />
<SpacingProperties />
<SizingProperties />
<TypographyProperties />
<BackgroundProperties />
