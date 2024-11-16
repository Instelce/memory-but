<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	type Props = HTMLAttributes<HTMLButtonElement> & { children: Snippet };
	let { children, ...restProps }: Props = $props();
</script>

<button class="menu-button" in:fly={{ x: -100, delay: 100 }} out:fly={{ x: -100}} {...restProps}>
	<span>{@render children()}</span>
</button>

<style lang="scss">
    .menu-button {
		height: 224px;
		width: 4rem;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		z-index: 60;
		background: rgb(var(--color-gray));

		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.5;
		font-family: 'Condate';

		clip-path: path(
			'M0 0L52.5512 24.8553C59.5419 28.1617 64 35.2019 64 42.935V181.065C64 188.798 59.5419 195.838 52.5512 199.145L0 224V0Z'
		);

		transition: opacity 0.3s ease;

		&:hover {
			opacity: 1;

			span {
				letter-spacing: 2px;
			}
		}

		span {
			position: absolute;
			transform: rotate(-90deg);
			text-transform: uppercase;
			letter-spacing: 1px;
			transition: letter-spacing 0.3s ease;
		}
	}
</style>