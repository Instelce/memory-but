<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { CardData } from '$lib/types/CardData';
	import { revealedCount } from '$lib/stores/revealed.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { gameData } from '$lib/stores/gameData.svelte';
	import { fly } from 'svelte/transition';

	let count = $derived(revealedCount.count);
	let doReset = $derived(revealedCount.count === 2);

	// Reset revealed count
	$effect(() => {
		if (count === 2) {
			setTimeout(() => {
				revealedCount.restore();
			}, 2000);
		}
	});

	// Load card data
	let cards: CardData[] = [];
	for (let index = 0; index < 12; index++) {
		cards.push({ competence: 'Compétence ' + index, revealed: false });
	}
</script>

<Menu />

<div class="w-full h-full flex justify-center items-center">
	<div class="w-[70%] h-[90%] grid grid-cols-4 gap-4">
		{#each cards as card}
			<Card data={card} revealed={false} reset={doReset} canFlip={count < 2 && gameData.gameStarted} />
		{/each}
	</div>
</div>

{#if (gameData.gameStarted)}
	<div class="menu-button" onclick={() => gameData.gameStarted = false} in:fly={{x: -100}}>
		<span>Menu</span>
	</div>
{/if}

<style lang="scss">
	.menu-button {
		height: 20%;
		width: 4rem;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		background: rgb(var(--color-gray));

		display: flex;
		align-items: center;
		justify-content: center;

		span {
			position: absolute;
			transform: rotate(-90deg);
			text-transform: uppercase;
			letter-spacing: 1px;
		}
	}
</style>