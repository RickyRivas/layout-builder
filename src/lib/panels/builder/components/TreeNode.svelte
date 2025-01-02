<script>
	import { iframeState, selectElement } from '$lib/shared.svelte';
	import TreeNode from './TreeNode.svelte';
	let { node, onclick } = $props();
</script>

<li>
	<div class="tree-node" class:active={node.element === iframeState.selected}>
		<button onclick={() => selectElement(node.element)}>
			<span>
				{`${node.tag}${node.id ? `#${node.id}` : ''}${node.classes ? `.${node.classes}` : ''}`}
			</span>
		</button>
	</div>
	{#if node.children.length > 0}
		<ul>
			{#each node.children as nodeChild}
				<TreeNode node={nodeChild} {onclick} />
			{/each}
		</ul>
	{/if}
</li>

<style lang="less">
	ul {
		margin-left: 1em;
		li {
			.tree-node {
				&.active {
					button {
						background-color: #000;
						color: #fff;
					}
				}
			}
		}
	}
</style>
