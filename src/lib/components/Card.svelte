<script lang="ts">
	import type { CardData } from '$lib/types/CardData';
	import { randomNumber } from '$lib/utils';
	import { revealedCount } from '$lib/stores/revealed.svelte';
	import { getCompetenceColor } from '../../routes/data_old';
	import { gameData } from '$lib/stores/gameData.svelte';
	import { fade, fly } from 'svelte/transition';
	import { gameSettings } from '$lib/stores/gameSettings.svelte';
	import { sounds } from '$lib/audio';
	import { Confetti } from 'svelte-confetti';

	interface Props {
		data: CardData;
		revealed?: boolean;
		canFlip: boolean;
		reset: boolean;
	}

	let { data, revealed = $bindable(false), canFlip = true, reset = false }: Props = $props();

	let card: HTMLDivElement;
	let width = $state(0);
	let height = $state(0);
	let halfWidth = $derived(width / 2);
	let halfHeight = $derived(height / 2);
	let internalCanFlip = $state(true);
	let isFind = $derived(gameData.competenceFind(data.competence));

	// $inspect(isFind).with(() => {
	// 	if (isFind) {
	// 		console.log('isFind', isFind);
	// 	}
	// });

	let diamonds = Array.from(Array(10).keys());
	let rotation = $derived(revealed ? randomNumber(0.5, 1) : randomNumber(0.5, 1));

	// Rotate card on mount
	$effect(() => {
		if (card) {
			card.style.transform = `rotateX(0deg) rotateY(0deg) rotateZ(${rotation}deg) scale(1)`;
		}
	});

	// Reset card state on reset
	$effect(() => {
		if (reset) {
			setTimeout(() => {
				if (!gameData.competenceFind(data.competence)) {
					revealed = false;
					internalCanFlip = true;
				}
			}, gameSettings.flipCooldown);
		}
	});

	function flip(
		node: HTMLDivElement,
		{ delay = 0, duration = 400 }: { delay?: number; duration?: number }
	) {
		return {
			delay,
			duration,
			css: (t: number, u: number) => `
				transform: rotateY(${1 - u * 180}deg);
				opacity: ${1 - u};
			`
		};
	}

	function handleClick() {
		if (canFlip && internalCanFlip && !gameData.competenceFinded.includes(data.competence)) {
			revealed = !revealed;
			internalCanFlip = false;
			revealedCount.inc();
			sounds.cardFlip.play();

			gameData.cardRevealedCompetence.push(data.competence.number);
		}
	}

	function handleMouseMove(e: MouseEvent) {
		let offsetWidth = e.clientX - (card.offsetLeft + halfWidth);
		let offsetHeight = e.clientY - (card.offsetTop + halfHeight);

		let degX = -(offsetHeight * 0.2);
		let degY = offsetWidth * 0.08;

		card.style.transform = `rotateX(${degX}deg) rotateY(${degY}deg) scale(1.04)`;
	}

	function handleMouseLeave(e: MouseEvent) {
		card.style.transform = `rotateX(0deg) rotateY(0deg) rotateZ(${rotation}deg) scale(1)`;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="card-container"
	bind:this={card}
	onmouseleave={handleMouseLeave}
	onmousemove={handleMouseMove}
	onclick={handleClick}
	bind:clientWidth={width}
	bind:clientHeight={height}
	class:find={isFind}
>
	<div class="card" class:show={revealed}>
		{#if revealed}
			<!-- Card content -->
			<div class="card-front" transition:flip={{ duration: gameSettings.flipDuration }}>
				<div class="card-design" style:--color={getCompetenceColor(data.competence)}>
					<p>{data.content}</p>
				</div>
			</div>
		{:else}
			<div class="card-back" transition:flip={{ duration: gameSettings.flipDuration }}>
				<!-- {data.competence.number} -->
				<div class="card-design">
					<!-- <img class="logo" src="logo-info.png" alt="" /> -->
					{#each diamonds as i}
						<span class="diamond" style={`--i: ${i}`}></span>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	{#if revealed && isFind}
		<div class="confetti">
			<Confetti fallDistance="50px" x={[-1, 1]} y={[-1, 1]} delay={[0, 100]} duration={1000} />
		</div>
	{/if}
</div>

<style lang="scss">
	.card-container {
		width: 100%;
		height: 100%;
		position: relative;
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&.find {
			.card-front .card-design {
				border: 1px solid var(--color) !important;
			}
		}
	}

	.card {
		width: 100%;
		height: 100%;
		position: absolute;
		overflow: hidden;
		perspective: 600;
		user-select: none;

		transform-style: preserve-3d;

		border-radius: var(--radius);

		&:hover .diamond {
			width: calc(var(--i) * 52px);
			height: calc(var(--i) * 52px);
			// border: 2px solid rgb(var(--color-blue));
			border: calc(8px - var(--i) * 1px) solid rgb(var(--color-blue));
		}

		&:hover .logo {
			transform: scale(1.05);
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		&.find {
			animation: is-finded 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

			.card-front .card-design {
				border: 1px solid var(--color) !important;
			}
		}
	}

	.card-back,
	.card-front {
		width: 100%;
		height: 100%;
		padding: 0.5rem;
		position: absolute;
		overflow: hidden;

		backface-visibility: hidden;
		background: rgb(var(--color-gray));
	}

	.card-front {
		font-family: 'Condate', sans-serif;
		font-weight: 300;

		.card-design {
			width: 100%;
			height: 100%;
			padding: 1rem;

			border: 1px solid transparent;
			// border: 1px solid var(--color) !important;
			border-radius: var(--radius);

			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
		}
	}

	.card-back {
		.card-design {
			width: 100%;
			height: 100%;
			position: relative;
			overflow: hidden;

			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10px;
			border: 1px solid rgb(var(--color-blue));
			background: rgba(var(--color-blue), 0.1);
			// background: linear-gradient(
			// 	0deg,
			// 	rgba(var(--color-blue), 0.2) 0%,
			// 	rgba(var(--color-blue), 0) 100%
			// );

			&:hover {
				border: 2px solid rgb(var(--color-blue));
			}
		}

		.diamond {
			width: calc(var(--i) * 50px);
			height: calc(var(--i) * 50px);
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(45deg);
			border-radius: 10px;
			border: 2px solid rgb(var(--color-blue));
			// border: calc(10px - var(--i) * 1px) solid rgb(var(--color-blue));

			transition:
				width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
				height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
				border 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}

	@keyframes is-finded {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}

	.confetti {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
