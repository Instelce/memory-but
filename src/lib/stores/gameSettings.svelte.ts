
class GameSettings {
    flipCooldown = 1500; //1500 de base
    flipDuration = 800;

    sound = $state(true);
    fullscreen = $state(false);
    speedrun = $state(false);

    constructor() {
    }
}

export const gameSettings = new GameSettings();