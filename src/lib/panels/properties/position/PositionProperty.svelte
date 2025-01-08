<script>
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import { positionValues } from '$lib/properties';
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import UnitInput from '../UnitInput.svelte';
	import { positionUnits } from '$lib/units';

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

<PanelGroup title="Position">
	{#snippet panelContent()}
		<RadioButtonGroup>
			{#snippet content()}
				{#each positionValues as value, i}
					<input
						type="radio"
						name="position-property"
						id="position-property-{value}"
						{value}
						bind:group={positionValue}
						onchange={() => updateIframeStylesheet('position', value)}
					/>
					<label for="position-property-{value}">
						{value}
					</label>
				{/each}
			{/snippet}
		</RadioButtonGroup>

		{#if positionValue === 'fixed' || positionValue === 'absolute' || positionValue === 'relative'}
			<h3>Offset</h3>
			{#each Object.keys(offsetProperties) as property}
				<div class="form-control">
					<UnitInput
						label={property}
						value={offsetProperties[property]}
						name="input-{property}"
						allowedUnits={positionUnits}
						onUpdate={(newValue) => updateIframeStylesheet(property, newValue)}
					/>
				</div>
			{/each}
		{/if}
	{/snippet}
</PanelGroup>
