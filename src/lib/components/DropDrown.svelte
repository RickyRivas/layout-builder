<script>
	import { fade, fly } from 'svelte/transition';
	let {
		options,
		value = 'Dropdown Toggle',
		onUpdate,
		label = 'Select an option',
		width = 'full'
	} = $props();
	function onclick() {
		isOpen = !isOpen;
	}
	function onkeydown(e) {
		if (e.key === 'Escape') {
			isOpen = false;
		}
	}
	let isOpen = $state(false);
	let dropdownId = crypto.randomUUID();
	let listboxId = `listbox-${dropdownId}`;
</script>

<div class="form-control width-{width}" style:z-index={isOpen ? 777 : 'auto'}>
	<label class="dropdown-label" for="dropdown-button-{dropdownId}">{label}</label>
	<div class="dropdown-component">
		<button
			{onclick}
			id="dropdown-button-{dropdownId}"
			type="button"
			class="dropdown-trigger"
			aria-haspopup="listbox"
			class:active={isOpen}
			aria-expanded={isOpen}
			aria-controls={listboxId}
		>
			<span>
				{value}
			</span>
			<svg
				class="icon"
				xmlns="http://www.w3.org/2000/svg"
				width="44"
				height="44"
				fill="none"
				viewBox="0 0 44 44"
				aria-hidden="true"
				role="img"
			>
				<path
					fill="currentColor"
					fill-rule="evenodd"
					d="M9.304 11.775a2.225 2.225 0 0 0 3.146 3.146L22 5.371l9.551 9.55a2.225 2.225 0 0 0 3.146-3.146L23.575.652a2.225 2.225 0 0 0-3.146 0L9.304 11.775Zm25.393 20.45a2.225 2.225 0 0 0-3.146-3.146l-9.55 9.55-9.55-9.55a2.225 2.225 0 1 0-3.147 3.146l11.124 11.123a2.225 2.225 0 0 0 3.146 0l11.123-11.123Z"
					clip-rule="evenodd"
				/>
			</svg></button
		>
		{#if isOpen}
			<div
				class="options"
				role="listbox"
				id={listboxId}
				{onkeydown}
				tabindex="-1"
				in:fly={{ y: 200 }}
				out:fade
			>
				{#each options as option, i (option)}
					<button
						class="option"
						class:selected={option.value === value}
						role="option"
						aria-selected={option.value === value}
						onclick={() => {
							onUpdate(option.value);
							onclick();
						}}
					>
						<span>
							{option.label}
						</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="less">
	.dropdown-component {
		display: block;
		position: relative;

		.dropdown-trigger {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: none;
			border: 0px;
			border-radius: 0px;
			background-color: #fff;
			text-align: center;
			font-size: 16px;
			line-height: 40px;
			width: 100%;
			border-radius: var(--border-radius);
			transition: background-color 0.33s ease;
			background-color: var(--form-field-bg);
			padding: 0 1em;

			&.active,
			&:focus,
			&:hover {
				background-color: var(--border-color);
			}

			.icon {
				display: inline-block;
				width: 20px;
				height: auto;
			}
		}
		.options {
			display: flex;
			flex-direction: column;
			gap: 2px;
			position: absolute;
			top: calc(100% + 2px);
			background-color: #fff;
			padding: 2px;
			width: 100%;
			border-radius: var(--border-radius);
			box-shadow: var(--box-shadow);

			.option {
				display: block;
				width: 100%;
				text-align: center;
				font-size: 16px;
				line-height: 40px;
				border: 0px;
				background-color: #fff;
				border-radius: calc(var(--border-radius) / 2);
				transition: background-color 0.33s ease;
				&:hover,
				&.selected {
					background-color: var(--border-color);
				}
			}
		}
	}
</style>
