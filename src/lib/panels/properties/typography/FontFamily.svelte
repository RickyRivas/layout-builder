<script lang="ts">
	import DropDrown from '$lib/components/DropDrown.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { fontFamilyValues } from '$lib/properties';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let fontFamily = $state('Inter');
	let prevValue = $state(null);

	// $effect(() => {
	// 	const newValue = getPropertyValue('font-family', '', true);

	// 	if (newValue !== fontFamily) {
	// 		prevValue = newValue;
	// 		fontFamily = newValue;
	// 	}
	// });
</script>

<DropDrown
	label="Font Family"
	width="half"
	value={fontFamily}
	options={fontFamilyValues}
	onUpdate={(newValue) => {
		updateIframeStylesheet('font-family', newValue);
	}}
/>
