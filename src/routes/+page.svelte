<script>
	import PropertiesSidebar from '$lib/components/PropertiesSidebar.svelte';
	import PanelSidebar from '$lib/components/PanelSidebar.svelte';
	import { onMount } from 'svelte';
	import { iframeState, initIframe } from './shared.svelte';
	import { getSelector } from '$lib/helpers';

	let iframeElement;

	onMount(() => {
		iframeElement.src = iframeState.src;
		initIframe(iframeElement);
	});
</script>

<section id="main-view">
	<PanelSidebar />
	<div class="iframe-container">
		{#if iframeState.selected}
			<p>Selected: {getSelector(iframeState.selected)}</p>
		{/if}
		{#if iframeState.updating}
			<span>Updating...</span>
		{/if}
		<iframe id="preview" bind:this={iframeElement} title="preview" />
	</div>
	<PropertiesSidebar />
</section>
