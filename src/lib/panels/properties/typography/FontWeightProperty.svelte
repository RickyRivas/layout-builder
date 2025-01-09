<script lang="ts">
	import DropDrown from '$lib/components/DropDrown.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	const weightValues = [
		{ value: '200', label: '200 - Extra Light' },
		{ value: '300', label: '300 - Light' },
		{ value: '400', label: '400 - Regular' },
		{ value: '500', label: '500 - Medium' },
		{ value: '600', label: '600 - Semibold' },
		{ value: '700', label: '700 - Bold' }
	];

	let fontWeight = $state();
	let prevValue = $state(null);

	$effect(() => {
		const newValue = getPropertyValue('fontWeight', '', true);

		if (newValue !== fontWeight) {
			prevValue = newValue;
			fontWeight = newValue;
		}
	});
</script>

<DropDrown
	label="Font Weight"
	value={fontWeight}
	options={weightValues}
	onUpdate={(newValue) => {
		updateIframeStylesheet('font-weight', newValue);
	}}
/>
