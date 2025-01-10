<script>
	import { elements } from '$lib/element-config';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import { iframeState, selectElement } from '$lib/shared.svelte';

	function handleDragStart(e, elementConfig) {
		const blank = document.createElement('div');
		e.dataTransfer.setDragImage(blank, 0, 0);
		e.dataTransfer.setData('application/json', JSON.stringify(elementConfig));
	}

	function addElementToFrame(elementConfig) {
		// create new element
		const newElement = document.createElement(elementConfig.type);

		// Add default class
		if (elementConfig.defaultClass) {
			newElement.classList.add(elementConfig.defaultClass);
		}

		// Add text content if specified
		if (elementConfig.textContent) newElement.textContent = elementConfig.textContent;

		// if no elements add to section
		const section = iframeState.document.querySelector('body > section');

		// If no element is selected or section is empty, add to section
		if (!iframeState.selected || section.children.length === 0) {
			section.appendChild(newElement);
		} else {
			// Check if selected element can accept this type as a child
			const selectedConfig = elements.find(
				(config) => config.type === iframeState.selected.tagName.toLowerCase()
			);
			const canAcceptChild = selectedConfig?.allowedChildren?.includes(elementConfig.type);

			if (canAcceptChild) {
				// Add as child of selected element
				iframeState.selected.appendChild(newElement);
			} else {
				// Add as sibling after selected element
				iframeState.selected.parentElement.insertBefore(
					newElement,
					iframeState.selected.nextSibling
				);
			}
		}

		selectElement(newElement);
	}
</script>

<PanelGroup title="Element Library" keepOpen={true}>
	{#snippet panelContent()}
		<div id="elements-library">
			<div class="elements-library-container">
				{#each elements as element}
					<button
						class="draggable-element-button"
						draggable="true"
						ondragstart={(e) => handleDragStart(e, element)}
						onclick={() => addElementToFrame(element)}
					>
						{element.type}
					</button>
				{/each}
			</div>
		</div>
	{/snippet}
</PanelGroup>
<PanelGroup title="Element Library" keepOpen={true}>
	{#snippet panelContent()}
		<div id="elements-library">
			<div class="elements-library-container">
				{#each elements as element}
					<button
						class="draggable-element-button"
						draggable="true"
						ondragstart={(e) => handleDragStart(e, element)}
						onclick={() => addElementToFrame(element)}
					>
						{element.type}
					</button>
				{/each}
			</div>
		</div>
	{/snippet}
</PanelGroup>
