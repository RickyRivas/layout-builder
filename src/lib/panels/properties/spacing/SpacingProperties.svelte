<script lang="ts">
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import { spacingUnits, marginUnits } from '$lib/units';
	import SpacingWidget from './SpacingWidget.svelte';

	// configs/margin.ts
	export const marginConfig = {
		'margin-top': {
			units: marginUnits,
			value: '',
			defaultValue: '0',
			label: 'Top'
		},
		'margin-right': {
			units: marginUnits,
			value: '',
			defaultValue: '0',
			label: 'Right'
		},
		'margin-bottom': {
			units: marginUnits,
			value: '',
			defaultValue: '0',
			label: 'Bottom'
		},
		'margin-left': {
			units: marginUnits,
			value: '',
			defaultValue: '0',
			label: 'Left'
		}
	};

	// configs/padding.ts
	export const paddingConfig = {
		'padding-top': {
			units: spacingUnits,
			value: '',
			defaultValue: '0',
			label: 'Top'
		},
		'padding-right': {
			units: spacingUnits,
			value: '',
			defaultValue: '0',
			label: 'Right'
		},
		'padding-bottom': {
			units: spacingUnits,
			value: '',
			defaultValue: '0',
			label: 'Bottom'
		},
		'padding-left': {
			units: spacingUnits,
			value: '',
			defaultValue: '0',
			label: 'Left'
		}
	};

	const panels = [
		{
			id: 'margin',
			label: 'Margin',
			config: marginConfig
		},
		{
			id: 'padding',
			label: 'Padding',
			config: paddingConfig
		}
	];

	let activeIndex = $state(0);

	function handleClick(index) {
		activeIndex = index;
	}
</script>

<PanelGroup title="Spacing">
	{#snippet panelContent()}
		<div class="spacing-tabs">
			<div class="tab-buttons" role="tablist">
				{#each panels as panel, i}
					<button
						role="tab"
						aria-selected={i === activeIndex}
						aria-controls="panel-{panel.id}"
						id="tab-{panel.id}"
						onclick={() => handleClick(i)}
						class:active={i === activeIndex}
					>
						{panel.label}
					</button>
				{/each}
			</div>

			{#each panels as { id, config }, i}
				<div id="panel-{id}" role="tabpanel" aria-labelledby="tab-{id}" hidden={i !== activeIndex}>
					<SpacingWidget {config} />
				</div>
			{/each}
		</div>
	{/snippet}
</PanelGroup>
