<script>
	import PropertiesPanel from '$lib/components/PropertiesPanel.svelte';
	import BuilderPanel from '$lib/components/BuilderPanel.svelte';
	import { onMount } from 'svelte';
	import { iframeState, initIframe } from './shared.svelte';
	import GhostSelector from '$lib/components/GhostSelector.svelte';

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
