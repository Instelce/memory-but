<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { CardData } from '$lib/types/CardData';
	import { revealedCount } from '$lib/stores/revealed.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import MainMenu from '$lib/menus/Main.svelte';
	import { gameData } from '$lib/stores/gameData.svelte';
	import { fly, fade } from 'svelte/transition';
	import { competences } from './data_old';
	import { randomNumber } from '$lib/utils';
	import type { Competence, CompetenceFields } from '$lib/types/Competence';
	import Background from '$lib/components/Background.svelte';
	import { untrack } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { gameSettings } from '$lib/stores/gameSettings.svelte';
	import MenuBackButton from '$lib/components/MenuBackButton.svelte';
	import Settings from '$lib/menus/Settings.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import CountDown from '$lib/components/CountDown.svelte';
	import { sounds } from '$lib/audio';
	import About from '$lib/menus/About.svelte';
	import End from '$lib/menus/End.svelte';
	import { getCompetence, getCompetenceColor } from './data';
	import H1 from '$lib/components/ui/heading/h1.svelte';

	let showRules = true; // Initialement, les règles sont affichées
	let count = $derived(revealedCount.count);
	let doReset = $derived(revealedCount.count === 2 || !gameData.gameStarted);
	let firstPlay = $state(true);
	let moreCompetenceInfo: Competence | null = $state(null);
	let pauseTimer = $state(false);

	$inspect(gameData.competenceFinded, gameData.cardRevealedCompetence);

	// When two cards are revealed
	$effect(() => {
		if (count === 2) {
			untrack(() => {
				// Check if a competence is find
				if (gameData.cardRevealedCompetence[0] === gameData.cardRevealedCompetence[1]) {
					gameData.competenceFinded.push(getCompetence(gameData.cardRevealedCompetence[0]));
					sounds.success.play();
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
				moreCompetenceInfo = null;

				// Load card data
				setTimeout(
					() => {
						cards = [];
					},
					firstPlay ? 0 : 800
				);

				setTimeout(
					() => {
						// 1. For each competence
						for (let competence of competences) {
							// 2. Add a card which contains the name of the competence
							cards.push({ isCompetenceName: true, content: competence.name, competence, revealed: false });

							// 3. Add a card which contains a random field of the competence
							let field: keyof CompetenceFields = Object.keys(competence.fields)[
								randomNumber(0, Object.keys(competence.fields).length - 1)
							] as keyof CompetenceFields;

							if (typeof competence.fields[field] === 'string') {
								cards.push({
									content: competence.fields[field],
									competence,
									revealed: false,
									isCompetenceName: false
								});
							} else {
								cards.push({
									content:
										competence.fields[field][randomNumber(0, competence.fields[field].length - 1)],
									competence,
									revealed: false,
									isCompetenceName: false
								});
							}
						}

						// 4. Shuffle the cards
						cards = cards.sort(() => Math.random() - 0.5);
					},
					firstPlay ? 0 : 1800
				);

				setTimeout(() => {
					firstPlay = false;
				}, 2000);
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
			gameSettings.flipDuration = 800;
		}
	});
</script>

<MainMenu />
<Settings />
<About />
<End />

{#if gameData.gameStarted}
	<div class="more-informations-buttons">
		{#each gameData.competenceFinded as competence (competence.number)}
			<div in:fly|global={{ x: 200 }}>
				<Button
					size="default"
					style="background: {getCompetenceColor(competence)};"
					onclick={() => {
						moreCompetenceInfo = competence;
						pauseTimer = true;
					}}>{competence.number}</Button
				>
			</div>
		{/each}

		{#if gameData.competenceFinded.length > 0}
			<p in:fade={{delay: 200}}>Plus d'info</p>
		{/if}
	</div>
{/if}

{#if gameData.gameStarted && gameSettings.speedrun}
	<CountDown></CountDown>
	<Timer start={true} bind:pause={pauseTimer} show={moreCompetenceInfo == null}></Timer>
{/if}

<div class="w-full h-full flex justify-center items-center overflow-hidden z-10">
	<!-- More info -->
	{#if moreCompetenceInfo}
		<div class="hide-cards">
			<Button
				onclick={() => {
					moreCompetenceInfo = null;
					pauseTimer = false;
				}}
			>
				Revenir au jeu
			</Button>
		</div>
		<div class="more-informations text-lg" in:fly={{ x: '80%' }}>
			<H1>{moreCompetenceInfo.name}</H1>

			<div class="mb-6">
				<h2 class="uppercase font-semibold mb-1 text-xs opacity-100 text-primary">Detail</h2>
				<p>{moreCompetenceInfo.detail}</p>
			</div>

			<div class="mb-6">
				<h2 class="uppercase font-semibold mb-1 text-xs opacity-100 text-primary">Objectif</h2>
				<p>{moreCompetenceInfo.fields.goal}</p>
			</div>

			<div class="mb-6">
				<h2 class="uppercase font-semibold mb-1 text-xs opacity-100 text-primary">Technologies</h2>
				<ul class="list-disc">
					{#each moreCompetenceInfo.technologies as tech}
						<li>
							{tech}
							<!-- <img src="https://skillicons.dev/icons?i={tech}" alt="{tech}"> -->
						</li>
					{/each}
				</ul>
			</div>

			<div class="mb-6">
				<h2 class="uppercase font-semibold mb-1 text-xs opacity-100 text-primary">Attentes</h2>
				<ul class="list-disc">
					{#each moreCompetenceInfo.fields.expectations as expectation}
						<li>{expectation}</li>
					{/each}
				</ul>
			</div>

			<div class="mb-6">
				<h2 class="uppercase font-semibold mb-1 text-xs opacity-100 text-primary">Projets</h2>
				<ul class="list-disc">
					{#each moreCompetenceInfo.fields.projects as project}
						<li>{project}</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}

	<!-- Cards -->
	<div
		class="card-container w-[70%] h-[90%] grid grid-cols-4 gap-4 z-10"
		class:slide={!gameData.gameStarted}
		class:slide-more={moreCompetenceInfo != null}
	>
		{#key cards}
			{#each cards as card, i (i)}
				<div
					in:fly|global={{ y: 700, duration: 500 + 50 * i }}
					out:fly|global={{ y: -700, duration: 500 + 50 * i, delay: 10 * i }}
				>
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

{#if !moreCompetenceInfo}
	<div transition:fade>
		<Background />
	</div>
{/if}

<div class="mobile">
	<p>Le jeu n'est disponible que sur ordi.</p>
</div>

<style lang="scss">
	.card-container {
		transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.slide {
		transform: translateX(30%);
	}

	.slide-more {
		transform: translateX(-80%);
	}

	.more-informations {
		width: 60%;
		height: 90%;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		padding-right: 10%;
	}
	.hide-cards {
		position: absolute;
		top: 0;
		left: 0;
		width: 40%;
		height: 100%;
		z-index: 25;
		padding-right: 10%;

		display: flex;
		align-items: center;
		justify-content: flex-end;

		// Linear Gradient
		background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
	}

	.more-informations-buttons {
		position: absolute;
		right: 2rem;
		top: 50%;
		transform: translateY(-50%);
		max-width: 4rem;

		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 1rem;

		z-index: 22;

		p {
			white-space: nowrap;
			font-family: 'Condate', sans-serif;
			display: inline-block;
			// Rotate letters
			transform: rotate(-90deg);
			padding-top: 0.45rem;
			margin-top: 3rem;
			opacity: 0.8;
		}
		p::before {
			content: '';
			position: absolute;
			display: block;
			width: 1rem;
			height: 1.5px;
			right: 0;
			top: 50%;
			transform: translate(140%, -50%);
			background: #fff;
			margin-top: 0.1rem;
		}
	}

	.mobile {
		width: 100%;
		height: 100dvh;
		background: #000;
		z-index: 100000;
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (max-width: 768px) {
		.mobile {
			display: flex;
		}

		body {
			height: 100vh;
			overflow: hidden;
		}
	}
</style>
