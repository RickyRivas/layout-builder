<script>
	import { getFullSelector, getSelector } from '$lib/helpers';
	import { iframeState } from '$lib/shared.svelte';

	let currentElement = $state();
	let currentId = $state('');
	let currentClasses = $state('');

	$effect(() => {
		if (!iframeState.selected) return;

		if (!currentElement || currentElement !== iframeState.selected) {
			currentId = iframeState.selected.id;
			currentClasses = iframeState.selected.className;
			currentElement = iframeState.selected;
		}
	});

	// when outside func generates a class, update here
	$effect(() => {
		if (currentElement === iframeState.selected && !iframeState.updating) {
			currentId = iframeState.selected.id;
			currentClasses = iframeState.selected.className;
			currentElement = iframeState.selected;
		}
	});

	// when we update a class or id, update stylesheet too :)
	function updateId(newId) {
		if (!iframeState.selected) return;

		// reactive
		iframeState.updating = true;

		// get current path before making changes
		const oldElement = iframeState.selected;
		const oldPath = getFullSelector(oldElement);

		// update
		if (newId.trim()) {
			iframeState.selected.id = newId;
		} else {
			iframeState.selected.removeAttribute('id');
		}

		// get new path after ID update
		const newPath = getFullSelector(iframeState.selected);

		// update all rules that reference this elements path
		const rules = iframeState.stylesheet.cssRules;
		Array.from(rules).forEach((rule, index) => {
			if (rule.selectorText.includes(oldPath)) {
				const newSelector = rule.selectorText.replace(oldPath, newPath);
				const styleText = rule.style.cssText;
				iframeState.stylesheet.deleteRule(index);
				iframeState.stylesheet.insertRule(`${newSelector} { ${styleText} }`, index);
			}
		});

		currentId = newId;

		iframeState.updating = false;
	}

	function updateClasses(newClasses) {
		if (!iframeState.selected) return;

		iframeState.updating = true;

		// get current path before making changes
		const oldElement = iframeState.selected;
		const oldPath = getFullSelector(oldElement);

		// update elements classes
		const newClassArray = newClasses.trim();
		iframeState.selected.className = newClassArray;

		// get new selector before classes update
		const newPath = getFullSelector(iframeState.selected);

		// update any rules that used the old selector
		const rules = Array.from(iframeState.stylesheet.cssRules);
		rules.forEach((rule, index) => {
			if (rule && rule.selectorText.includes(oldPath)) {
				const newSelector = rule.selectorText.replace(oldPath, newPath);
				const styleText = rule.style.cssText;
				iframeState.stylesheet.deleteRule(index);
				iframeState.stylesheet.insertRule(`${newSelector} { ${styleText} }`, index);
			}
		});

		currentClasses = newClasses;

		iframeState.updating = false;
	}
</script>

<div class="form-control">
	<label for="element-classes">
		Classname(s)
		<input
			type="text"
			name="element-classes"
			id="element-classes"
			bind:value={currentClasses}
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
			bind:value={currentId}
			oninput={(e) => updateId(e.target.value)}
		/>
	</label>
</div>
