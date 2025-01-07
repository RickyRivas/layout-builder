<script lang="ts">
	import { widthUnits, heightUnits, minSizeUnits, maxSizeUnits } from '$lib/units';
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import UnitInput from '$lib/panels/properties/UnitInput.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';

	const sizingConfig = {
		width: {
			units: widthUnits,
			value: '',
			defaultValue: 'auto'
		},
		'min-width': {
			units: minSizeUnits,
			value: '',
			defaultValue: '0'
		},
		'max-width': {
			units: maxSizeUnits,
			value: '',
			defaultValue: 'none'
		},
		height: {
			units: heightUnits,
			value: '',
			defaultValue: 'auto'
		},
		'min-height': {
			units: minSizeUnits,
			value: '',
			defaultValue: '0'
		},
		'max-height': {
			units: maxSizeUnits,
			value: '',
			defaultValue: 'none'
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
			<div class="form-control">
				<UnitInput
					allowedUnits={config.units}
					name={property}
					label={property}
					value={config.value}
					onUpdate={(e) => updateIframeStylesheet(property, e)}
				/>
			</div>
		{/each}
	{/snippet}
</PanelGroup>
