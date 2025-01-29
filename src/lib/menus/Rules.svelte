<script>
	import Button from "../components/ui/button/button.svelte";
	import H1 from "../components/ui/heading/h1.svelte";

  let showRules = true;

  const closeRules = () => {
    showRules = false;
  };
</script>

<style>
  .container {
    font-family: 'Poppins', sans-serif;
    text-align: center;
  }

  h1 {
    font-size: 2.2rem;
    color: rgb(var(--color-blue));
    text-align: center;
    margin-bottom: 1rem;
  }

  /* h2 {
    font-size: 1.6rem;
    color: #ecf0f1;
    margin-bottom: 1.5rem;
    text-align: center;
  } */

  ol {
    /* font-size: 1.2rem; */
    line-height: 1.8;
    /* margin-left: 2rem; */
    color: #ecf0f1;
    line-height: 120%;
    counter-reset: item;
  }

  ol > li::before {
    min-width: 3rem;
    height: 3rem;
    padding-top: .25rem;
    content: counter(item);
    counter-increment: item;
    color: #fff;
    background: rgb(var(--color-blue));
    border-radius: 100px;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Condate', sans-serif;
    font-size: 1.2rem;
    line-height: 140%;
    align-self: self-start;
  }

  ol > li {
    display: flex;
    margin-bottom: 1.5rem;
    align-items: center;
  }

  ul {
    min-width: 100%;
    margin-left: 2rem;
    margin-top: .5rem;
    /* font-size: 1rem; */
    list-style: disc;
  }

  .rules {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    /* background: black; */
    color: #ecf0f1;
    padding: 2.5rem;
    border-radius: 16px;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
    text-align: left;
    display: flex;
    flex-direction: column;
    @apply text-lg;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
  }
</style>

{#if showRules}
  <div class="overlay"></div>

  <div class="rules">
    <h1 class="font-condate max-w-[20ch] self-center font-bold text-center text-primary mb-8 leading-tight">Bienvenue sur le memory du BUT Informatique !</h1>
    <h2 class="font-condate text-center text-lg mb-4">Voici les règles du jeu</h2>
    <ol>
      <li>12 cartes sont positionnées sur le plateau. Elles représentent les compétences, les objectifs, les projets et les technologies du BUT Informatique.</li>
      <li>
        <div class="mt-4">
          À chaque tour, le joueur en retourne deux :
          <ul>
            <li>Si les deux cartes correspondent à une même compétence, elles restent face visible.</li>
            <li>Sinon, elles sont à nouveau retournées face cachée.</li>
            <li>Pour chaque paire découverte, des informations détaillées sur la compétence correspondante seront affichées.</li>
            <li>Pour plus de défi, n'hésitez pas à essayer le mode Speedrun !</li>
          </ul>
        </div>
      </li>
      <li>Le jeu se termine lorsque toutes les paires sont découvertes.</li>
    </ol>
    <p class="flex gap-4 items-center">
      <strong class="bg-primary p-2 px-4 h-fit rounded-sm -rotate-2 block">Objectif</strong> Mémorisez les positions des cartes et découvrez toutes les compétences du BUT Informatique tout en vous amusant !
    </p>
    <Button onclick={closeRules} size="lg" class="w-full mt-8 text-lg">J'ai compris</Button>
  </div>
{/if}
