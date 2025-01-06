<script lang="ts">
	import { containers, elements } from '$lib/element-config';
	import { iframeState, selectElement } from '$lib/shared.svelte';

	type ElementConfig = {
		type: string;
		defaultClass: string;
		textContent?: string;
		allowedChildren?: string[];
		iconPath?: string;
	};

	function addElementToFrame(elementConfig: ElementConfig) {
		// create new element
		const newElement = document.createElement(elementConfig.type);

		// Add default class
		if (elementConfig.defaultClass) {
			newElement.classList.add(elementConfig.defaultClass);
		}

		// Add text content if specified
		if (elementConfig.textContent) newElement.textContent = elementConfig.textContent;

		// handle element placement
		if (!iframeState.selected) {
			// if nothing is selected and body is empty, add containers to the body
			if (iframeState.document.body.children.length === 0) {
				// if no elements exisit, only allow containers to be added
				if (containers.includes(elementConfig)) {
					selectElement(iframeState.document.body);
					iframeState.document.body.appendChild(newElement);
				} else {
					alert('Please add a container element first (like section or header)');
					return;
				}
			} else {
				alert('Please select where to add the element');
				return;
			}
		} else {
			// check if element can contain this element
			const selectedConfig = [...containers, ...elements].find(
				(config) => config.type === iframeState.selected.tagName.toLowerCase()
			);

			if (selectedConfig?.allowedChildren?.includes(elementConfig.type)) {
				// add as child if selected container allows it
				iframeState.selected.appendChild(newElement);
			} else {
				// Find closest container within body
				const container = iframeState.selected.closest('section, header, footer, div, nav');
				if (container && container !== iframeState.document.body) {
					// Add after selected element but inside the container
					container.insertBefore(newElement, iframeState.selected.nextSibling);
				} else {
					// If no container found, add to body
					iframeState.document.body.appendChild(newElement);
				}
			}
		}

		selectElement(newElement);
	}
</script>

<div id="elements-library">
	<h2>Add Elements</h2>
	<h3>Containers</h3>
	{#each containers as container}
		<button
			onclick={() => {
				addElementToFrame(container);
			}}
		>
			{container.type}
		</button>
	{/each}
	<h3>Elements</h3>
	{#each elements as element}
		<button
			onclick={() => {
				addElementToFrame(element);
			}}
		>
			{element.type}
		</button>
	{/each}
</div>
