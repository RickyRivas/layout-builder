<script>
	import { iframeState, selectElement } from '$lib/shared.svelte';
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
			<TreeNode {node} onclick={() => {}} />
		{/each}
	</ul>
{/if}
