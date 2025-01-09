<script>
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import FontSizeProperty from './FontSizeProperty.svelte';
	import FontStyleProperty from './FontStyleProperty.svelte';
	import FontWeightProperty from './FontWeightProperty.svelte';
	import LineHeightProperty from './LineHeightProperty.svelte';
	import TextAlignProperty from './TextAlignProperty.svelte';
	import TextTransformProperty from './TextTransformProperty.svelte';
	import ColorProperty from './ColorProperty.svelte';
	import FontFamily from './FontFamily.svelte';
</script>

<PanelGroup title="Typography">
	{#snippet panelContent()}
		<FontSizeProperty />
		<LineHeightProperty />
		<FontWeightProperty />
		<FontFamily />
		<TextAlignProperty />
		<FontStyleProperty />
		<TextTransformProperty />
		<ColorProperty />
	{/snippet}
</PanelGroup>
