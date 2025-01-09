<script>
	import { onMount } from 'svelte';
	import DynamicIcon from './DynamicIcon.svelte';
	let { title, panelContent, keepOpen = false } = $props();
	let showPanelContent = $state(false);

	onMount(() => {
		if (keepOpen) {
			showPanelContent = true;
		}
	});

	function onclick() {
		if (keepOpen) return;
		showPanelContent = !showPanelContent;
	}
</script>

<div class="panel-group" class:active={!keepOpen && showPanelContent}>
	<h2 class="panel-group-tab" class:active={!keepOpen && showPanelContent}>
		<button {onclick} aria-expanded={showPanelContent} class:no-icon={keepOpen}>
			<span>
				{title}
			</span>
			<DynamicIcon
				fill="currentcolor"
				path="M22 0a22 22 0 1 0 0 44 22 22 0 0 0 0-44ZM11.602 20.71a2.054 2.054 0 0 1 0-2.912c.807-.8 2.114-.808 2.913 0l7.476 7.476 7.477-7.476a2.054 2.054 0 0 1 2.913 0c.8.808.808 2.114 0 2.913l-8.92 8.937a2.054 2.054 0 0 1-2.913 0l-8.946-8.937Z"
			/>
		</button>
	</h2>
	{#if showPanelContent}
		<div class="panel-group-content">
			{@render panelContent()}
		</div>
	{/if}
</div>
