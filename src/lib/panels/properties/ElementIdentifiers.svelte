<script>
	import { getSelectorForStyle } from '$lib/helpers';
	import { iframeState, updateGhostPosition } from '$lib/shared.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';

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
		const oldSelector = getSelectorForStyle();

		// update
		if (newId.trim()) {
			iframeState.selected.id = newId;
		} else {
			iframeState.selected.removeAttribute('id');
		}

		// get new path after ID update
		const newSelector = getSelectorForStyle();

		// update all rules that reference this elements path
		const rules = iframeState.stylesheet.cssRules;
		Array.from(rules).forEach((rule, index) => {
			// Split selectors if there are multiple (comma-separated)
			const selectors = rule.selectorText.split(',').map((s) => s.trim());

			// Check if any selector exactly matches our old selector
			if (selectors.includes(oldSelector)) {
				// Replace only the exact matching selector
				const updatedSelectors = selectors.map((s) => (s === oldSelector ? newSelector : s));

				const styleText = rule.style.cssText;
				iframeState.stylesheet.deleteRule(index);
				iframeState.stylesheet.insertRule(`${updatedSelectors.join(', ')} { ${styleText} }`, index);
			}
		});

		currentId = newId;
		iframeState.updating = false;
		updateGhostPosition();
	}

	function updateClasses(newClasses) {
		if (!newClasses.trim() || /^\d/.test(newClasses)) {
			// Get all existing elements of this type in the iframe
			const tagname = iframeState.selected.tagName.toLowerCase();
			const existingElements = iframeState.document.getElementsByTagName(tagname);
			const tagIndex = existingElements.length + 1;

			// Add the indexed class based on tag name
			const indexedClass = `${tagname}-${tagIndex}`;
			newClasses = indexedClass;
			currentClasses = indexedClass;
		}

		if (!iframeState.selected) return;

		iframeState.updating = true;

		// get old selector before making changes
		const oldSelector = getSelectorForStyle();

		// update  classes
		iframeState.selected.className = newClasses;

		// get new selector
		const newSelector = getSelectorForStyle();

		// update any rules that used the old selector
		const rules = Array.from(iframeState.stylesheet.cssRules);
		rules.forEach((rule, index) => {
			// Split selectors if there are multiple
			const selectors = rule.selectorText.split(',').map((s) => s.trim());

			// Check for exact selector match
			if (selectors.includes(oldSelector)) {
				// Replace only the exact matching selector
				const updatedSelectors = selectors.map((s) => (s === oldSelector ? newSelector : s));

				const styleText = rule.style.cssText;
				iframeState.stylesheet.deleteRule(index);
				iframeState.stylesheet.insertRule(`${updatedSelectors.join(', ')} { ${styleText} }`, index);
			}
		});

		currentClasses = newClasses;

		iframeState.updating = false;
		updateGhostPosition();
	}
</script>

<PanelGroup title="Selector" keepOpen={true}>
	{#snippet panelContent()}
		<div class="form-control">
			<label for="element-classes">
				Classname(s)
				<input
					type="text"
					name="element-classes"
					id="element-classes"
					bind:value={currentClasses}
					onkeydown={(e) => {
						if (e.key === 'Enter') {
							updateClasses(e.target.value);
						}
					}}
					onblur={(e) => updateClasses(e.target.value)}
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
					onkeydown={(e) => {
						if (e.key === 'Enter') {
							updateId(e.target.value);
						}
					}}
					onblur={(e) => updateId(e.target.value)}
				/>
			</label>
		</div>
	{/snippet}
</PanelGroup>
