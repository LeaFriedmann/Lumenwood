import { AudioHub } from "./manager/audio-hub.clas.js";
import { Listener } from "./manager/eventlistener.class.js";
import { Render } from "./manager/render.class.js";

export const world = [];

/**
 * Initializes the game and registers all required listeners,
 * rendering processes, and audio settings.
 */
export class StartGame {
    /**
     * Creates a new game instance and initializes all core systems.
     */
    constructor() {
        Listener.checkDevice();
        Listener.checkOrientation();
        AudioHub.getFromLocl();
        Render.currentLvl();
        Render.styleSoundBtn();
        Listener.clickKeyDown();
        Listener.clickKeyUp();
        Listener.clickStartGame();
        Listener.clickHome();
        Listener.clickNextLvl();
        Listener.clickRestart();
        Listener.addMobileBtn();
        Listener.btnsToucend();
        Listener.btnsTouchstart();
        Listener.muteAudio();
        Listener.startGameAudio();
        Listener.restartAudio();
        Listener.disableCntxtMenu();
        Listener.resetAttackAudioEndboss();
        Listener.openInfo();
        Listener.closeInfo();
    }
}

new StartGame();
