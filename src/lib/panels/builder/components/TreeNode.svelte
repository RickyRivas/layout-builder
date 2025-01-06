<script>
	import { iframeState, selectElement } from '$lib/shared.svelte';
	import TreeNode from './TreeNode.svelte';
	let { node, onclick, removeElement } = $props();
</script>

<li>
	<div class="tree-node" class:active={node.element === iframeState.selected}>
		<button onclick={() => selectElement(node.element)}>
			<span>{node.element.tagName.toLowerCase()}</span>
		</button>
		{#if node.element.classList.length}
			{#each node.element.classList as classname}
				<span class="class-tag">
					{classname}
				</span>
			{/each}
		{/if}
		{#if node.element.id}
			<span class="id-tag">{node.element.id}</span>
		{/if}
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

	.class-tag {
		display: inline-block;
		font-size: 12px;
		line-height: 20px;
		text-transform: uppercase;
		padding: 0 2px;
		background-color: var(--primary);
		color: #fff;
		margin-right: 2px;
	}
	.id-tag {
		display: inline-block;
		font-size: 12px;
		line-height: 20px;
		text-transform: uppercase;
		padding: 0 2px;
		background-color: var(--secondary);
		color: #fff;
		margin-right: 2px;
	}
</style>
