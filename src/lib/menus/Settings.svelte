<script lang="ts">
	import { gameData } from '$lib/stores/gameData.svelte';
	import { fly } from 'svelte/transition';
	import MenuBackButton from '../components/MenuBackButton.svelte';
	import H1 from '$lib/components/ui/heading/h1.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { gameSettings } from '$lib/stores/gameSettings.svelte';
	import { Label } from '$lib/components/ui/label';
</script>

{#if gameData.screen === 'settings'}
	<div class="settings-container" in:fly={{ x: -100, delay: 300 }} out:fly={{ x: -200 }}>
		<div class="settings-wrapper">
			<H1>Settings</H1>
            <div class="flex flex-col gap-3">
                <div class="flex items-center space-x-2">
                    <Switch id="fullscreen" bind:checked={gameSettings.fullscreen}/>
                    <Label for="fullscreen">Fullscreen</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <Switch id="sound" bind:checked={gameSettings.sound} />
                    <Label for="sound">Sound</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <Switch id="speedrun" bind:checked={gameSettings.speedrun} />
                    <Label for="speedrun">Speedrun</Label>
                </div>
            </div>
		</div>
	</div>

	<MenuBackButton onclick={() => (gameData.screen = 'menu')}>Retour</MenuBackButton>
{/if}

<style lang="scss">
	.settings-container {
		width: 100%;
		height: 100%;
		z-index: 40;
		position: absolute;
		background: linear-gradient(
			80deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 0.4) 60%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.settings-wrapper {
		width: 40%;
		height: 100%;
		margin-left: 10rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
