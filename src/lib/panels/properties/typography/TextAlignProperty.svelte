<script lang="ts">
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';

	const alignValues = ['start', 'left', 'center', 'right', 'justify'];
	let selectedAlign = $state('');

	$effect(() => {
		if (!iframeState.selected) return;
		selectedAlign = getComputedStyle(iframeState.selected).textAlign || 'left';
	});

	function updateAlign(value) {
		updateIframeStylesheet('text-align', value);
	}
</script>

<h3>Text Align</h3>
<div class="chips-radio-group">
	{#each alignValues as value}
		<input
			type="radio"
			name="text-align"
			id="text-align-{value}"
			{value}
			bind:group={selectedAlign}
			onchange={() => updateAlign(value)}
		/>
		<label for="text-align-{value}">
			{value}
		</label>
	{/each}
</div>
