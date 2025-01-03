<script lang="ts">
	import { iframeState, selectElement } from '$lib/shared.svelte';
	type element = {
		icon: string;
		type: string;
		textContent?: string | null;
		isContainer?: boolean | null;
		allowedChildren?: string[];
	};

	const elements: element[] = [
		{
			icon: '/',
			type: 'section',
			isContainer: true,
			allowedChildren: ['h1', 'h2', 'h3', 'p', 'button', 'div']
		},
		{
			icon: '',
			type: 'button',
			textContent: 'A new button',
			allowedChildren: ['span']
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
		},
		{
			icon: '',
			type: 'div',
			textContent: '',
			allowedChildren: ['h1', 'h2', 'h3', 'p', 'button', 'div']
		},
		{
			icon: '',
			type: 'p',
			textContent:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga quibusdam doloribus, consequatur explicabo asperiores ad corporis itaque exercitationem enim adipisci soluta dolor, eius maxime tenetur beatae laudantium id saepe suscipit.'
		}
	];

	function addElementToFrame(element: element) {
		// create new element
		const newElement = document.createElement(element.type);
		if (element.textContent) newElement.textContent = element.textContent;

		// if no exisiting elements, must add a container element
		// TODO: automatically add a container element.
		if (iframeState.document.body.children.length === 0) {
			if (!element.isContainer) {
				alert('Please add a section first.');
				return;
			}

			iframeState.document.body.appendChild(newElement);
		} else {
			// check if selected element allows this type of child
			const selectedTag = iframeState.selected.tagName.toLowerCase();
			const selectedTemplate = elements.find((e) => e.type === selectedTag);

			// can be added as child of selected element
			if (selectedTemplate?.allowedChildren?.includes(element.type)) {
				iframeState.selected.appendChild(newElement);
			} else {
				// find nearest valid container
				const validParents = elements
					.filter((e) => e.allowedChildren?.includes(element.type))
					.map((e) => e.type);

				const targetContainer = iframeState.selected.closest(validParents.join(','));

				if (!targetContainer) {
					alert(
						`${element.type} cannot be added here. Valid parents are ${validParents.join(', ')}`
					);
					return;
				}

				// added after selected element if in same container
				if (iframeState.selected !== targetContainer) {
					iframeState.selected.parentNode.insertBefore(
						newElement,
						iframeState.selected.nextSibling
					);
				} else {
					targetContainer.appendChild(newElement);
				}
			}
		}

		selectElement(newElement);
	}
</script>

<div id="elements-library">
	<h2>Add Elements</h2>
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
