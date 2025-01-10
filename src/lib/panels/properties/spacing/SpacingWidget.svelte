<script>
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';
	import UnitInput from '$lib/panels/properties/UnitInput.svelte';
	import { getPropertyValue } from '$lib/helpers';
	let { config } = $props();

	let spacing = $state(config);
	let prevValues = {};
	// Add state for tracking which inputs are active
	let mode = $state('individual'); // 'individual', 'horizontal', 'vertical', 'all'

	// Function to cycle through modes
	function cycleMode() {
		switch (mode) {
			case 'individual':
				mode = 'horizontal';
				break;
			case 'horizontal':
				mode = 'vertical';
				break;
			case 'vertical':
				mode = 'all';
				break;
			case 'all':
				mode = 'individual';
				break;
		}
	}

	$effect(() => {
		Object.keys(spacing).forEach((property) => {
			const newValue = getPropertyValue(property, spacing[property].defaultValue, true);

			if (newValue !== prevValues[property]) {
				prevValues[property] = newValue;
				spacing[property].value = newValue;
			}
		});
	});

	function updateSpacing(property, value) {
		if (!iframeState.selected) return;
		if (value === null) value = 0;

		const [baseProperty, side] = property.split('-');
		const computedStyle = getComputedStyle(iframeState.selected);

		let values = {
			top: computedStyle[`${baseProperty}Top`],
			right: computedStyle[`${baseProperty}Right`],
			bottom: computedStyle[`${baseProperty}Bottom`],
			left: computedStyle[`${baseProperty}Left`]
		};

		// Update values based on mode
		switch (mode) {
			case 'individual':
				values[side] = value;
				break;
			case 'horizontal':
				if (side === 'left' || side === 'right') {
					values.left = value;
					values.right = value;
				}
				break;
			case 'vertical':
				if (side === 'top' || side === 'bottom') {
					values.top = value;
					values.bottom = value;
				}
				break;
			case 'all':
				values = {
					top: value,
					right: value,
					bottom: value,
					left: value
				};
				break;
		}

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

<div id="spacing-widget">
	{#each Object.entries(spacing) as [property, config]}
		<div class={property}>
			<UnitInput
				defaultValue=""
				label={config.label}
				allowedUnits={config.units}
				value={config.value}
				name={property}
				onUpdate={(e) => updateSpacing(property, e)}
			/>
		</div>
	{/each}
	<button
		class="spacing-widget-toggle {mode}"
		onclick={cycleMode}
		aria-label="click to toggle through modes"
	>
		<span class="lock-wrap">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="39"
				height="44"
				fill="none"
				viewBox="0 0 39 44"
				class="icon"
			>
				<path
					fill="currentColor"
					d="M12.375 12.375V16.5h13.75v-4.125A6.873 6.873 0 0 0 19.25 5.5a6.873 6.873 0 0 0-6.875 6.875Zm-5.5 4.125v-4.125C6.875 5.543 12.418 0 19.25 0s12.375 5.543 12.375 12.375V16.5H33c3.034 0 5.5 2.466 5.5 5.5v16.5c0 3.034-2.466 5.5-5.5 5.5H5.5A5.505 5.505 0 0 1 0 38.5V22c0-3.034 2.466-5.5 5.5-5.5h1.375Z"
				/>
			</svg>
		</span>
		<span class="lines">
			<span class="line-top"></span>
			<span class="line-right"></span>
			<span class="line-bottom"></span>
			<span class="line-left"></span>
		</span>
	</button>
</div>
