
class GameSettings {
    flipCooldown = 1500;
    flipDuration = 400;

    sound = $state(true);
    fullscreen = $state(false);
    speedrun = $state(false);

    constructor() {
    }
}

export const gameSettings = new GameSettings();