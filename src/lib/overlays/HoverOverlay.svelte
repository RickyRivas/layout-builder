<script>
	import { getSelector } from '$lib/helpers';
	import { iframeState } from '$lib/shared.svelte';

	let hoveredElementSelector = $state();
	let overlay = $state({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		visible: false
	});

	function updatePosition(target) {
		const rect = target.getBoundingClientRect();
		overlay = {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height,
			visible: true
		};
	}

	$effect(() => {
		if (!iframeState.document) return;

		function handleMouseOver(e) {
			const target = e.target;
			if (target === iframeState.selected) return;
			hoveredElementSelector = getSelector(target);
			updatePosition(target);
		}
		function handleMouseOut() {
			hoveredElementSelector = null;
			overlay.visible = false;
		}

		iframeState.document.body.addEventListener('mouseover', handleMouseOver);
		iframeState.document.body.addEventListener('mouseout', handleMouseOut);

		return () => {
			iframeState.document.body.removeEventListener('mouseover', handleMouseOver);
			iframeState.document.body.removeEventListener('mouseout', handleMouseOut);
		};
	});
</script>

<div
	class="hover-overlay"
	style:top={overlay.top + 'px'}
	style:left={overlay.left + 'px'}
	style:width={overlay.width + 'px'}
	style:height={overlay.height + 'px'}
	style:opacity={overlay.visible ? 1 : 0}
>
	{#if hoveredElementSelector}
		<span class="tag">{hoveredElementSelector}</span>
	{/if}
</div>

<style>
	.hover-overlay {
		display: block;
		background-image: linear-gradient(
			135deg,
			#00cea8 10%,
			#0000 0,
			#0000 50%,
			#00cea8 0,
			#00cea8 60%,
			#0000 0,
			#0000
		);
		background-size: 7.07px 7.07px;
		background-position: center;
		background-color: #00cea80d;
		outline: dashed 2px #00cea8;
		outline-offset: -1px;
		position: absolute;
		pointer-events: none;
		z-index: 1;
	}

	.tag {
		display: block;
		position: absolute;
		bottom: calc(100% + 0px);
		left: 0;
		background-color: #00cea8;
		font-size: 12px;
		line-height: 14px;
		text-transform: uppercase;
		font-weight: bold;
		padding: 0 5px;
		white-space: nowrap;
		color: #000;
	}
</style>
