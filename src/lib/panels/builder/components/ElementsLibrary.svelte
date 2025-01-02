<script lang="ts">
	import { iframeState, selectElement } from '$lib/shared.svelte';
	type element = {
		icon: string;
		type: string;
		textContent: string;
	};

	const containerElements = [
		{
			type: 'section',
			icon: '/',
			isContainer: true,
			allowedChildren: ['h1', 'h2', 'h3', 'p', 'button', 'div']
		}
	];

	const childElements: element[] = [
		{
			icon: '',
			type: 'button',
			textContent: 'A new button'
		},
		{
			icon: '',
			type: 'h1',
			textContent: 'Heading 1'
		},
		{
			icon: '',
			type: 'h2',
			textContent: 'Heading 2'
		},
		{
			icon: '',
			type: 'h3',
			textContent: 'Heading 3'
		}
	];

	function addElementToFrame(element: element) {
		// create
		const newElement = document.createElement(element.type);
		if (element.textContent) newElement.textContent = element.textContent;

		// if no exisiting elements, must add a container element
		if (iframeState.document.body.children.length === 0) {
			if (!element.isContainer) {
				alert('Please add a section first.');
				return;
			}

			iframeState.document.body.appendChild(newElement);
		} else {
			// check parent child relationship of already selected element
			if (iframeState.selected) {
				const parentElement = element.isContainer
					? iframeState.selected.closest('header, section, footer')
					: iframeState.selected;

				if (!parentElement) {
					alert('please add a parent container.');
					return;
				}

				parentElement.appendChild(newElement);
			} else {
				alert('please select where to add an element');
				return;
			}
		}

		selectElement(newElement);
	}
</script>

<div id="elements-library">
	<h2>Add Elements</h2>
	<h3>Containers</h3>
	{#each containerElements as element}
		<button
			onclick={() => {
				addElementToFrame(element);
			}}
		>
			{element.type}
		</button>
	{/each}

	<h3>Child Elements</h3>
	{#each childElements as element}
		<button
			onclick={() => {
				addElementToFrame(element);
			}}
		>
			{element.type}
		</button>
	{/each}
</div>
