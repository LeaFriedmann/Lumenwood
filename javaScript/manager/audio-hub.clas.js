/**
 * Wrapper class for handling Audio playback with additional metadata.
 */
export class MyAudio {
    file;
    isLoaded = false;
    isPlaying = false;
    changeVol = 0;

    /**
     * Creates a MyAudio instance.
     * @param {string} file_ - Path to the audio file.
     * @param {number} playbackRate_ - Playback speed of the audio.
     * @param {number} changeVol_ - Additional volume offset for this sound.
     */
    constructor(file_, playbackRate_, changeVol_, loop_ = false) {
        this.file = new Audio(file_);
        this.file.playbackRate = playbackRate_;
        this.changeVol = changeVol_;
        this.file.loop = loop_;
    }
}

/**
 * Central audio management hub for playing, stopping, and controlling game sounds.
 */
export class AudioHub {
    //#region properties
    static VOLUME = 0.2;
    static SOUND_ON = true;

    //#region audios
    static CHARACTER = {
        DAMAGE: new MyAudio("./sounds/character/fox-hurt.mp3", 1.5, 0.2),
        DEAD: new MyAudio("./sounds/character/fox-dead.opus", 1, 0.1),
        JUMP: new MyAudio("./sounds/character/fox-jump.mp3", 1, 0),
        RUN: new MyAudio("./sounds/character/fox-run.mp3", 1, 0.7, true),
        SNORING: new MyAudio("./sounds/character/fox-sleep.mp3", 1, 0.7),
    };

    static CHICKEN = {
        DEAD: new MyAudio("./sounds/chicken/mushroom-dead.mp3", 1, 0),
        DEAD2: new MyAudio("./sounds/chicken/mushroom-dead-2.mp3", 1, 0),
    };

    static COLLECT = {
        BOTTLE: new MyAudio("./sounds/collectibles/acorn-collect.opus", 1, 0),
        COIN: new MyAudio("./sounds/collectibles/firefly-collect.opus", 1, 0),
    };

    static ENDBOSS_APPROACH = new MyAudio("./sounds/endboss/endboss-alert.opus", 1, 0.8);
    static ENDBOSS_HURT = new MyAudio("./sounds/endboss/endboss-hurt.opus", 1, 0);
    static ENDBOSS_WALK = new MyAudio("./sounds/endboss/endboss-walk-loop-long.mp3", 1, -0.05, true);
    static ENDBOSS_DEAD = new MyAudio("./sounds/endboss/endboss-dead.mp3", 1, 0);
    static ENDBOSS_ATTACK = new MyAudio("./sounds/endboss/endboss-attack.mp3", 1.2, 0);

    static BOTTLE_BREAK = new MyAudio("./sounds/throwable/acorn-explode.opus", 1, 0);
    static THROW = new MyAudio("./sounds/throwable/throw.opus", 1, 0);

    static GAME_START = new MyAudio("./sounds/game/game-start.opus", 1, 0);
    static BACKGROUND_MUSIC = new MyAudio("./sounds/background-music/background-music-lumenwood.mp3", 1, -0.05);
    static VICTORY = new MyAudio("./sounds/game/victory.opus", 1, 0);
    static DEFEAT = new MyAudio("./sounds/game/defeat.opus", 1, 0);

    static allSounds = [
        AudioHub.CHARACTER.DAMAGE,
        AudioHub.CHARACTER.DEAD,
        AudioHub.CHARACTER.JUMP,
        AudioHub.CHARACTER.RUN,
        AudioHub.CHARACTER.SNORING,

        AudioHub.CHICKEN.DEAD,
        AudioHub.CHICKEN.DEAD2,

        AudioHub.COLLECT.COIN,
        AudioHub.COLLECT.BOTTLE,

        AudioHub.ENDBOSS_APPROACH,
        AudioHub.ENDBOSS_WALK,
        AudioHub.ENDBOSS_DEAD,
        AudioHub.ENDBOSS_HURT,
        AudioHub.ENDBOSS_ATTACK,

        AudioHub.THROW,
        AudioHub.BOTTLE_BREAK,

        AudioHub.GAME_START,
        this.BACKGROUND_MUSIC,
    ];
    //#endregion
    //#endregion

    constructor(){
        AudioHub.getFromLocl();
    }
    //#region methods

    /**
     * Plays a given sound from the beginning.
     * @param {MyAudio} sound - The sound instance to play.
     */
    static async playOne(sound) {

        sound.isPlaying = true;
        sound.file.volume = AudioHub.SOUND_ON ? AudioHub.VOLUME + sound.changeVol :  0;
        
        try {
            if (sound.file.readyState === 0) {
                await new Promise((resolve, reject) => {
                    sound.file.addEventListener("canplay", resolve, { once: true });
                    sound.file.addEventListener("error", reject, { once: true });
                });
            }

            sound.file.currentTime = 0;
            await sound.file.play();

        } catch (error) {
            sound.isPlaying = false;
            console.error("Audio konnte nicht abgespielt werden:", error);
        }
    }

    /**
     * Stops all registered sounds.
     */
    static stopAll() {
        AudioHub.allSounds.forEach((sound) => {
            sound.file.pause();
            sound.isPlaying = false;
        });
    }

    /**
     * Stops a specific sound.
     * @param {MyAudio} sound - The sound instance to stop.
     */
    static stopOne(sound) {
        sound.file.pause();
        sound.isPlaying = false;
    }

    /**
     * Toggles global sound on or off and updates all volumes accordingly.
     */
    static toggleSound() {
        AudioHub.SOUND_ON = !AudioHub.SOUND_ON;

        if (AudioHub.SOUND_ON) {
            AudioHub.VOLUME = 0.2;

            AudioHub.allSounds.forEach((sound) => {
                sound.file.volume = AudioHub.VOLUME + sound.changeVol;
            });
        } else {
            AudioHub.VOLUME = 0;

            AudioHub.allSounds.forEach((sound) => {
                sound.file.volume = AudioHub.VOLUME;
            });
        }

        AudioHub.toLoclStrg();
    }

    //#region local storage

    /**
     * Saves the current sound toggle state to localStorage.
     */
    static toLoclStrg() {
        localStorage.setItem("SOUND_ON", JSON.stringify(AudioHub.SOUND_ON));
    }

    /**
     * Loads the sound toggle state from localStorage.
     */
    static getFromLocl() {
        const backFrLocal = JSON.parse(localStorage.getItem("SOUND_ON"));

        if (backFrLocal != null) {
            AudioHub.SOUND_ON = backFrLocal;
        }
    }

    //#endregion
    //#endregion
}
