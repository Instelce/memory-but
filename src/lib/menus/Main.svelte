<script lang="ts">
	import { gameData } from '$lib/stores/gameData.svelte';
	import { sequence } from '@sveltejs/kit/hooks';
	import { fade, fly } from 'svelte/transition';
	import Settings from './Settings.svelte';
</script>

{#if !gameData.gameStarted && gameData.screen === "menu"}
	<div class="menu-container" in:fly={{ x: -100 }} out:fly={{ x: -200 }}>
		<div class="menu-buttons">
			<button class="button gray" onclick={() => gameData.screen = "settings"}><span>Settings</span></button>
			<button class="button" onclick={() => gameData.gameStarted = true}
				><span>Start a game</span></button
			>
			<button class="button gray" onclick={() => gameData.screen = "about"}><span>About</span></button>
		</div>
	</div>
{/if}

<style lang="scss">
	.menu-container {
		width: 100%;
		height: 100%;
		z-index: 50;
		position: absolute;
		background: linear-gradient(
			80deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 0.4) 60%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.menu-buttons {
		width: 40%;
		height: 100%;
		margin-left: 10rem;
	}

	.button {
		width: 10rem;
		height: 10rem;
		position: absolute;
		top: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-origin: center bottom;
		transform: translateY(calc(-100% - 3rem));
		font-family: 'Condate', sans-serif;
		font-weight: 500;

		transition: scale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&:hover {
			scale: 1.05;

			&::before {
				box-shadow:
					0 0 0 2px #000,
					0 0 0 4px rgb(var(--color-blue));
			}
		}

		&:active {
			scale: 1;
		}

		&::before {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: var(--radius);
			background: rgb(var(--color-blue));
			transform: rotate(45deg);
		}

		&:nth-child(2) {
			transform: translateX(8rem) translateY(-50%);
			transform-origin: center left;
		}

		&:nth-child(3) {
			transform: translateY(calc(-100% + 13rem));
			transform-origin: center top;
		}

		span {
			position: relative;
			z-index: 2;
		}

		&.gray {
			&::before {
				background: rgb(var(--color-gray));
			}
		}
	}

	.button-container {
	}
</style>
