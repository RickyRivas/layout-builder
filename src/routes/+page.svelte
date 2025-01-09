<script>
	import SelectionOverlay from '$lib/overlays/SelectionOverlay.svelte';

	import { iframeState, initIframe, updateGhostPosition } from '$lib/shared.svelte';
	import { onMount } from 'svelte';
	import HoverOverlay from '$lib/overlays/HoverOverlay.svelte';
	import DragOverlay from '$lib/overlays/DragOverlay.svelte';
	import TabPanel from '$lib/components/TabPanel.svelte';

	let iframeElement;

	function onResize() {
		updateGhostPosition();
	}

	onMount(() => {
		iframeElement.src = iframeState.src;
		initIframe(iframeElement);

		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});
</script>

<section id="main-view">
	<TabPanel />
	<div class="iframe-container">
		<SelectionOverlay />
		<HoverOverlay />
		<DragOverlay />
		<iframe id="preview" bind:this={iframeElement} title="preview" />
	</div>
</section>
