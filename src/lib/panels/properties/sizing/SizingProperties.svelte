<script lang="ts">
	import { widthUnits, heightUnits, minSizeUnits, maxSizeUnits } from '$lib/units';
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import UnitInput from '$lib/panels/properties/UnitInput.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';

	export const sizingConfig = {
		width: {
			units: widthUnits,
			value: '',
			defaultValue: 'auto',
			label: 'Width'
		},
		'min-width': {
			units: minSizeUnits,
			value: '',
			defaultValue: '0',
			label: 'Min Width'
		},
		'max-width': {
			units: maxSizeUnits,
			value: '',
			defaultValue: 'none',
			label: 'Max Width'
		},
		height: {
			units: heightUnits,
			value: '',
			defaultValue: 'auto',
			label: 'Height'
		},
		'min-height': {
			units: minSizeUnits,
			value: '',
			defaultValue: '0',
			label: 'Min Height'
		},
		'max-height': {
			units: maxSizeUnits,
			value: '',
			defaultValue: 'none',
			label: 'Max Height'
		}
	};

	let sizing = $state(sizingConfig);
	let prevValues = {};

	// Watch for element selection
	$effect(() => {
		Object.keys(sizing).forEach((property) => {
			const newValue = getPropertyValue(property, sizing[property].defaultValue);

			if (newValue !== prevValues[property]) {
				prevValues[property] = newValue;
				sizing[property].value = newValue;
			}
		});
	});
</script>

<PanelGroup title="Sizing">
	{#snippet panelContent()}
		{#each Object.entries(sizing) as [property, config]}
			<UnitInput
				defaultValue={config.defaultValue}
				width="half"
				allowedUnits={config.units}
				name={property}
				label={config.label}
				value={config.value}
				onUpdate={(e) => updateIframeStylesheet(property, e)}
			/>
		{/each}
	{/snippet}
</PanelGroup>
