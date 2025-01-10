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
