<script>
	import SelectionOverlay from '$lib/overlays/SelectionOverlay.svelte';

	import { iframeState, initIframe, updateGhostPosition } from '$lib/shared.svelte';
	import { onMount } from 'svelte';
	import HoverOverlay from '$lib/overlays/HoverOverlay.svelte';
	import DragOverlay from '$lib/overlays/DragOverlay.svelte';
	import TabPanel from '$lib/components/TabPanel.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PreviewBlock from '$lib/components/PreviewBlock.svelte';
	import DragManager from '$lib/components/DragManager.svelte';

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

	$effect(() => {
		if (iframeState.initialized && iframeState.document) {
			// Now we know the document is available
			iframeState.document.addEventListener('scroll', onResize);

			return () => {
				iframeState.document.removeEventListener('scroll', onResize);
			};
		}
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

<DragManager />

{#if iframeState.showCodeModal}
	<Modal
		onescape={() => {
			iframeState.showCodeModal = false;
		}}
	>
		<PreviewBlock />
	</Modal>
{/if}
