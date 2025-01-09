<script lang="ts">
	import DynamicIcon from '$lib/components/DynamicIcon.svelte';
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { fontStyles } from '$lib/properties';
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	let fontStyle = $state('');
	let prevValue = null; // Track previous value
	$effect(() => {
		const newValue = getPropertyValue('fontStyle', '', true);

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			fontStyle = newValue;
		}
	});
</script>

<RadioButtonGroup label={'Font Style'}>
	{#snippet content()}
		{#each fontStyles as { value, label, path }}
			<div class="radio-button">
				<input
					type="radio"
					id="font-style-{value}"
					name="font-style-{value}"
					{value}
					bind:group={fontStyle}
					onchange={() => {
						updateIframeStylesheet('font-style', value);
					}}
				/>
				<label for="font-style-{value}">
					<DynamicIcon {path} fill={'currentcolor'} />
					<span class="tooltip">{label}</span>
				</label>
			</div>
		{/each}
	{/snippet}
</RadioButtonGroup>
