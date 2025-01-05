<script>
	import PropertiesPanel from '$lib/panels/properties/PropertiesPanel.svelte';
	import BuilderPanel from '$lib/panels/builder/BuilderPanel.svelte';
	import SelectionOverlay from '$lib/overlays/SelectionOverlay.svelte';

	import { iframeState, initIframe } from '$lib/shared.svelte';
	import { onMount } from 'svelte';
	import HoverOverlay from '$lib/overlays/HoverOverlay.svelte';

	let iframeElement;

	onMount(() => {
		iframeElement.src = iframeState.src;
		initIframe(iframeElement);
	});
</script>

<section id="main-view">
	<BuilderPanel />
	<div class="iframe-container">
		<SelectionOverlay />
		<HoverOverlay />
		<iframe id="preview" bind:this={iframeElement} title="preview" />
	</div>
	<PropertiesPanel />
</section>
