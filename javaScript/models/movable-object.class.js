import { DrawableObject } from "./drawable-objects.class.js";

/**
 * Base class for all movable game objects.
 * Extends DrawableObject and provides movement, collision detection and animation handling.
 */
export class MovableObject extends DrawableObject {

    //#region properties

    otherDirection = false;
    rX;
    rY;
    rW;
    rH;
    speed;
    currentAnimation = null;
    currentImage = 0;
    lastFrameChange = 0;

    //#endregion

    /**
     * Creates a MovableObject instance.
     * @param {number} x_ - Initial x position.
     * @param {number} y_ - Initial y position.
     * @param {number} height_ - Height of the object.
     * @param {number} width_ - Width of the object.
     * @param {number} speed_ - Movement speed of the object.
     */
    constructor(x_, y_, height_, width_, speed_) {
        super(x_, y_, height_, width_);
        this.x = x_;
        this.y = y_;
        this.height = height_;
        this.width = width_;
        this.speed = speed_;
    }

    //#region methods

    /**
     * Draws the bounding box of the object (debug frame).
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    /**
     * Draws the actual collision frame based on offset values.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    drawRealFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.rX, this.rY, this.rW, this.rH);
        ctx.stroke();
    }

    /**
     * Calculates the real collision frame using offset values.
     */
    getFrameValues = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    };

    /**
     * Checks whether this object is colliding with another movable object.
     * @param {MovableObject} mo - The other object to check collision against.
     * @returns {boolean} True if both objects are colliding.
     */
    isColliding(mo) {
        return (
            this.rX + this.rW > mo.rX &&
            this.rY + this.rH > mo.rY &&
            this.rX < mo.rX + mo.rW &&
            this.rY < mo.rY + mo.rH
        );
    }

    /**
     * Removes this object from a given array.
     * @param {Array} arr - The array to remove the object from.
     */
    removeObj(arr) {
        const index = arr.indexOf(this);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    /**
     * Plays an animation by cycling through image frames at a given FPS.
     * @param {string} name - Name of the animation.
     * @param {string[]} images - Array of image keys.
     * @param {number} fps - Frames per second.
     */
    playAnimation(name, images, fps) {

        if (this.currentAnimation !== name) {
            this.currentAnimation = name;
            this.currentImage = 0;
            this.lastFrameChange = 0;
        }

        const now = Date.now();
        const interval = 1000 / fps;

        if (now - this.lastFrameChange > interval) {
            this.img = this.imgCache[images[this.currentImage]];
            this.currentImage++;

            if (this.currentImage == images.length) {
                this.currentImage = 0;
            }

            this.lastFrameChange = now;
        }
    }

    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    //#endregion
}