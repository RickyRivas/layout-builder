<script>
	import DynamicIcon from '$lib/components/DynamicIcon.svelte';
	import { iframeState } from '$lib/shared.svelte';

	let {
		value,
		onUpdate,
		name,
		label = '',
		width = 'full',
		defaultValue,
		allowedUnits = []
	} = $props();
	let currentElement = $state(null);
	let inputValue = $state('');
	let isSaved = $state(false);
	let isValid = $state(true);

	console.log('value', value, label);

	$effect(() => {
		if (!iframeState.selected) return;

		// Reset if element changed
		if (currentElement !== iframeState.selected) {
			currentElement = iframeState.selected;
		}

		// Update input value when prop changes
		inputValue = value;
	});

	function validateInput(value) {
		// Allow empty values (will be handled in save)
		if (!value?.trim()) return false;

		// Check if value is a special unit (auto, none, normal)
		if (allowedUnits.includes(value)) return true;

		// Check for valid number + unit combination
		const match = value.match(/^-?\d+(\.\d+)?(\D+)$/);
		if (!match) return false;

		// Check if unit is allowed
		return allowedUnits.some((unit) => value.endsWith(unit));
	}

	function onclick() {
		if (!validateInput(inputValue)) {
			// Show invalid state
			isValid = false;
			// Reset after 1s
			setTimeout(() => {
				isValid = true;
			}, 1000);

			// Reset value
			inputValue = value || defaultValue;
			return;
		}

		if (!inputValue?.trim()) {
			inputValue = defaultValue;
			onUpdate(defaultValue);
		} else if (inputValue !== value) {
			onUpdate(inputValue);
		}

		isSaved = true;
		setTimeout(() => {
			isSaved = false;
		}, 1000);
	}
</script>

<div class="form-control width-{width}">
	<div class="unit-input-container">
		{#if label}
			<label for="unit-input-{name}">
				{label}
			</label>
		{/if}
		<div class="unit-input-field">
			<input
				id="unit-input-{name}"
				name="unit-input-{name}"
				type="text"
				class:invalid={!isValid}
				bind:value={inputValue}
				title={`Allowed units: ${allowedUnits.join(', ')}`}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						onclick();
					}
				}}
			/>
			<button class="save-button" {onclick} class:invalid={!isValid} class:saved={isSaved}>
				<DynamicIcon
					path="M43.08 7.206a3.147 3.147 0 0 1 0 4.448l-25.14 25.14a3.147 3.147 0 0 1-4.45 0L.92 24.224a3.147 3.147 0 0 1 0-4.448 3.147 3.147 0 0 1 4.45 0l10.35 10.34 22.92-22.91a3.147 3.147 0 0 1 4.45 0h-.01Z"
					fill="currentcolor"
				/>
			</button>
		</div>
	</div>
</div>

<style lang="less">
	.unit-input-container {
		display: block;
		position: relative;

		.unit-input-field {
			display: flex;
			position: relative;
			background: var(--border-color);

			button.save-button {
				border-radius: 0px;
				border: 0;
				line-height: 0;
				background: none;
				padding: 10px;
				text-transform: uppercase;
				width: 44px;
				min-width: 44px;
				transition:
					color 0.33s ease,
					background-color 0.33s ease;

				&.saved {
					background-color: green;
					color: #fff;
				}
				&.invalid {
					background-color: red;
					color: #fff;
				}
			}
		}

		label {
			width: 100%;
			display: block;
		}

		input {
			width: 100%;
		}

		& > div {
			display: flex;
		}

		.unit-input-list {
			display: flex;
			flex-direction: column;
			gap: 2px;
			position: absolute;
			top: calc(100% + 2px);
			background-color: #fff;
			padding: 2px;
			width: 100%;
			box-shadow: var(--box-shadow);

			.unit-option {
				display: block;
				width: 100%;
				text-align: center;
				font-size: 16px;
				line-height: 40px;
				border: 0px;
				background-color: #fff;
				transition: background-color 0.33s ease;
				&:hover,
				&.selected {
					background-color: var(--border-color);
				}
			}
		}
	}
</style>
