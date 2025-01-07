<script>
	import { generateUnformattedCss } from '$lib/helpers';
	import ElementsLibrary from '$lib/panels/builder/components/ElementsLibrary.svelte';
	import HierarchyTree from './components/HierarchyTree.svelte';

	let css = $state();
	// $inspect(css);
</script>

<div id="builder-panel" class="panel panel-left">
	<ElementsLibrary />
	<HierarchyTree />
	<button
		onclick={() => {
			css = generateUnformattedCss();
		}}>Generate CSS</button
	>
</div>
