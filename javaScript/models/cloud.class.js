import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a moving cloud in the background of the game.
 * Clouds continuously move to the left.
 * Extends MovableObject.
 */
export class Cloud extends MovableObject {
    static xPos = 0;

    /**
     * Creates a new Cloud instance with randomized spacing
     * and starts its movement animation.
     */
    constructor() {
        super(Cloud.xPos, 20, 250, 500, 0.15);
        this.loadImage(ImgHub.BACKGROUND.CLOUDS[0]);
        Cloud.xPos += 500 + Math.random() * 300;

        IntervalHub.startInterval(this.animate, 1000 / 60);
    }

    /**
     * Moves the cloud continuously to the left.
     */
    animate = () => {
        this.moveLeft();
    };
}
