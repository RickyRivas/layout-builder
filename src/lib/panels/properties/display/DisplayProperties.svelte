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
		gridTemplateColumnsPresets
	} from '$lib/properties';
	import RadioButton from '$lib/components/RadioButton.svelte';

	let selectedDisplayValue = $state('');
	let prevDisplayValue = null;
	let selectedFlexProps = $state({
		'flex-direction': {
			value: '',
			label: 'Flex Direction',
			values: flexDirectionValues
		},
		'justify-content': {
			value: '',
			label: 'Justify Content',
			values: justifyContentValues
		},
		'align-items': {
			value: '',
			label: 'Align Items',
			values: alignItemsValues
		},
		'flex-wrap': {
			value: '',
			label: 'Flex Wrap',
			values: flexWrapValues
		}
	});
	let prevFlexValues = {};
	let selectedGridProps = $state({
		'grid-template-columns': {
			value: '',
			values: gridTemplateColumnsPresets
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
				{#each displayValues as { value, label, path }}
					<RadioButton
						group={selectedDisplayValue}
						{value}
						{label}
						{path}
						property="display"
						onChange={(newValue) => {
							updateIframeStylesheet('display', newValue);
						}}
					/>
				{/each}
			{/snippet}
		</RadioButtonGroup>

		<!-- flex -->
		{#if selectedDisplayValue.includes('flex')}
			{#each Object.keys(selectedFlexProps) as property}
				<RadioButtonGroup label={selectedFlexProps[property].label}>
					{#snippet content()}
						{#each selectedFlexProps[property].values as { value, label, path }}
							<RadioButton
								group={selectedFlexProps[property].value}
								{value}
								{label}
								{path}
								{property}
								onChange={(newValue) => {
									updateIframeStylesheet(property, newValue);
								}}
							/>
						{/each}
					{/snippet}
				</RadioButtonGroup>
			{/each}
		{/if}

		<!-- Grid Properties -->
		{#if selectedDisplayValue.includes('grid')}
			{#each Object.keys(selectedGridProps) as property}
				<RadioButtonGroup label={selectedGridProps[property].label}>
					{#snippet content()}
						{#each selectedGridProps[property].values as { value, label, path }}
							<RadioButton
								group={selectedGridProps[property].value}
								{value}
								{label}
								{path}
								{property}
								onChange={(newValue) => {
									updateIframeStylesheet(property, newValue);
								}}
							/>
						{/each}
					{/snippet}
				</RadioButtonGroup>
			{/each}
		{/if}
	{/snippet}
</PanelGroup>
