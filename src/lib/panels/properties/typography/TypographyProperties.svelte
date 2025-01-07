<script>
	import PropertyGroup from '../PropertyGroup.svelte';
	import FontFamilyProperty from './FontFamilyProperty.svelte';
	import FontSizeProperty from './FontSizeProperty.svelte';
	import FontWeightProperty from './FontWeightProperty.svelte';
	import TextAlignProperty from './TextAlignProperty.svelte';
</script>

<PropertyGroup title="Typography">
	{#snippet propertyContent()}
		<TextAlignProperty />
		<FontFamilyProperty />
		<FontWeightProperty />
		<FontSizeProperty />
	{/snippet}
</PropertyGroup>
