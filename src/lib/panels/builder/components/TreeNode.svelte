<script>
	import { getSelector } from '$lib/helpers';
	import { iframeState, selectElement } from '$lib/shared.svelte';
	import TreeNode from './TreeNode.svelte';
	let { node, onclick, removeElement } = $props();
</script>

<li>
	<div class="tree-node" class:active={node.element === iframeState.selected}>
		<button onclick={() => selectElement(node.element)}>
			<span>{getSelector(node.element)}</span>
		</button>
		<button onclick={() => removeElement(node.element)}>X</button>
	</div>
	{#if node.children.length > 0}
		<ul>
			{#each node.children as nodeChild}
				<TreeNode node={nodeChild} {onclick} {removeElement} />
			{/each}
		</ul>
	{/if}
</li>

<style lang="less">
	ul {
		margin-left: 1em;
	}

	.tree-node.active > button {
		background-color: #000;
		color: #fff;
	}
</style>
