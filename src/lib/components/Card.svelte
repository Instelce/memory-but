<script lang="ts">
	import type { CardData } from '$lib/types/CardData';
	import { randomNumber } from '$lib/utils';
    import {revealedCount} from "$lib/store/revealed";

	export let data: CardData;

	let revealed = false;

	let card: HTMLDivElement;
	let width = 0;
	let height = 0;
	$: halfWidth = width / 2;
	$: halfHeight = height / 2;

	let diamonds = Array.from(Array(10).keys());
	$: rotation = revealed ? randomNumber(0, 0.5) : randomNumber(0, 0.5);

    $: if (revealed) {
        revealedCount.inc();
        console.log(revealedCount.count);
    } else {
        revealedCount.dec();
    }

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

	function handleMouseMove(e: MouseEvent) {
		let offsetWidth = e.clientX - card.offsetLeft - halfWidth;
		let offsetHeight = e.clientY - card.offsetTop - halfHeight;

		let degX = -(offsetHeight * 0.1);
		let degY = offsetWidth * 0.05;

		card.style.transform = `rotateX(${degX}deg) rotateY(${degY}deg) scale(1.04)`;
	}

	function handleMouseLeave(e: MouseEvent) {
		card.style.transform = `rotateX(0deg) rotateY(0deg) rotateZ(${rotation}deg) scale(1)`;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card-container"
	bind:this={card}
	on:mouseleave={handleMouseLeave}
	on:mousemove={handleMouseMove}
	on:click={() => (revealed = !revealed)}
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<div class="card" class:show={revealed}>
		{#if revealed}
			<div class="card-front" transition:flip={{}}>
				<p>Coucou</p>
			</div>
		{:else}
			<div class="card-back" transition:flip={{}}>
				<div class="card-design">
					<img class="logo" src="logo-info.png" alt="" />
					{#each diamonds as i}
						<span class="diamond" style={`--i: ${i}`}></span>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.card-container {
		width: 100%;
		height: 100%;
		position: relative;
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.card {
		width: 100%;
		height: 100%;
		position: absolute;
		overflow: hidden;
		perspective: 600;

		transform-style: preserve-3d;

		border-radius: var(--radius);

		&:hover .diamond {
			width: calc(var(--i) * 52px);
			height: calc(var(--i) * 52px);
		}

		&:hover .logo {
			transform: scale(1.05);
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
			background: linear-gradient(
				0deg,
				rgba(var(--color-blue), 0.2) 0%,
				rgba(var(--color-blue), 0) 100%
			);
		}

		.diamond {
			width: calc(var(--i) * 50px);
			height: calc(var(--i) * 50px);
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(45deg);
			border-radius: 10px;
			border: 1px solid rgb(var(--color-blue));

			transition:
				width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
				height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}
</style>
