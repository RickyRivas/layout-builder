<script>
	import { getSelector } from '$lib/helpers';
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

	// when we update a class or id, update stylesheet too :)
	function updateId(newId) {
		if (!iframeState.selected) return;

		// get old selector before updating id
		const oldSelector = getSelector(iframeState.selected);

		// update
		if (newId.trim()) {
			iframeState.selected.id = newId;
		} else {
			iframeState.selected.removeAttribute('id');
		}

		// get new selector after ID update
		const newSelector = getSelector(iframeState.selected);

		// update stylesheet rules
		const rules = iframeState.stylesheet.cssRules;
		Array.from(rules).forEach((rule, index) => {
			if (rule && rule.selectorText === oldSelector) {
				const styleText = rule.style.cssText;
				iframeState.stylesheet.deleteRule(index);
				iframeState.stylesheet.insertRule(`${newSelector} { ${styleText} }`, index);
			}
		});

		currentId = newId;
	}

	function updateClasses(newClasses) {
		if (!iframeState.selected) return;

		// get old selector before updating class
		const oldSelector = getSelector(iframeState.selected);

		// update elements classes
		const newClassArray = newClasses.trim();
		iframeState.selected.className = newClassArray;

		// get new selector before classes update
		const newSelector = getSelector(iframeState.selected);

		// update any rules that used the old selector
		const rules = Array.from(iframeState.stylesheet.cssRules);
		rules.forEach((rule, index) => {
			if (rule && rule.selectorText === oldSelector) {
				const styleText = rule.style.cssText;
				iframeState.stylesheet.deleteRule(index);
				iframeState.stylesheet.insertRule(`${newSelector} { ${styleText} }`, index);
			}
		});

		currentClasses = newClasses;
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
