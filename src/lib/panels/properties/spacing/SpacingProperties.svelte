<script lang="ts">
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import UnitInput from '$lib/panels/properties/UnitInput.svelte';

	// State for spacing values
	const spacing = $state({
		'margin-top': '',
		'margin-right': '',
		'margin-bottom': '',
		'margin-left': '',
		'padding-top': '',
		'padding-right': '',
		'padding-bottom': '',
		'padding-left': ''
	});

	// Watch for element selection
	$effect(() => {
		if (!iframeState.selected) return;

		const computedStyle = getComputedStyle(iframeState.selected);

		// Update margin values
		spacing['margin-top'] = computedStyle.marginTop;
		spacing['margin-right'] = computedStyle.marginRight;
		spacing['margin-bottom'] = computedStyle.marginBottom;
		spacing['margin-left'] = computedStyle.marginLeft;

		// Update padding values
		spacing['padding-top'] = computedStyle.paddingTop;
		spacing['padding-right'] = computedStyle.paddingRight;
		spacing['padding-bottom'] = computedStyle.paddingBottom;
		spacing['padding-left'] = computedStyle.paddingLeft;
	});

	function updateSpacing(property, value) {
		if (!iframeState.selected) return;

		// Extract base property (margin/padding) and side
		const [baseProperty, side] = property.split('-') as [
			'margin' | 'padding',
			'top' | 'right' | 'bottom' | 'left'
		];

		// Get all current values
		const computedStyle = getComputedStyle(iframeState.selected);
		const values = {
			top: side === 'top' ? value : computedStyle[`${baseProperty}Top`],
			right: side === 'right' ? value : computedStyle[`${baseProperty}Right`],
			bottom: side === 'bottom' ? value : computedStyle[`${baseProperty}Bottom`],
			left: side === 'left' ? value : computedStyle[`${baseProperty}Left`]
		};

		// Format and update
		const formattedRule = formatSpacingValues(values);
		updateIframeStylesheet(baseProperty, formattedRule);
	}

	function formatSpacingValues(values) {
		// If all values are the same
		if (
			values.top === values.right &&
			values.right === values.bottom &&
			values.bottom === values.left
		) {
			return `${values.top}`;
		}

		// If vertical values are same and horizontal values are same
		if (values.top === values.bottom && values.left === values.right) {
			return `${values.top} ${values.right}`;
		}

		// If only horizontal values are same
		if (values.left === values.right) {
			return `${values.top} ${values.right} ${values.bottom}`;
		}

		// Otherwise use full longhand form
		return `${values.top} ${values.right} ${values.bottom} ${values.left}`;
	}
</script>

<PanelGroup title="Spacing">
	{#snippet panelContent()}
		<div class="spacing-widget">
			{#each Object.entries(spacing) as [key, value]}
				<div class={key}>
					<UnitInput
						{value}
						name={key}
						onUpdate={(e) => {
							updateSpacing(key, e);
						}}
					/>
				</div>
			{/each}
		</div>
	{/snippet}
</PanelGroup>

<style lang="less">
	.spacing-widget {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		place-items: center;
		width: 200px;
		height: 200px;
		border: 1px solid #000;

		.margin-top {
			grid-area: 1 / 3;
		}
		.margin-right {
			grid-area: 3 / 5;
		}
		.margin-bottom {
			grid-area: 5 / 3;
		}
		.margin-left {
			grid-area: 3 / 1;
		}
		.padding-top {
			grid-area: 3 / 2;
		}
		.padding-right {
			grid-area: 3 / 4;
		}
		.padding-bottom {
			grid-area: 4 / 3;
		}
		.padding-left {
			grid-area: 2 / 3;
		}
	}
</style>
