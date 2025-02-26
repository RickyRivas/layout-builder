<script lang="ts">
	import { elements } from '$lib/element-config';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import { iframeState, selectElement, updateGhostPosition } from '$lib/shared.svelte';
	import { onDestroy, onMount } from 'svelte';

	// Position constants
	const INSIDE_AT_START = 'afterbegin';
	const INSIDE_AT_BOTTOM = 'beforeend';
	const ABOVE = 'beforebegin';
	const BELOW = 'afterend';

	let position;
	let draggedType = $state(null);
	let draggedElement = $state(null);
	let dropTarget = $state(null);
	let indicator = $state(null);

	function initIframeDragDrop() {
		if (!iframeState.selected) return;

		const body = iframeState.document.body;

		// make elements draggable on hover
		body.addEventListener('mouseover', handleMouseOver);
		body.addEventListener('mouseout', handleMouseOut);

		// Drag and drop within iframe
		body.addEventListener('dragstart', handleIframeDragStart);
		body.addEventListener('dragover', handleDragOver);
		body.addEventListener('drop', handleDrop);

		return () => {
			body.removeEventListener('mouseover', handleMouseOver);
			body.removeEventListener('mouseout', handleMouseOut);
			body.removeEventListener('dragstart', handleIframeDragStart);
			body.removeEventListener('dragover', handleDragOver);
			body.removeEventListener('drop', handleDrop);
		};
	}

	function handleMouseOver(e) {
		const target = e.target;

		if (target.tagName !== 'BODY' && target.tagName !== 'SECTION' && !target.contenteditable) {
			target.draggable = true;
		}
	}

	function handleMouseOut(e) {
		const target = e.target;
		target.removeAttribute('draggable');
	}

	// handle dragging elements within iframe
	function handleIframeDragStart(e) {
		const target = e.target;
		const blank = document.createElement('div');
		e.dataTransfer.setDragImage(blank, 0, 0);

		draggedElement = target;
		e.dataTransfer.setData('text/html', target.outerHTML);
	}

	// handle dragging new elements from panel
	function handleDragStart(e, elementConfig) {
		const blank = document.createElement('div');
		e.dataTransfer.setDragImage(blank, 0, 0);
		e.dataTransfer.setData('application/json', JSON.stringify(elementConfig));
		draggedType = elementConfig.type;
	}

	function handleDragOver(e) {
		e.preventDefault();

		// target changes as we hover over different elements
		const target = e.target;
		if (target.tagName === 'BODY') return;

		const rect = target.getBoundingClientRect();
		const cursorY = e.clientY;

		// Get target's element config to check allowedChildren
		const targetConfig = elements.find((config) => config.type === target.tagName.toLowerCase());

		// Check if we can drop inside this element
		const canAcceptChild = targetConfig?.allowedChildren?.includes(draggedType);

		// calcs for drop pos
		const topLimit = rect.top + rect.height * 0.2;
		const bottomLimit = rect.top + rect.height * 0.8;

		// Calculate drop position
		if (target.tagName === 'SECTION') {
			position = target.children.length === 0 ? INSIDE_AT_START : INSIDE_AT_BOTTOM;
		} else if (canAcceptChild && cursorY > topLimit && cursorY < bottomLimit) {
			// If element accepts children and cursor is in middle area
			position = INSIDE_AT_BOTTOM;
		} else {
			const threshold = rect.top + rect.height / 2;
			position = cursorY < threshold ? ABOVE : BELOW;
		}

		dropTarget = target;
		updateIndicator(target, canAcceptChild, cursorY, position);
	}

	function handleDrop(e: DragEvent) {
		iframeState.updating = true;

		e.preventDefault();
		const section = iframeState.document.querySelector('body > section');
		// If dropping outside valid targets or onto section/body, use section as target
		if (!dropTarget || dropTarget.tagName === 'BODY' || dropTarget === section) {
			dropTarget = section;
			position = INSIDE_AT_BOTTOM;
		}

		// Check if we're dropping a new element or moving an existing one
		const elementConfigJson = e.dataTransfer.getData('application/json');
		const existingElementHtml = e.dataTransfer.getData('text/html');

		let newElement;
		let elementType;

		if (elementConfigJson) {
			const elementConfig = JSON.parse(elementConfigJson);
			elementType = elementConfig.type;
			newElement = createElementFromConfig(elementConfig);
		} else if (existingElementHtml && draggedElement) {
			newElement = draggedElement;
			elementType = draggedElement.tagName.toLowerCase();
		} else {
			return;
		}

		// Check if target accepts this type of child
		const targetConfig = elements.find(
			(config) => config.type === dropTarget.tagName.toLowerCase()
		);

		const canAcceptChild = targetConfig?.allowedChildren?.includes(elementType);

		// Handle the insertion
		if (dropTarget === section) {
			section.appendChild(newElement);
		} else {
			// Your existing position handling for other elements
			if (position === INSIDE_AT_START || position === INSIDE_AT_BOTTOM) {
				if (canAcceptChild) {
					if (position === INSIDE_AT_START) {
						dropTarget.insertBefore(newElement, dropTarget.firstChild);
					} else {
						dropTarget.appendChild(newElement);
					}
				} else {
					// If can't insert inside, append to section
					section.appendChild(newElement);
				}
			} else {
				dropTarget.insertAdjacentElement(position, newElement);
			}
		}

		// Cleanup
		if (draggedElement && existingElementHtml) {
			if (draggedElement !== newElement) {
				draggedElement.remove();
			}
		}

		selectElement(newElement);
		updateGhostPosition();
		draggedElement = null;
		dropTarget = null;

		if (indicator) {
			indicator.style.opacity = '0';
		}

		draggedType = null;

		iframeState.updating = false;
	}

	function addElementToFrame(elementConfig) {
		iframeState.updating = true;

		// create new element
		const newElement = createElementFromConfig(elementConfig);
		// if no elements add to section
		const section = iframeState.document.querySelector('body > section');

		// If no element is selected or section is empty, add to section
		if (
			!iframeState.selected ||
			section.children.length === 0 ||
			iframeState.selected === section
		) {
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
				section.appendChild(newElement);
			}
		}

		selectElement(newElement);

		iframeState.updating = false;
	}

	function updateIndicator(target, canAcceptChild, cursorY, position) {
		if (!indicator) return;

		const rect = target.getBoundingClientRect();

		// Show indicator
		indicator.style.opacity = '1';

		// Reset borders
		indicator.style.borderTopWidth = '0';
		indicator.style.borderBottomWidth = '0';
		indicator.style.borderLeftWidth = '0';
		indicator.style.borderRightWidth = '0';

		// Handle different drop scenarios
		if (target.tagName === 'SECTION') {
			// Box indicator for section
			indicator.style.borderTopWidth = '2px';
			indicator.style.borderBottomWidth = '2px';
			indicator.style.borderLeftWidth = '2px';
			indicator.style.borderRightWidth = '2px';
			indicator.style.top = rect.top + 'px';
			indicator.style.left = rect.left + 'px';
			indicator.style.width = rect.width + 'px';
			indicator.style.height = rect.height + 'px';
		} else if (
			canAcceptChild &&
			cursorY > rect.top + rect.height * 0.2 &&
			cursorY < rect.top + rect.height * 0.8
		) {
			// Box indicator for container elements
			indicator.style.borderTopWidth = '2px';
			indicator.style.borderBottomWidth = '2px';
			indicator.style.borderLeftWidth = '2px';
			indicator.style.borderRightWidth = '2px';
			indicator.style.top = rect.top + 'px';
			indicator.style.left = rect.left + 'px';
			indicator.style.width = rect.width + 'px';
			indicator.style.height = rect.height + 'px';
		} else {
			// Line indicator for above/below
			indicator.style.borderTopWidth = '2px';
			indicator.style.top = position === ABOVE ? rect.top + 'px' : rect.bottom + 'px';
			indicator.style.left = rect.left + 'px';
			indicator.style.width = rect.width + 'px';
			indicator.style.height = '0';
		}
	}

	function createElementFromConfig(elementConfig) {
		const element = document.createElement(elementConfig.type);

		// Get all existing elements of this type in the iframe
		const existingElements = iframeState.document.getElementsByTagName(elementConfig.type);
		const tagIndex = existingElements.length + 1;

		// Add the indexed class based on tag name
		const indexedClass = `${elementConfig.type}-${tagIndex}`;
		element.classList.add(indexedClass);

		if (elementConfig.defaultClass) {
			element.classList.add(elementConfig.defaultClass);
		}

		if (elementConfig.textContent) {
			element.textContent = elementConfig.textContent;
		}

		if (elementConfig.defaultProps) {
			Object.entries(elementConfig.defaultProps).forEach(([key, value]) => {
				element.setAttribute(key, value);
			});
		}

		// Add default children if specified
		if (elementConfig.defaultChildren) {
			elementConfig.defaultChildren.forEach((childConfig) => {
				const childElement = createElementFromConfig(childConfig);
				element.appendChild(childElement);
			});
		}

		return element;
	}

	// init drag/drop when iframe is ready
	$effect(() => {
		if (iframeState.initialized) {
			return initIframeDragDrop();
		}
	});

	onDestroy(() => {
		if (iframeState.initialized && iframeState.document.body) {
			iframeState.document.body.removeEventListener('mouseover', handleMouseOver);
			iframeState.document.body.removeEventListener('mouseout', handleMouseOut);
			iframeState.document.body.removeEventListener('dragstart', handleIframeDragStart);
			iframeState.document.body.removeEventListener('dragover', handleDragOver);
			iframeState.document.body.removeEventListener('drop', handleDrop);
		}
	});

	onMount(() => {
		indicator = document.querySelector('.iframe-container .drop-indicator');
	});
</script>

<PanelGroup title="Element Library" keepOpen={true}>
	{#snippet panelContent()}
		<p class="info">Please click or drag an element.</p>
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
