import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { CollectableObject } from "./collectable-object.class.js";

/**
 * Represents a collectible coin object in the game.
 * Handles animation and positioning of coin collectibles.
 * Extends CollectableObject.
 */
export class Firefly extends CollectableObject {
    offset = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    };

    /**
     * Creates a new Firefly instance at a randomized position and starts its animation loop.
     */
    constructor() {
        super(Firefly.xPos + Math.random() * Firefly.gap, 130 + Math.random() * 200, 50, 50, ImgHub.FIREFLY);
        Firefly.xPos += Firefly.gap;
        IntervalHub.startInterval(this.animate, 1000 / 60);
    }

    /**
     * Runs the coin animation
     */
    animate = () => {
        this.playAnimation("coin", this.animation, 9);
    };
}
