import { AudioHub, MyAudio } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { Chicken } from "./chicken.class.js";

/**
 * Represents a normal-sized chicken enemy.
 */
export class NormalChicken extends Chicken {

    offset = {
        top: 12,
        right: 8,
        bottom: 1,
        left: 8,
    };

    mumbelingAudio = new MyAudio("./sounds/chicken/mushroom-mumbeling-1.mp3", 1, -0.12, true);
    deadAudio = AudioHub.CHICKEN.DEAD2;

    /**
     * Creates a NormalChicken instance.
     * @param {number} x_ - Initial x position of the chicken.
     * @param {number} speed_ - Movement speed of the chicken.
     */
    constructor(x_, speed_) {
        super(x_, 358, 60, 69, speed_, ImgHub.ENEMIES.CHICKEN_NORMAL.WALK, ImgHub.ENEMIES.CHICKEN_NORMAL.DEAD); 
    }
}
