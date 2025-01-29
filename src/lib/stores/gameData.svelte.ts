import type { Competence } from "$lib/types/Competence";

class GameData {
    rulesVisible = $state(true);
    gameStarted = $state(false);
    gameEnded = $state(false);

    cardRevealedCompetence: number[] = $state([]);
    competenceFinded: Competence[] = $state([]);

    screen: 'menu' | 'settings' | 'about' = $state("menu");

    competenceFind(competence: Competence): boolean {
        let founded = false;

        this.competenceFinded.forEach((comp) => {
            if (comp.number === competence.number) {
                founded = true;
            }
        });

        return founded;
    }
}

export const gameData = new GameData();