<script>
	import { iframeState, selectElement, updateGhostPosition } from '$lib/shared.svelte';
	import { elements } from '$lib/element-config';
	import { onDestroy, onMount } from 'svelte';

	// Position constants
	const INSIDE_AT_START = 'afterbegin';
	const INSIDE_AT_BOTTOM = 'beforeend';
	const ABOVE = 'beforebegin';
	const BELOW = 'afterend';

	let position;
	let draggedElement = $state(null);
	let dropTarget = $state(null);
	let indicator = $state(null);

	function initDragDrop() {
		if (!iframeState.document?.body) return;

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

	function handleIframeDragStart(e) {
		const target = e.target;
		const blank = document.createElement('div');
		e.dataTransfer.setDragImage(blank, 0, 0);

		draggedElement = target;
		e.dataTransfer.setData('text/html', target.outerHTML);
	}

	function handleDragOver(e) {
		e.preventDefault();

		const target = e.target;
		if (target.tagName === 'BODY') return;

		const rect = target.getBoundingClientRect();
		const cursorY = e.clientY;

		// Get dragged element type
		let draggedType = draggedElement?.tagName.toLowerCase();

		// Get target's element config to check allowedChildren
		const targetConfig = elements.find((config) => config.type === target.tagName.toLowerCase());
		const canAcceptChild = targetConfig?.allowedChildren?.includes(draggedType);

		// Calculate drop position
		if (target.tagName === 'SECTION') {
			position = target.children.length === 0 ? INSIDE_AT_START : INSIDE_AT_BOTTOM;
		} else if (
			canAcceptChild &&
			cursorY > rect.top + rect.height * 0.2 &&
			cursorY < rect.top + rect.height * 0.8
		) {
			position = INSIDE_AT_BOTTOM;
		} else {
			const threshold = rect.top + rect.height / 2;
			position = cursorY < threshold ? ABOVE : BELOW;
		}

		dropTarget = target;
		updateIndicator(target, canAcceptChild, cursorY, position);
	}

	function handleDrop(e) {
		e.preventDefault();
		if (!dropTarget) return;

		// Get existing element
		const existingElementHtml = e.dataTransfer.getData('text/html');
		if (!existingElementHtml || !draggedElement) return;

		const elementType = draggedElement.tagName.toLowerCase();
		const targetConfig = elements.find(
			(config) => config.type === dropTarget.tagName.toLowerCase()
		);
		const canAcceptChild = targetConfig?.allowedChildren?.includes(elementType);

		// Handle insertion
		if (position === INSIDE_AT_START || position === INSIDE_AT_BOTTOM) {
			if (canAcceptChild || dropTarget.tagName === 'SECTION') {
				if (position === INSIDE_AT_START) {
					dropTarget.insertBefore(draggedElement, dropTarget.firstChild);
				} else {
					dropTarget.appendChild(draggedElement);
				}
			} else {
				dropTarget.insertAdjacentElement(BELOW, draggedElement);
			}
		} else {
			dropTarget.insertAdjacentElement(position, draggedElement);
		}

		selectElement(draggedElement);
		updateGhostPosition();

		// Cleanup
		draggedElement = null;
		dropTarget = null;
		if (indicator) {
			indicator.style.opacity = '0';
		}
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

	$effect(() => {
		if (iframeState.initialized) {
			return initDragDrop();
		}
	});

	onMount(() => {
		indicator = document.querySelector('.iframe-container .drop-indicator');
	});

	onDestroy(() => {
		if (iframeState.initialized && iframeState.document?.body) {
			initDragDrop()?.(); // Run cleanup if it exists
		}
	});
</script>
