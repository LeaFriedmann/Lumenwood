import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a collectable game object that can be animated and removed upon collection.
 * Extends MovableObject and supports animation frames and global tracking of instances.
 */
export class CollectableObject extends MovableObject {
    //#region properties
    animation;
    static gap = 0;
    static xPos = 300;
    static arrAll = [];
    static collected = 0;
    //#endregion

    /**
     * Creates a new CollectableObject instance with animation support.
     * Initializes image loading and starts the animation interval.
     * @param {number} x_ - X position of the object.
     * @param {number} y_ - Y position of the object.
     * @param {number} height_ - Height of the object.
     * @param {number} width_ - Width of the object.
     * @param {string[]} animation_ - Array of image paths used for animation.
     */
    constructor(x_, y_, height_, width_, animation_) {
        super(x_, y_, height_, width_, 0);

        this.animation = animation_;
        this.loadImage(this.animation[0]);
        this.loadImages(this.animation);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }

    /**
     * Removes this collectable object from the global collectable list.
     */
    removeCollectable() {
        this.removeObj(CollectableObject.arrAll);
    }
}
