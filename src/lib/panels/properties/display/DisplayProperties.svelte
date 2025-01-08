<script lang="ts">
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import {
		displayValues,
		flexDirectionValues,
		flexWrapValues,
		alignItemsValues,
		justifyContentValues,
		flexGapValues,
		gridGapValues,
		gridTemplateColumnsPresets
	} from '$lib/properties';

	let selectedDisplayValue = $state('');
	let prevDisplayValue = null;
	let selectedFlexProps = $state({
		'flex-direction': {
			value: '',
			values: flexDirectionValues
		},
		'justify-content': {
			value: '',
			values: justifyContentValues
		},
		'align-items': {
			value: '',
			values: alignItemsValues
		},
		'flex-wrap': {
			value: '',
			values: flexWrapValues
		},
		gap: {
			value: '',
			values: flexGapValues
		}
	});
	let prevFlexValues = {};
	let selectedGridProps = $state({
		'grid-template-columns': {
			value: '',
			values: gridTemplateColumnsPresets
		},
		gap: {
			value: '',
			values: gridGapValues
		}
	});
	let prevGridValues = {};

	$effect(() => {
		const newDisplayValue = getPropertyValue('display', '', true);
		if (newDisplayValue !== prevDisplayValue) {
			prevDisplayValue = newDisplayValue;
			selectedDisplayValue = newDisplayValue;
		}

		Object.keys(selectedFlexProps).forEach((prop) => {
			const newValue = getPropertyValue(prop, '', true);
			if (newValue !== prevFlexValues[prop]) {
				prevFlexValues[prop] = newValue;
				selectedFlexProps[prop].value = newValue;
			}
		});

		Object.keys(selectedGridProps).forEach((prop) => {
			const newValue = getPropertyValue(prop, '', true);
			if (selectedGridProps[prop] !== newValue) {
				prevGridValues[prop] = newValue;
				selectedGridProps[prop].value = newValue;
			}
		});
	});
</script>

<!-- Main Displays -->
<PanelGroup title="Display">
	{#snippet panelContent()}
		<RadioButtonGroup>
			{#snippet content()}
				{#each displayValues as value}
					<div class="radio-button">
						<input
							type="radio"
							name="display-property"
							id="display-property-{value}"
							{value}
							bind:group={selectedDisplayValue}
							onchange={() => {
								updateIframeStylesheet('display', value);
							}}
						/>
						<label for="display-property-{value}">
							{value}
						</label>
					</div>
				{/each}
			{/snippet}
		</RadioButtonGroup>

		<!-- flex -->
		{#if selectedDisplayValue.includes('flex')}
			{#each Object.keys(selectedFlexProps) as property}
				<h3>{property}</h3>
				<RadioButtonGroup>
					{#snippet content()}
						{#each selectedFlexProps[property].values as value}
							<input
								type="radio"
								name="display-flex-{property}"
								id="display-flex-{property}-{value}"
								{value}
								bind:group={selectedFlexProps[property].value}
								onchange={() => {
									updateIframeStylesheet(property, value);
								}}
							/>
							<label for="display-flex-{property}-{value}">
								{value}
							</label>
						{/each}
					{/snippet}
				</RadioButtonGroup>
			{/each}
		{/if}

		<!-- Grid Properties -->
		{#if selectedDisplayValue.includes('grid')}
			{#each Object.keys(selectedGridProps) as property}
				<h3>{property}</h3>
				<RadioButtonGroup>
					{#snippet content()}
						{#each selectedGridProps[property].values as value}
							<input
								type="radio"
								name="display-grid-{property}"
								id="display-grid-{property}-{value}"
								{value}
								bind:group={selectedGridProps[property].value}
								onchange={() => {
									updateIframeStylesheet(property, value);
								}}
							/>
							<label for="display-grid-{property}-{value}">
								{value}
							</label>
						{/each}
					{/snippet}
				</RadioButtonGroup>
			{/each}
		{/if}
	{/snippet}
</PanelGroup>
