<script>
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import FontFamilyProperty from './FontFamilyProperty.svelte';
	import FontSizeProperty from './FontSizeProperty.svelte';
	import FontWeightProperty from './FontWeightProperty.svelte';
	import TextAlignProperty from './TextAlignProperty.svelte';
</script>

<PanelGroup title="Typography">
	{#snippet panelContent()}
		<TextAlignProperty />
		<FontFamilyProperty />
		<FontWeightProperty />
		<FontSizeProperty />
	{/snippet}
</PanelGroup>
