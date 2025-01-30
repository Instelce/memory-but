
class GameSettings {
    flipCooldown = 4000; //1500 de base
    flipDuration = 400;

    sound = $state(true);
    fullscreen = $state(false);
    speedrun = $state(false);

    constructor() {
    }
}

export const gameSettings = new GameSettings();