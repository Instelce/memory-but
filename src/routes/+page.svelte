<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { CardData } from '$lib/types/CardData';
	import { revealedCount } from '$lib/stores/revealed.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import MainMenu from '$lib/menus/Main.svelte';
	import { gameData } from '$lib/stores/gameData.svelte';
	import { fly, fade } from 'svelte/transition';
	import { competences } from './data';
	import { randomNumber } from '$lib/utils';
	import type { Competence, CompetenceFields } from '$lib/types/Competence';
	import Background from '$lib/components/Background.svelte';
	import { untrack } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { gameSettings } from '$lib/stores/gameSettings.svelte';
	import MenuBackButton from '$lib/components/MenuBackButton.svelte';
	import Settings from '$lib/menus/Settings.svelte';

	let count = $derived(revealedCount.count);
	let doReset = $derived(revealedCount.count === 2 || !gameData.gameStarted);

	$inspect(gameData.competenceFinded, gameData.cardRevealedCompetence);

	// When two cards are revealed
	$effect(() => {
		if (count === 2) {
			untrack(() => {
				// Check if a competence is find
				if (gameData.cardRevealedCompetence[0] === gameData.cardRevealedCompetence[1]) {
					gameData.competenceFinded.push(gameData.cardRevealedCompetence[0]);
				}

				// Wait 2 seconds and reset the cards
				setTimeout(() => {
					revealedCount.restore();
				}, gameSettings.flipCooldown);

				gameData.cardRevealedCompetence = [];
			});
		}
	});

	let cards: CardData[] = $state([]);

	$effect(() => {
		if (!gameData.gameStarted) {
			untrack(() => {
				// Reset game state
				gameData.competenceFinded = [];
				gameData.cardRevealedCompetence = [];

				// Load card data
				cards = [];

				// 1. For each competence
				for (let competence of competences) {
					// 2. Add a card which contains the name of the competence
					cards.push({ data: competence.name, competence, revealed: false, isTechno: false });

					// 3. Add a card which contains a random field of the competence
					let field: keyof CompetenceFields = Object.keys(competence.fields)[
						randomNumber(0, Object.keys(competence.fields).length - 1)
					] as keyof CompetenceFields;

					let isTechno = field === 'technologies';

					if (typeof competence.fields[field] === 'string') {
						cards.push({ data: competence.fields[field], competence, revealed: false, isTechno });
					} else {
						cards.push({
							data: competence.fields[field][randomNumber(0, competence.fields[field].length - 1)],
							competence,
							revealed: false,
							isTechno
						});
					}
				}

				// 4. Shuffle the cards
				cards = cards.sort(() => Math.random() - 0.5);
			});
		}
	});

	// Settings
	$effect(() => {
		if (gameSettings.fullscreen && document.fullscreenEnabled) {
			document.documentElement.requestFullscreen();
		} else if (document.fullscreenElement) {
			document.exitFullscreen();
		}

		if (gameSettings.speedrun) {
			gameSettings.flipCooldown = 500;
			gameSettings.flipDuration = 200;
		} else {
			gameSettings.flipCooldown = 1500;
			gameSettings.flipDuration = 400;
		}
	});
</script>

<MainMenu />
<Settings />

<!-- Cards -->
<div class="w-full h-full flex justify-center items-center overflow-hidden z-10">
	<div
		class="card-container w-[70%] h-[90%] grid grid-cols-4 gap-4 z-10"
		class:slide={!gameData.gameStarted}
	>
		{#key cards}
			{#each cards as card, i (i)}
				<div in:fly|global={{ x: 700, duration: 500 + 20 * i, easing: cubicOut }}>
					<Card
						data={card}
						revealed={false}
						reset={doReset}
						canFlip={count < 2 && gameData.gameStarted}
					/>
				</div>
			{/each}
		{/key}
	</div>
</div>

{#if gameData.gameStarted}
	<MenuBackButton onclick={() => (gameData.gameStarted = false)}>Menu</MenuBackButton>
{/if}

<!-- <Background /> -->

<style lang="scss">
	.card-container {
		transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.slide {
		transform: translateX(30%);
	}
</style>
