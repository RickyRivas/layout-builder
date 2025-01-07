<script>
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import { positionValues, offsetProperties } from '$lib/properties';
	import {
		iframeState,
		updateIframeStylesheet,
		findDefaultPropertyValue
	} from '$lib/shared.svelte';

	let selectedPositionValue = $state();
	let offsetValues = $state({
		top: '',
		right: '',
		bottom: '',
		left: '',
		zIndex: ''
	});

	function handlePositionChange(value) {
		if (!iframeState.selected) return;

		selectedPositionValue = value;
		updateIframeStylesheet('position', value);
	}

	function handleOffsetChange(property, value) {
		if (!iframeState.selected) return;

		updateIframeStylesheet(property, value);
		offsetValues[property] = value;
	}

	function showOffsetControls() {
		return ['relative', 'fixed', 'absolute'].includes(selectedPositionValue);
	}

	$effect(() => {
		if (!iframeState.selected) return;

		// update pos value
		const computedPosition = findDefaultPropertyValue(
			iframeState.selected,
			'position',
			positionValues
		);

		if (computedPosition !== selectedPositionValue) {
			selectedPositionValue = computedPosition;
		}

		// update offset values
		const computedStyle = getComputedStyle(iframeState.selected);
		offsetProperties.forEach((prop) => {
			const computedValue = computedStyle[prop];
			if (offsetValues[prop] !== computedValue) {
				offsetValues[prop] = computedValue;
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
						checked={value === selectedPositionValue}
						onchange={() => handlePositionChange(value)}
					/>
					<label for="position-property-{value}" class:active={value === selectedPositionValue}>
						{value}
					</label>
				{/each}
			{/snippet}
		</RadioButtonGroup>

		{#if showOffsetControls()}
			<div class="offset-controls">
				<h4>Offset</h4>
				{#each offsetProperties as property}
					<div class="form-control">
						<label for="offset-{property}">
							{property}
							<input
								type="text"
								value={offsetValues[property]}
								id="offset-{property}"
								onchange={(e) => handleOffsetChange(property, e.target.value)}
								placeholder="auto"
							/>
						</label>
					</div>
				{/each}
			</div>
		{/if}
	{/snippet}
</PanelGroup>
