import type { Competence } from "$lib/types/Competence";

class GameData {
    rulesVisible = $state(true);
    gameStarted = $state(false);
    gameEnded = $state(false);

    cardRevealedCompetence: number[] = $state([]);
    competenceFinded: number[] = $state([]);

    screen: 'menu' | 'settings' | 'about' = $state("menu");

    competenceFind(competence: Competence): boolean {
        return this.competenceFinded.includes(competence.number);
    }
}

export const gameData = new GameData();