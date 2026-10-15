import { world } from "../game.js";
import { GameState } from "../models/game-state.class.js";
import { Level } from "../models/level.class.js";
import { World } from "../models/world.class.js";
import { AudioHub } from "./audio-hub.clas.js";
import { Keyboard } from "./keyboard.class.js";
import { Ref } from "./ref.class.js";
import { Render } from "./render.class.js";

/**
 * Central event and device listener handler.
 * Responsible for keyboard input, touch controls, UI actions,
 * audio events, and device/orientation handling.
 */
export class Listener {
    //#region methods
    //#region keyboard

    /**
     * Registers global keydown listeners and updates keyboard state.
     */
    static clickKeyDown() {
        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp") Keyboard.UP = true;
            if (e.key == "ArrowDown") Keyboard.DOWN = true;
            if (e.key == "ArrowRight") Keyboard.RIGHT = true;
            if (e.key == "ArrowLeft") Keyboard.LEFT = true;
            if (e.key == " ") Keyboard.SPACE = true;
            if (e.key == "d") Keyboard.D = true;
        });
    }

    /**
     * Registers global keyup listeners and updates keyboard state.
     */
    static clickKeyUp() {
        window.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp") Keyboard.UP = false;
            if (e.key == "ArrowDown") Keyboard.DOWN = false;
            if (e.key == "ArrowRight") Keyboard.RIGHT = false;
            if (e.key == "ArrowLeft") Keyboard.LEFT = false;
            if (e.key == " ") Keyboard.SPACE = false;
            if (e.key == "d") Keyboard.D = false;
        });
    }

    /**
     * Enables touch controls for mobile buttons (pointerdown).
     */
    static btnsTouchstart() {
        Ref.btnLeftMobile.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            Keyboard.LEFT = true;
        });

        Ref.btnRightMobile.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            Keyboard.RIGHT = true;
        });

        Ref.btnJumpMobile.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            Keyboard.UP = true;
        });

        Ref.btnThrowMobile.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            Keyboard.D = true;
        });
    }

    /**
     * Disables touch controls for mobile buttons (pointerup).
     */
    static btnsToucend() {
        Ref.btnLeftMobile.addEventListener("pointerup", () => {
            Keyboard.LEFT = false;
        });

        Ref.btnRightMobile.addEventListener("pointerup", () => {
            Keyboard.RIGHT = false;
        });

        Ref.btnJumpMobile.addEventListener("pointerup", () => {
            Keyboard.UP = false;
        });

        Ref.btnThrowMobile.addEventListener("pointerup", () => {
            Keyboard.D = false;
        });
    }

    //#endregion

    //#region buttons

    /**
     * Opens the info dialog.
     */
    static openInfo() {
        Ref.btnInfo.addEventListener("click", () => {
            Ref.infoDialog.showModal();
        });
    }

    /**
     * Closes the info dialog.
     */
    static closeInfo() {
        Ref.btnClose.addEventListener("click", () => {
            Ref.infoDialog.close();
        });
    }

    /**
     * Starts the game and enables fullscreen on mobile devices.
     */
    static clickStartGame() {
        Ref.btnStart.addEventListener("click", () => {
            if (Listener.isMobile()) {
                Listener.toFullscreen();
            }

            Ref.hideElement(Ref.btnStart);
            Ref.hideImpressum();
            GameState.startLevel();
        });
    }

    /**
     * Requests fullscreen mode for the document.
     */
    static toFullscreen() {
        const elem = document.documentElement;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    /**
     * Restarts the current level.
     */
    static clickRestart() {
        Ref.btnRestart.addEventListener("click", () => {
            Ref.hideBtns();
            GameState.startLevel();
        });
    }

    /**
     * Loads the next level and starts it.
     */
    static clickNextLvl() {
        Ref.btnNextLvl.addEventListener("click", () => {
            Ref.hideBtns();
            GameState.nextLvl();
            GameState.startLevel();
        });
    }

    /**
     * Returns to the home screen and resets the game state.
     */
    static clickHome() {
        Ref.btnHome.addEventListener("click", () => {
            if (Listener.isMobile()) {
                Listener.endFullscreen();
            }

            if (GameState.WON) {
                GameState.nextLvl();
                Render.currentLvl();
            }

            GameState.startscreen = true;
            GameState.gameReset();
            Ref.showElement(Ref.btnStart);
            Ref.showImpressum();
            Ref.hideBtns();
        });
    }

    /**
     * Exits fullscreen mode if supported.
     */
    static endFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    /**
     * Detects whether the current device is a touch-based mobile device.
     * @returns {boolean}
     */
    static isMobile() {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }

    //#region buttons mobile

    /**
     * Shows mobile controls after game start/restart/level change on mobile devices.
     */
    static addMobileBtn() {
        if (Listener.isMobile()) {
            Ref.btnStart.addEventListener("click", () => {
                Ref.showMobileBtn();
            });
            Ref.btnRestart.addEventListener("click", () => {
                Ref.showMobileBtn();
            });
            Ref.btnNextLvl.addEventListener("click", () => {
                Ref.showMobileBtn();
            });
        }
    }

    //#endregion
    //#endregion

    //#region audio

    /**
     * Toggles game audio mute state.
     */
    static muteAudio() {
        Ref.btnMute.addEventListener("click", () => {
            AudioHub.toggleSound();
            Render.styleSoundBtn();
        });
    }

    /**
     * Plays game start sound on start button click.
     */
    static startGameAudio() {
        Ref.btnStart.addEventListener("click", () => {
            AudioHub.playOne(AudioHub.GAME_START);
        });
    }

    /**
     * Plays game start sound on restart.
     */
    static restartAudio() {
        Ref.btnRestart.addEventListener("click", () => {
            AudioHub.playOne(AudioHub.GAME_START);
        });
    }

    static resetAttackAudioEndboss(){
        AudioHub.ENDBOSS_ATTACK.file.addEventListener("ended", () => {
            AudioHub.ENDBOSS_ATTACK.isPlaying = false;
        })
    }

    //#endregion

    //#region fit-device

    /**
     * Disables the context menu on mobile UI elements.
     */
    static disableCntxtMenu() {
        Ref.mobileBtns.addEventListener("contextmenu", (e) => e.preventDefault());
    }

    /**
     * Checks device type and adjusts visible UI accordingly.
     */
    static checkDevice() {
        const orientationType = window.screen.orientation.type;

        if (!this.isMobile()) {
            Ref.showElement(Ref.wrprCanvas);
            Ref.showElement(Ref.header);
        } else if (Listener.isMobile() && (orientationType == "portrait-primary" || orientationType == "portrait-secondary")) {
            Listener.mobilePortrait();
            Ref.hideElement(Ref.infoKeys);
        } else if ((this.isMobile() && orientationType == "landscape-primary") || orientationType == "landscape-secondary") {
            Listener.mobileLandscape();
            Ref.hideElement(Ref.infoKeys);
        }
    }

    /**
     * Listens for screen orientation changes and updates UI layout.
     */
    static checkOrientation() {
        screen.orientation.addEventListener("change", (e) => {
            if (this.isMobile()) {
                const type = e.target.type;

                if (type == "portrait-primary" || type == "portrait-secondary") {
                    Listener.mobilePortrait();
                } else if (type == "landscape-primary" || type == "landscape-secondary") {
                    Listener.mobileLandscape();
                }
            }
        });
    }

    /**
     * Applies landscape layout for mobile devices.
     */
    static mobileLandscape() {
        Ref.hideElement(Ref.rotateMsg);
        Ref.showElement(Ref.wrprCanvas);
        Ref.hideElement(Ref.header);
        document.body.classList.add("positionCenter");
    }

    /**
     * Applies portrait layout for mobile devices.
     */
    static mobilePortrait() {
        Ref.showElement(Ref.rotateMsg);
        Ref.hideElement(Ref.header);
        document.body.classList.add("positionCenter");
        Ref.hideElement(Ref.wrprCanvas);
    }

    //#endregion
    //#endregion
}
