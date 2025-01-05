<script>
	import { generateUnformattedCss } from '$lib/helpers';
	import ElementsLibrary from '$lib/panels/builder/components/ElementsLibrary.svelte';
	import HierarchyTree from './components/HierarchyTree.svelte';

	let css = $state();
	// $inspect(css);
</script>

<aside id="builder-panel">
	<ElementsLibrary />
	<HierarchyTree />
	<button
		onclick={() => {
			css = generateUnformattedCss();
		}}>Generate CSS</button
	>
</aside>
