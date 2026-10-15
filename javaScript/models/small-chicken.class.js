import { AudioHub, MyAudio } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { Chicken } from "./chicken.class.js";

/**
 * Represents a small chicken enemy.
 */
export class SmallChicken extends Chicken {

    mumbelingAudio = new MyAudio("./sounds/chicken/mushroom-mumbeling-2.mp3", 1, -0.12, true);
    deadAudio = AudioHub.CHICKEN.DEAD;

    /**
     * Creates a SmallChicken instance.
     * @param {number} x_ - Initial x position of the chicken.
     * @param {number} speed_ - Movement speed of the chicken.
     */
    constructor(x_, speed_) {
        super(x_, 372, 40, 50, speed_, ImgHub.ENEMIES.CHICKEN_SMALL.WALK, ImgHub.ENEMIES.CHICKEN_SMALL.DEAD);
    }
}
