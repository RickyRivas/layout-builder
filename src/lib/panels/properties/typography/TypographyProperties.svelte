<script>
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import FontSizeProperty from './FontSizeProperty.svelte';
	import FontWeightProperty from './FontWeightProperty.svelte';
	import LineHeightProperty from './LineHeightProperty.svelte';
	import TextAlignProperty from './TextAlignProperty.svelte';
</script>

<PanelGroup title="Typography">
	{#snippet panelContent()}
		<TextAlignProperty />
		<FontWeightProperty />
		<FontSizeProperty />
		<LineHeightProperty />
	{/snippet}
</PanelGroup>
