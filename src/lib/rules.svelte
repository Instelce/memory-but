<script>
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

  h2 {
    font-size: 1.6rem;
    color: #ecf0f1;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  ol {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-left: 2rem;
    color: #ecf0f1;
  }

  li {
    margin-bottom: 1rem;
  }

  ul {
    margin-left: 2rem;
    font-size: 1rem;
    list-style: disc;
  }

  .rules {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    background: black;
    color: #ecf0f1;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
    text-align: left;
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

  button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: #fff;
    background-color: #e74c3c;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 2rem;
    display: block;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    transition: transform 0.2s, background-color 0.3s;
  }

  button:hover {
    background-color: #c0392b;
    transform: scale(1.1);
  }

  p {
    margin-top: 1.5rem;
    font-size: 1.2rem;
  }

  p strong {
    color: rgb(var(--color-blue));
  }
</style>

{#if showRules}
  <div class="overlay"></div>

  <div class="rules">
    <h1>Bienvenue sur le memory du BUT Informatique !</h1>
    <h2>Voici les règles du jeu</h2>
    <ol>
      <li>12 cartes sont positionnées sur le plateau. Elles représentent les compétences, les objectifs, les projets et les technologies du BUT Informatique.</li>
      <li>
        À chaque tour, le joueur en retourne deux :
        <ul>
          <li>Si les deux cartes correspondent à une même compétence, elles restent face visible.</li>
          <li>Sinon, elles sont à nouveau retournées face cachée.</li>
          <li>Pour chaque paire découverte, des informations détaillées sur la compétence correspondante seront affichées.</li>
          <li>Pour plus de défi, n'hésitez pas à essayer le mode Speedrun !</li>
        </ul>
      </li>
      <li>Le jeu se termine lorsque toutes les paires sont découvertes.</li>
    </ol>
    <p>
      <strong>Objectif :</strong> mémorisez les positions des cartes et découvrez toutes les compétences du BUT Informatique tout en vous amusant !
    </p>
    <button on:click={closeRules}>J'ai compris</button>
  </div>
{/if}
