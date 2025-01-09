<script lang="ts">
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import DynamicIcon from '$lib/components/DynamicIcon.svelte';
	import {
		displayValues,
		flexDirectionValues,
		flexWrapValues,
		alignItemsValues,
		justifyContentValues,
		gridTemplateColumnsPresets
	} from '$lib/properties';

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
<PanelGroup title="Display" keepOpen={true}>
	{#snippet panelContent()}
		<RadioButtonGroup>
			{#snippet content()}
				{#each displayValues as { value, label, path }}
					<div class="radio-button">
						<input
							type="radio"
							name="display-property-{value}"
							id="display-property-{value}"
							{value}
							bind:group={selectedDisplayValue}
							onchange={() => {
								updateIframeStylesheet('display', value);
							}}
						/>
						<label for="display-property-{value}">
							<DynamicIcon {path} fill={'currentcolor'} />
							<span class="tooltip">{label}</span>
						</label>
					</div>
				{/each}
			{/snippet}
		</RadioButtonGroup>

		<!-- flex -->
		{#if selectedDisplayValue.includes('flex')}
			{#each Object.keys(selectedFlexProps) as property}
				<RadioButtonGroup label={selectedFlexProps[property].label}>
					{#snippet content()}
						{#each selectedFlexProps[property].values as { value, label, path }}
							<div class="radio-button">
								<input
									type="radio"
									name="display-flex-{property}-{value}"
									id="display-flex-{property}-{value}"
									{value}
									data-checked={value === selectedFlexProps[property].value}
									bind:group={selectedFlexProps[property].value}
									onchange={() => {
										updateIframeStylesheet(property, value);
									}}
								/>
								<label for="display-flex-{property}-{value}">
									<DynamicIcon {path} fill={'currentcolor'} />
									<span class="tooltip">{label}</span>
								</label>
							</div>
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
							<div class="radio-button">
								<input
									type="radio"
									name="grid-property-{property}-{value}"
									id="grid-property-{property}-{value}"
									{value}
									data-checked={value === selectedGridProps[property].value}
									bind:group={selectedGridProps[property].value}
									onchange={() => {
										updateIframeStylesheet(property, value);
									}}
								/>
								<label for="grid-property-{property}-{value}">
									<DynamicIcon {path} fill={'currentcolor'} />
									<span class="tooltip">{label}</span>
								</label>
							</div>
						{/each}
					{/snippet}
				</RadioButtonGroup>
			{/each}
		{/if}
	{/snippet}
</PanelGroup>
