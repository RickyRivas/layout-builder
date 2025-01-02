<script>
	import PropertiesPanel from '$lib/panels/properties/PropertiesPanel.svelte';
	import BuilderPanel from '$lib/panels/builder/BuilderPanel.svelte';
	import GhostSelector from '$lib/GhostSelector.svelte';

	import { iframeState, initIframe } from '$lib/shared.svelte';
	import { onMount } from 'svelte';

	let iframeElement;

	onMount(() => {
		iframeElement.src = iframeState.src;
		initIframe(iframeElement);
	});
</script>

<section id="main-view">
	<BuilderPanel />
	<div class="iframe-container">
		<GhostSelector />
		<iframe id="preview" bind:this={iframeElement} title="preview" />
	</div>
	<PropertiesPanel />
</section>
