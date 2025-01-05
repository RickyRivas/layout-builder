<script>
	import { getSelector } from '$lib/helpers';
	import { iframeState, selectElement, updateGhostPosition } from '$lib/shared.svelte';
	import TreeNode from './TreeNode.svelte';

	let treeNodes = $state([]);

	function buildTreefromBody() {
		if (!iframeState.document.body) return [];

		function createNodeData(element) {
			return {
				element,
				tag: element.tagName.toLowerCase(),
				id: element.id,
				classes: element.className,
				children: Array.from(element.children).map((child) => createNodeData(child))
			};
		}

		return Array.from(iframeState.document.body.children).map((child) => createNodeData(child));
	}

	function removeElement(element) {
		// // if this element is selected, select parent
		if (element === iframeState.selected) {
			selectElement(element.parentElement);
		}

		// Get element's selector before removal
		const selector = getSelector(element);

		// Remove matching style rules
		const rules = Array.from(iframeState.stylesheet.cssRules);
		for (let i = rules.length - 1; i >= 0; i--) {
			const rule = rules[i];
			if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
				iframeState.stylesheet.deleteRule(i);
			}
		}

		// remove
		element.remove();

		// indicator
		updateGhostPosition();

		// rebuild
		treeNodes = buildTreefromBody();
	}

	$effect(() => {
		if (iframeState.document && iframeState.selected) {
			treeNodes = buildTreefromBody();
		}
	});

	// watch for identifier updates
	$effect(() => {
		if (iframeState.document && !iframeState.updating) {
			treeNodes = buildTreefromBody();
		}
	});
</script>

<h2>Hierarchy Tree</h2>

<!-- recursively render -->
{#if treeNodes.length > 0}
	<ul>
		{#each treeNodes as node}
			<TreeNode {node} {onclick} {removeElement} />
		{/each}
	</ul>
{/if}
