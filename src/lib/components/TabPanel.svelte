<script>
	import BuilderPanel from '$lib/panels/builder/BuilderPanel.svelte';
	import PropertiesPanel from '$lib/panels/properties/PropertiesPanel.svelte';
	import { iframeState } from '$lib/shared.svelte';

	const panels = [
		{ id: 'layout', label: 'Layout', Component: BuilderPanel },
		{ id: 'properties', label: 'Styling', Component: PropertiesPanel }
	];
</script>

<div id="tabpanel" role="tablist" class:mobile-show={iframeState.showMobilePanel}>
	<div class="panel-tabs">
		{#each panels as panel, i}
			<button
				role="tab"
				aria-selected={i === iframeState.selectedPanelIndex}
				aria-controls="panel-{panel.id}"
				id="tab-{panel.id}"
				onclick={() => {
					iframeState.selectedPanelIndex = i;
				}}
				class:active={i === iframeState.selectedPanelIndex}
			>
				{panel.label}
			</button>
		{/each}
	</div>

	{#each panels as { Component, id }, i}
		{#if i === iframeState.selectedPanelIndex}
			<div
				id="panel-{id}"
				class="panel"
				role="tabpanel"
				aria-labelledby="tab-{id}"
				hidden={i !== iframeState.selectedPanelIndex}
			>
				<Component />
			</div>
		{/if}
	{/each}
</div>
