<script lang="ts">
	import { elements } from '$lib/element-config';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import { iframeState, selectElement } from '$lib/shared.svelte';

	type ElementConfig = {
		type: string;
		defaultClass: string;
		textContent?: string;
		allowedChildren?: string[];
		iconPath?: string;
	};

	// Position constants
	const ABOVE = 'beforebegin';
	const BELOW = 'afterend';

	let position;

	function initIframeDragDrop() {
		if (!iframeState.selected) return;
		// add drag events to iframe doc
		iframeState.document.body.addEventListener('dragover', handleDragOver);
		iframeState.document.body.addEventListener('drop', handleDrop);
	}

	function handleDragStart(e, elementConfig) {
		// Hide default ghost image
		const blank = document.createElement('div');
		e.dataTransfer.setDragImage(blank, 0, 0);

		// Store element data
		e.dataTransfer.setData('application/json', JSON.stringify(elementConfig));
	}

	function handleDragOver(e) {
		e.preventDefault();

		// target changes as we hover over different elements
		const target = e.target;
		const rect = target.getBoundingClientRect();
		const isTopHalf = e.clientY < rect.top + rect.height / 2;

		position = isTopHalf ? ABOVE : BELOW;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();

		const elementConfig = JSON.parse(e.dataTransfer.getData('application/json'));
		let target = e.target;
		const section = iframeState.document.querySelector('section');

		// Create new element
		const newElement = document.createElement(elementConfig.type);
		if (elementConfig.defaultClass) {
			newElement.classList.add(elementConfig.defaultClass);
		}
		if (elementConfig.textContent) {
			newElement.textContent = elementConfig.textContent;
		}

		// If dropping on empty section
		if (section.children.length === 0) {
			section.appendChild(newElement);
		}

		// If dropping on section itself
		else if (target === section) {
			const rect = section.getBoundingClientRect();
			const isTopHalf = e.clientY < rect.top + rect.height / 2;

			if (isTopHalf) {
				section.insertBefore(newElement, section.firstChild);
			} else {
				section.appendChild(newElement);
			}
		}

		// If dropping on an element inside section
		else {
			target.insertAdjacentElement(position, newElement);
		}

		selectElement(newElement);
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

		// if section is empty or section is selected, add element to section
		if (section.children.length === 0 || iframeState.selected === section) {
			section.appendChild(newElement);
		} else {
			iframeState.selected.parentElement.insertBefore(newElement, iframeState.selected.nextSibling);
		}

		selectElement(newElement);
	}

	// init drag/drop when iframe is ready
	$effect(() => {
		if (iframeState.initialized) {
			initIframeDragDrop();
		}
	});
</script>

<PanelGroup title="Element Library" keepOpen={true}>
	{#snippet panelContent()}
		<div id="elements-library">
			<h3>Add Elements!</h3>
			{#each elements as element}
				<button
					draggable="true"
					ondragstart={(e) => handleDragStart(e, element)}
					onclick={() => addElementToFrame(element)}
				>
					{element.type}
				</button>
			{/each}
		</div>
	{/snippet}
</PanelGroup>
