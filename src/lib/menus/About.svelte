<script lang="ts">
	import MenuBackButton from '$lib/components/MenuBackButton.svelte';
	import H1 from '$lib/components/ui/heading/h1.svelte';
	import { gameData } from '$lib/stores/gameData.svelte';
	import { fly } from 'svelte/transition';
</script>

{#if gameData.screen === 'about'}
	<div class="menu-container" in:fly={{ x: -100, delay: 300 }} out:fly={{ x: -200 }}>
		<div class="wrapper">
			<H1>A propos</H1>

			<div class="flex flex-col gap-4">
				<div class="contributor">
					<img src="/about/.jpg" alt="" />
					<div>
						<h3></h3>
						<div class="flex gap-2">
							<a href="https://github.com/Instelce" target="_blank" rel="noopener noreferrer"
								>Github</a
							>
							<a
								href="https://www.linkedin.com/in/c%C3%A9lestin-besson/"
								target="_blank"
								rel="noopener noreferrer">Linkedin</a
							>
						</div>
					</div>
				</div>

				<div class="contributor">
					<img src="/about/stephane-antoine.jpg" alt="" />
					<div>
						<h3>Stéphane Antoine</h3>
						<div class="flex gap-2">
							<a href="https://github.com/stephantoine" target="_blank" rel="noopener noreferrer"
								>Github</a
							>
							<a
								href="https://www.linkedin.com/in/stephane-antoine-etudiant-iutlan/"
								target="_blank"
								rel="noopener noreferrer">Linkedin</a
							>
						</div>
					</div>
				</div>

				<div class="contributor">
					<img src="/about/sasha-faver.jpeg" alt="" />
					<div>
						<h3>Sasha Faver</h3>
						<div class="flex gap-2">
							<a href="https://github.com/sashafv" target="_blank" rel="noopener noreferrer"
								>Github</a
							>
							<a
								href="https://www.linkedin.com/in/sasha-faver-5295612a3/"
								target="_blank"
								rel="noopener noreferrer">Linkedin</a
							>
						</div>
					</div>
				</div>

				<div class="contributor">
					<img src="/about/celestin-besson.jpg" alt="Célestin Besson" />
					<div>
						<h3>Célestin Besson</h3>
						<div class="flex gap-2">
							<a href="https://github.com/Instelce" target="_blank" rel="noopener noreferrer"
								>Github</a
							>
							<a
								href="https://www.linkedin.com/in/c%C3%A9lestin-besson/"
								target="_blank"
								rel="noopener noreferrer">Linkedin</a
							>
						</div>
					</div>
				</div>
			</div>

			<a
				href="https://github.com/Instelce/memory-but"
				target="_blank"
				rel="noopener noreferrer"
				class="mt-10 flex font-condate gap-4 items-center hover:text-primary hover:underline decoration-2 underline-offset-4"
			>
				<img src="/github-mark-white.svg" alt="Github logo" width="30" />
				<p class="pt-2 transition-all">Le repo pour les curieux</p>
			</a>
		</div>
	</div>

	<MenuBackButton onclick={() => (gameData.screen = 'menu')}>Retour</MenuBackButton>
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
	.wrapper {
		width: 40%;
		height: 100%;
		margin-left: 10rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.contributor {
		display: flex;
		align-items: center;
		gap: 1.5rem;

		img {
			width: 100px;
			border-radius: 50%;
		}

		h3 {
			font-family: 'Condate', sans-serif;
			font-size: 1.2rem;
		}

		a:hover {
			color: rgb(var(--color-blue));
			text-decoration-line: underline;
			text-decoration-color: rgb(var(--color-blue));
			text-decoration-line: 4px;
			text-underline-offset: 0.25rem;
		}
	}
</style>
