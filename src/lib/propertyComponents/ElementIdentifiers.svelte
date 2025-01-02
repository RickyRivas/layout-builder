<script>
	import { iframeState } from '../../routes/shared.svelte';
	let currentId = $state('');
	let currentClasses = $state('');

	$effect(() => {
		if (iframeState.selected) {
			currentId = iframeState.selected.id;
			currentClasses = iframeState.selected.className;
		}
	});

	$effect(() => {
		if (!iframeState.selected) return;

		// ids
		iframeState.selected.id = currentId;

		// classes
		const oldClasses = iframeState.selected.className.split(' ');
		oldClasses.forEach((cls) => {
			if (cls) iframeState.selected.classList.remove(cls);
		});

		const classArray = currentClasses.trim().split(/\s+/);
		classArray.forEach((cls) => {
			if (cls) iframeState.selected.classList.add(cls);
		});
	});
</script>

<div class="form-control">
	<label for="element-classname">
		Classname(s)
		<input
			type="text"
			name="element-classname"
			id="element-classname"
			bind:value={currentClasses}
		/>
	</label>
</div>

<div class="form-control">
	<label for="element-id">
		Id
		<input type="text" name="element-id" id="element-id" bind:value={currentId} />
	</label>
</div>
