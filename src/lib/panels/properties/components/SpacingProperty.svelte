<script lang="ts">
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';
	import PropertyGroup from './PropertyGroup.svelte';
	import SpacingInput from './SpacingInput.svelte';

	// State for spacing values
	let marginTop = $state('');
	let marginRight = $state('');
	let marginBottom = $state('');
	let marginLeft = $state('');
	let paddingTop = $state('');
	let paddingRight = $state('');
	let paddingBottom = $state('');
	let paddingLeft = $state('');

	// Watch for element selection
	$effect(() => {
		if (!iframeState.selected) return;

		const computedStyle = getComputedStyle(iframeState.selected);

		// Update margin values
		marginTop = computedStyle.marginTop;
		marginRight = computedStyle.marginRight;
		marginBottom = computedStyle.marginBottom;
		marginLeft = computedStyle.marginLeft;

		// Update padding values
		paddingTop = computedStyle.paddingTop;
		paddingRight = computedStyle.paddingRight;
		paddingBottom = computedStyle.paddingBottom;
		paddingLeft = computedStyle.paddingLeft;
	});

	function updateSpacing(
		property: 'margin' | 'padding',
		side: 'top' | 'right' | 'bottom' | 'left',
		value: string
	) {
		if (!iframeState.selected) return;

		// Get all current values
		const computedStyle = getComputedStyle(iframeState.selected);
		const values = {
			top: side === 'top' ? value : computedStyle[`${property}Top`],
			right: side === 'right' ? value : computedStyle[`${property}Right`],
			bottom: side === 'bottom' ? value : computedStyle[`${property}Bottom`],
			left: side === 'left' ? value : computedStyle[`${property}Left`]
		};

		// Format and update
		const formattedRule = formatSpacingValues(values);

		console.log('updateSpacing', property, formattedRule);
		updateIframeStylesheet(property, formattedRule);
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

<PropertyGroup title="Spacing">
	{#snippet propertyContent()}
		<div class="spacing-widget">
			<div class="form-control margin-top">
				<SpacingInput
					value={marginTop}
					onUpdate={(e) => {
						updateSpacing('margin', 'top', e);
					}}
				/>
			</div>
			<div class="form-control margin-right">
				<SpacingInput
					value={marginRight}
					onUpdate={(e) => {
						updateSpacing('margin', 'right', e);
					}}
				/>
			</div>
			<div class="form-control margin-bottom">
				<SpacingInput
					value={marginBottom}
					onUpdate={(e) => {
						updateSpacing('margin', 'bottom', e);
					}}
				/>
			</div>
			<div class="form-control margin-left">
				<SpacingInput
					value={marginLeft}
					onUpdate={(e) => {
						updateSpacing('margin', 'left', e);
					}}
				/>
			</div>

			<div class="padding-container">
				<div class="form-control padding-top">
					<SpacingInput
						value={paddingTop}
						onUpdate={(e) => {
							updateSpacing('padding', 'top', e);
						}}
					/>
				</div>
				<div class="form-control padding-right">
					<SpacingInput
						value={paddingRight}
						onUpdate={(e) => {
							updateSpacing('padding', 'right', e);
						}}
					/>
				</div>
				<div class="form-control padding-bottom">
					<SpacingInput
						value={paddingBottom}
						onUpdate={(e) => {
							updateSpacing('padding', 'bottom', e);
						}}
					/>
				</div>
				<div class="form-control padding-left">
					<SpacingInput
						value={paddingLeft}
						onUpdate={(e) => {
							updateSpacing('padding', 'left', e);
						}}
					/>
				</div>
			</div>
		</div>
	{/snippet}
</PropertyGroup>

<style lang="less">
	.spacing-widget {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		width: 250px;
		height: 250px;
		border: 1px solid #000;

		.padding-container {
			display: grid;
			grid-row: 2 / 5;
			grid-column: 2 / 5;
			border: 1px solid #000;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, 1fr);
		}

		.form-control {
			&.margin-top {
				grid-area: 1 / 3;
			}
			&.margin-right {
				grid-area: 3 / 5;
			}
			&.margin-bottom {
				grid-area: 5 / 3;
			}
			&.margin-left {
				grid-area: 3 / 1;
			}
			&.padding-top {
				grid-area: 1 / 2;
			}
			&.padding-right {
				grid-area: 2 / 3;
			}
			&.padding-bottom {
				grid-area: 3 / 2;
			}
			&.padding-left {
				grid-area: 2 / 1;
			}
			input {
				height: 100%;
				padding: 0;
				font-size: 14px;
				text-align: center;
			}
		}
	}
</style>
