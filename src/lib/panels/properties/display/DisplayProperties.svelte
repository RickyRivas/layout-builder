<script lang="ts">
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';
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
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';

	let currentElement = $state('');
	let selectedDisplayValue = $state('');
	let selectedFlexProps = $state({
		'flex-direction': '',
		'justify-content': '',
		'align-items': '',
		'flex-wrap': '',
		gap: ''
	});
	let selectedGridProps = $state({
		'grid-template-columns': '',
		gap: ''
	});

	$effect(() => {
		if (!iframeState.selected) return;

		// first time or new element selected
		if (!currentElement || currentElement !== iframeState.selected) {
			const computedStyle = getComputedStyle(iframeState.selected);

			// display
			selectedDisplayValue = computedStyle['display'];

			// reset
			selectedFlexProps = {
				'flex-direction': '',
				'justify-content': '',
				'align-items': '',
				'flex-wrap': '',
				gap: ''
			};
			selectedGridProps = {
				'grid-template-columns': '',
				gap: ''
			};

			// Update flex properties
			Object.keys(selectedFlexProps).forEach((prop) => {
				selectedFlexProps[prop] = computedStyle[prop];
			});

			// Update grid properties
			Object.keys(selectedGridProps).forEach((prop) => {
				selectedGridProps[prop] = computedStyle[prop];
			});

			currentElement = iframeState.selected;
			return;
		}

		// if same element, check if display value has changed
		const currentDisplayValue = getComputedStyle(iframeState.selected)['display'];
		if (currentDisplayValue === selectedDisplayValue) return;

		// update stylesheet
		updateIframeStylesheet('display', selectedDisplayValue);
	});

	// Watch for flex property changes
	$effect(() => {
		if (!iframeState.selected || !selectedDisplayValue.includes('flex')) return;

		Object.entries(selectedFlexProps).forEach(([property, value]) => {
			const currentValue = getComputedStyle(iframeState.selected)[property];
			if (value !== currentValue) {
				updateIframeStylesheet(property, value);
			}
		});
	});

	// Watch for grid property changes
	$effect(() => {
		if (!iframeState.selected || !selectedDisplayValue.includes('grid')) return;

		Object.entries(selectedGridProps).forEach(([property, value]) => {
			const currentValue = getComputedStyle(iframeState.selected)[property];
			if (value !== currentValue) {
				updateIframeStylesheet(property, value);
			}
		});
	});
</script>

<!-- Main Displays -->
<PanelGroup title="Display" keepOpen={true}>
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
			<!-- Flex Direction -->
			<h3>Direction</h3>
			<RadioButtonGroup>
				{#snippet content()}
					{#each flexDirectionValues as value}
						<input
							type="radio"
							name="display-flex-dir-property"
							id="display-flex-dir-property-{value}"
							{value}
							bind:group={selectedFlexProps['flex-direction']}
						/>
						<label for="display-flex-dir-property-{value}">
							{value}
						</label>
					{/each}
				{/snippet}
			</RadioButtonGroup>

			<!-- Justify Content -->
			<h3>Justify Content</h3>
			<RadioButtonGroup>
				{#snippet content()}
					{#each justifyContentValues as value}
						<input
							type="radio"
							name="display-flex-jc-property"
							id="display-flex-jc-property-{value}"
							{value}
							bind:group={selectedFlexProps['justify-content']}
						/>
						<label for="display-flex-jc-property-{value}">
							{value}
						</label>
					{/each}
				{/snippet}
			</RadioButtonGroup>

			<!-- Align Items -->
			<h3>Align Items</h3>
			<RadioButtonGroup>
				{#snippet content()}
					{#each alignItemsValues as value}
						<input
							type="radio"
							name="display-flex-ai-property"
							id="display-flex-ai-property-{value}"
							{value}
							bind:group={selectedFlexProps['align-items']}
						/>
						<label for="display-flex-ai-property-{value}">
							{value}
						</label>
					{/each}
				{/snippet}
			</RadioButtonGroup>

			<!--  flex wrap -->
			<h3>Flex-wrap</h3>
			<RadioButtonGroup>
				{#snippet content()}
					{#each flexWrapValues as value}
						<input
							type="radio"
							name="display-flex-wrap-property"
							id="display-flex-wrap-property-{value}"
							{value}
							bind:group={selectedFlexProps['flex-wrap']}
						/>
						<label for="display-flex-wrap-property-{value}">
							{value}
						</label>
					{/each}
				{/snippet}
			</RadioButtonGroup>

			<!--  flex gap -->
			<h3>Gap</h3>
			<RadioButtonGroup>
				{#snippet content()}
					{#each flexGapValues as value}
						<input
							type="radio"
							name="display-flex-gap-property"
							id="display-flex-gap-property-{value}"
							{value}
							bind:group={selectedFlexProps['gap']}
						/>
						<label for="display-flex-gap-property-{value}">
							{value}
						</label>
					{/each}
				{/snippet}
			</RadioButtonGroup>
		{/if}

		<!-- Grid Properties -->
		{#if selectedDisplayValue.includes('grid')}
			<h3>Template Columns</h3>
			<RadioButtonGroup>
				{#snippet content()}
					{#each gridTemplateColumnsPresets as preset}
						<input
							type="radio"
							name="grid-template-columns"
							id="grid-template-columns-{preset.value}"
							value={preset.value}
							bind:group={selectedGridProps['grid-template-columns']}
						/>
						<label for="grid-template-columns-{preset.value}">{preset.label}</label>
					{/each}
				{/snippet}
			</RadioButtonGroup>

			<h3>Gap</h3>
			<RadioButtonGroup>
				{#snippet content()}
					{#each gridGapValues as value}
						<input
							type="radio"
							name="grid-gap"
							id="grid-gap-{value}"
							{value}
							bind:group={selectedGridProps['gap']}
						/>
						<label for="grid-gap-{value}">{value}</label>
					{/each}
				{/snippet}
			</RadioButtonGroup>
		{/if}
	{/snippet}
</PanelGroup>
