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

	function updateId(newId) {
		if (!iframeState.selected) return;
		iframeState.selected.id = newId;
		currentId = newId;
	}

	function updateClasses(newCls) {
		if (!iframeState.selected) return;

		const oldClasses = iframeState.selected.className.split(' ');
		oldClasses.forEach((cls) => {
			if (cls) iframeState.selected.classList.remove(cls);
		});

		const newClasses = newCls.split(' ');
		newClasses.forEach((cls) => {
			if (cls) iframeState.selected.classList.add(cls);
		});

		currentClasses = newCls;
	}
</script>

<div class="form-control">
	<label for="element-classname">
		Classname(s)
		<input
			type="text"
			name="element-classname"
			id="element-classname"
			value={currentClasses}
			oninput={(e) => updateClasses(e.target.value)}
		/>
	</label>
</div>

<div class="form-control">
	<label for="element-id">
		Id
		<input
			type="text"
			name="element-id"
			id="element-id"
			oninput={(e) => updateId(e.target.value)}
			value={currentId}
		/>
	</label>
</div>
