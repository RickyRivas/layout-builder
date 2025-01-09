<script lang="ts">
	import DynamicIcon from '$lib/components/DynamicIcon.svelte';
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { textAlignValues } from '$lib/properties';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let textAlignValue = $state('');
	let prevValue = $state(null);

	$effect(() => {
		let newValue = getPropertyValue('textAlign', '', true);
		if (newValue !== prevValue) {
			prevValue = newValue;
			textAlignValue = prevValue;
		}
	});
</script>

<h3>Text Align</h3>
<RadioButtonGroup>
	{#snippet content()}
		{#each textAlignValues as { value, label, path }}
			<div class="radio-button">
				<input
					type="radio"
					name="text-align-{value}"
					id="text-align-{value}"
					{value}
					bind:group={textAlignValue}
					onchange={() => {
						updateIframeStylesheet('text-align', value);
					}}
				/>
				<label for="text-align-{value}">
					<DynamicIcon {path} fill={'currentcolor'} />
					<span class="tooltip">{label}</span>
				</label>
			</div>
		{/each}
	{/snippet}
</RadioButtonGroup>
