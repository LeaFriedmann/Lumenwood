import { DrawableObject } from "./drawable-objects.class.js";

/**
 * Represents a visual status bar that displays a percentage-based state
 * using different images.
 */
export class StatusBar extends DrawableObject {

    //#region properties
    percentage;
    imgStatusbar;
    //#endregion

    /**
     * Creates a new status bar instance.
     *
     * @param {number} x_ - The horizontal position of the status bar.
     * @param {number} y_ - The vertical position of the status bar.
     * @param {string[]} imgStatusbar_ - Array of image paths for the status bar states.
     * @param {number} percentage_ - Initial percentage value of the status bar.
     */
    constructor(x_, y_, imgStatusbar_, percentage_){
        super(x_, y_, 45, 158);
        this.imgStatusbar = imgStatusbar_;
        this.percentage = percentage_;
        this.loadImages(imgStatusbar_);
        this.setPercentage(percentage_);
    }

    //#region methods

    /**
     * Updates the status bar percentage and switches the displayed image
     * according to the current value.
     *
     * @param {number} percentage - The new percentage value.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        const path = this.imgStatusbar[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Determines the image index based on the current percentage value.
     *
     * @returns {number} The index of the image representing the current percentage.
     */
    resolveImageIndex(){
        const imgIndex = this.percentage / 10;
        return imgIndex;
    }
}