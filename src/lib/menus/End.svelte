<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { gameData } from '$lib/stores/gameData.svelte';
	import { fly, fade } from 'svelte/transition';
	import { competences } from '../../routes/data';
	import H1 from '$lib/components/ui/heading/h1.svelte';
	import Confetti from 'svelte-confetti';

    let hide = false;

    function closePopup() {
        hide = true;
    }
</script>

{#if gameData.competenceFinded.length === competences.length}
    {#await new Promise(resolve => setTimeout(resolve, 600)) then}
        <div class="absolute top-[30%] left-[50%] -translate-x-1/2 z-30">
            <!-- <Confetti x={[-0.5, 0.5]} delay={[0, 250]} />
            <Confetti x={[-0.75, -0.3]} y={[0.15, 0.75]} delay={[0, 1000]} />
            <Confetti x={[0.3, 0.75]} y={[0.15, 0.75]} delay={[0, 1000]} /> -->

            <Confetti cone x={[-1, -0.25]} colorRange={[202, 203]} />
            <Confetti cone x={[-0.35, 0.35]} delay={[500, 550]} colorRange={[202, 203]} />
            <Confetti cone x={[0.25, 1]} delay={[250, 300]} colorRange={[202, 203]} />
            <Confetti cone x={[-1, 1]} y={[0, 1]} delay={[0, 550]} colorRange={[202, 203]} />
        </div>
    {/await}

    {#if !hide}
	    <div in:fly={{y: 200}} out:fade class="end-container">
            <H1 class="pb-2">Bravo !</H1>
            <h2 class="font-condate text-center text-lg mb-4">Vous avez trouvé toutes les compétences !</h2>
            <p>
                Vous pouvez recommencer une partie, et n'hésitez pas à allez dans les <strong class="text-primary">paramètres</strong> pour changer
                le niveau de difficulté.
            </p>
            <Button onclick={closePopup}>Fermer</Button>
        </div>
    {/if}
    <!-- <div in:fly={{y: 200}} class="goback">
        <Button class="goback" onclick={() => gameData.gameStarted = false}>Revenir à l'acceuil</Button>
    </div> -->
{/if}


<style lang="scss">
    .end-container {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        z-index: 21;

        background: radial-gradient(
            circle,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
        );

    }

    // .goback {
    //     width: 15%;
    //     height: 150vh;
    //     position: absolute;
    //     top: 0;
    //     left: 0;

    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: center;
    //     text-align: center;

    //     z-index: 21;
    //     background: radial-gradient(
    //         circle,
    //         rgba(0, 0, 0, 1) 0%,
    //         rgba(0, 0, 0, 0) 50%
    //     );
    // }

    p {
        max-width: 40ch;
        margin-bottom: 2rem;
    }
</style>