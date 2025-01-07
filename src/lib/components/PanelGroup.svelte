<script>
	import { onMount } from 'svelte';

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

<div class="panel-group">
	<h3 class="panel-group-tab">
		<button {onclick} aria-expanded="false">
			{title}
		</button>
	</h3>
	{#if showPanelContent}
		<div class="panel-group-content">
			{@render panelContent()}
		</div>
	{/if}
</div>
