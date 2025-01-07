<script>
	import { iframeState, selectElement } from '$lib/shared.svelte';
	import TreeNode from './TreeNode.svelte';
	let { node, onclick, removeElement } = $props();
</script>

<li>
	<div class="tree-node" class:active={node.element === iframeState.selected}>
		<button onclick={() => selectElement(node.element)}>
			<span>{node.element.tagName.toLowerCase()}</span>
			{#if node.element.id}
				<span class="tree-tag id-tag">{node.element.id}</span>
			{:else if node.element.classList.length}
				{#each node.element.classList as classname}
					<span class="tree-tag">
						{classname}
					</span>
				{/each}
			{/if}
		</button>
	</div>
	{#if node.children.length > 0}
		<ul>
			{#each node.children as nodeChild}
				<TreeNode node={nodeChild} {onclick} {removeElement} />
			{/each}
		</ul>
	{/if}
</li>
