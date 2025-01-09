<script lang="ts">
	import DynamicIcon from '$lib/components/DynamicIcon.svelte';
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { textTransforms } from '$lib/properties';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let textTransformValue = $state('');
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('textTransform', '', true);

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			textTransformValue = newValue;
		}
	});
</script>

<RadioButtonGroup label={'Text Transform'}>
	{#snippet content()}
		{#each textTransforms as { value, label, path }}
			<div class="radio-button">
				<input
					type="radio"
					id="text-transform-{value}"
					name="text-transform-{value}"
					{value}
					bind:group={textTransformValue}
					onchange={() => {
						updateIframeStylesheet('text-transform', value);
					}}
				/>
				<label for="text-transform-{value}">
					<DynamicIcon {path} fill={'currentcolor'} />
					<span class="tooltip">{label}</span>
				</label>
			</div>
		{/each}
	{/snippet}
</RadioButtonGroup>
