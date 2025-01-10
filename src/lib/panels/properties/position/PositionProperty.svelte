<script>
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import { positionValues } from '$lib/properties';
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import UnitInput from '../UnitInput.svelte';
	import { positionUnits } from '$lib/units';
	import RadioButton from '$lib/components/RadioButton.svelte';

	let positionValue = $state();
	let prevPositionValue = $state();
	let offsetProperties = $state({
		top: '',
		right: '',
		bottom: '',
		left: '',
		zIndex: ''
	});
	let prevOffsetValues = {};

	$effect(() => {
		let newPosValue = getPropertyValue('position', '', true);
		if (newPosValue !== prevPositionValue) {
			prevPositionValue = newPosValue;
			positionValue = newPosValue;
		}

		Object.keys(offsetProperties).forEach((prop) => {
			const newValue = getPropertyValue(prop, '', true);

			if (newValue !== offsetProperties[prop]) {
				prevOffsetValues[prop] = newValue;
				offsetProperties[prop] = newValue;
			}
		});
	});
</script>

<PanelGroup title="Position" keepOpen={true}>
	{#snippet panelContent()}
		<RadioButtonGroup style="text">
			{#snippet content()}
				{#each positionValues as value, i}
					<RadioButton
						group={positionValue}
						{value}
						label={value}
						style="text"
						property="position"
						onChange={(newValue) => {
							updateIframeStylesheet('position', newValue);
						}}
					/>
				{/each}
			{/snippet}
		</RadioButtonGroup>

		{#if positionValue === 'fixed' || positionValue === 'absolute' || positionValue === 'relative'}
			{#each Object.keys(offsetProperties) as property}
				<UnitInput
					width="half"
					label={property}
					value={offsetProperties[property]}
					name="input-{property}"
					allowedUnits={positionUnits}
					onUpdate={(newValue) => updateIframeStylesheet(property, newValue)}
				/>
			{/each}
		{/if}
	{/snippet}
</PanelGroup>
