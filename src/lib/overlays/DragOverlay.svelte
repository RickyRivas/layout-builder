<script>
	import { iframeState } from '$lib/shared.svelte';
	let position;

	let indicator = $state({
		top: 0,
		left: 0,
		width: 0,
		borderTopWidth: 0,
		borderBottomWidth: 0,
		visible: false
	});

	// Position constants
	const ABOVE = 'beforebegin';
	const BELOW = 'afterend';

	$effect(() => {
		if (!iframeState.document) return;

		function handleDragOver(e) {
			e.preventDefault();

			// target changes as we hover over different elements
			const target = e.target;
			const rect = target.getBoundingClientRect();
			const isTopHalf = e.clientY < rect.top + rect.height / 2;

			// Update drop indicator position
			indicator.visible = true;

			if (isTopHalf) {
				indicator.borderTopWidth = '2px';
				indicator.borderBottomWidth = '0';
				position = ABOVE;
			} else {
				indicator.borderTopWidth = '0';
				indicator.borderBottomWidth = '2px';
				position = BELOW;
			}

			// Position indicator
			indicator.top = isTopHalf ? rect.top : rect.bottom;
			indicator.left = rect.left;
			indicator.width = rect.width;
		}

		function handleDragDrop(e) {
			indicator.visible = false;
		}

		iframeState.document.body.addEventListener('dragover', handleDragOver);
		iframeState.document.body.addEventListener('drop', handleDragDrop);

		return () => {
			iframeState.document.body.removeEventListener('dragover', handleDragOver);
			iframeState.document.body.removeEventListener('drop', handleDragDrop);
		};
	});
</script>

<div
	class="drop-indicator"
	style:top={indicator.top + 'px'}
	style:left={indicator.left + 'px'}
	style:width={indicator.width + 'px'}
	style:border-bottom-width={indicator.borderBottomWidth}
	style:border-top-width={indicator.borderTopWidth}
	style:opacity={indicator.visible ? 1 : 0}
></div>

<style>
	.drop-indicator {
		position: absolute;
		pointer-events: none;
		border: 0 solid red;
		background-color: skyblue;
		z-index: 3;
	}
</style>
