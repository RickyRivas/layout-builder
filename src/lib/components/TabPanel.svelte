<script>
	import BuilderPanel from '$lib/panels/builder/BuilderPanel.svelte';
	import PropertiesPanel from '$lib/panels/properties/PropertiesPanel.svelte';
	import { fly } from 'svelte/transition';

	const panels = [
		{ id: 'layout', label: 'Layout', Component: BuilderPanel },
		{ id: 'properties', label: 'Properties', Component: PropertiesPanel }
	];

	let activeIndex = $state(0);
	function handleClick(index) {
		activeIndex = index;
	}
</script>

<div id="tabpanel" role="tablist">
	<div class="panel-tabs">
		{#each panels as panel, i}
			<button
				role="tab"
				aria-selected={i === activeIndex}
				aria-controls="panel-{panel.id}"
				id="tab-{panel.id}"
				onclick={() => handleClick(i)}
				class:active={i === activeIndex}
			>
				{panel.label}
			</button>
		{/each}
	</div>

	{#each panels as { Component, id }, i}
		{#if i === activeIndex}
			<div
				id="panel-{id}"
				class="panel"
				role="tabpanel"
				aria-labelledby="tab-{id}"
				hidden={i !== activeIndex}
			>
				<Component />
			</div>
		{/if}
	{/each}
</div>
