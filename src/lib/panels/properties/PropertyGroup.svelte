<script>
	let { title, propertyContent } = $props();
	let showPropertyContent = $state(false);

	function onclick() {
		showPropertyContent = !showPropertyContent;
	}
</script>

<div class="property-group">
	<button {onclick}>
		<h3>{title}</h3>
	</button>
	{#if showPropertyContent}
		<div class="property-content">
			{@render propertyContent()}
		</div>
	{/if}
</div>
