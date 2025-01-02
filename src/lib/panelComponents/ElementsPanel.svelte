<script lang="ts">
	import { iframeState, selectElement } from '../../routes/shared.svelte';
	type element = {
		icon: string;
		type: string;
		textContent: string;
	};

	const elements: element[] = [
		{
			icon: '',
			type: 'button',
			textContent: 'A new button'
		},
		{
			icon: '',
			type: 'h2',
			textContent: 'Heading 2'
		}
	];

	function addElementToFrame(element: element) {
		// create
		const newElement = document.createElement(element.type);
		if (element.textContent) newElement.textContent = element.textContent;

		// add
		iframeState.document.body.insertBefore(newElement, iframeState.document.body.firstChild);

		// focus on new element
		selectElement(newElement);
	}
</script>

{#each elements as element}
	<button
		onclick={() => {
			addElementToFrame(element);
		}}
	>
		{element.type}
	</button>
{/each}
