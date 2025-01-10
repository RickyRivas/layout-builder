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
	import DropDrown from '$lib/components/DropDrown.svelte';

	let selectedDisplayValue = $state('');
	let prevDisplayValue = null;
	let selectedFlexProps = $state({
		'justify-content': {
			value: '',
			label: 'Justify Content',
			values: justifyContentValues,
			component: 'unit'
		},
		'align-items': {
			value: '',
			label: 'Align Items',
			values: alignItemsValues,
			component: 'unit'
		},
		// 'flex-wrap': {
		// 	value: '',
		// 	label: 'Flex Wrap',
		// 	values: flexWrapValues,
		// 	component: 'unit'
		// },
		'flex-direction': {
			value: '',
			label: 'Flex Direction',
			values: flexDirectionValues,
			component: 'dropdown'
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
<PanelGroup title="Display" keepOpen={true}>
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
		<!-- dropdown component or radio -->
		{#if selectedDisplayValue.includes('flex')}
			{#each Object.keys(selectedFlexProps) as property}
				{#if selectedFlexProps[property].component === 'unit'}
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
				{:else if selectedFlexProps[property].component === 'dropdown'}
					<DropDrown
						label={selectedFlexProps[property].label}
						value={selectedFlexProps[property].value}
						options={selectedFlexProps[property].values}
						onUpdate={(newValue) => {
							updateIframeStylesheet(property, newValue);
						}}
					/>
				{/if}
			{/each}
		{/if}

		<!-- Grid Properties -->
		{#if selectedDisplayValue.includes('grid')}
			{#each Object.keys(selectedGridProps) as property}
				<RadioButtonGroup label="Columns" style="text">
					{#snippet content()}
						{#each selectedGridProps[property].values as { value, label, path }}
							<RadioButton
								style="text"
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
