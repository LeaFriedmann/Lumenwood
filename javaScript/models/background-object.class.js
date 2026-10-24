import { ImgHub } from "../manager/imgHub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a background object used for creating a tiled scrolling background.
 * Extends MovableObject to support positioning and rendering in the game world.
 */
export class BackgroundObject extends MovableObject {
	//#region properties
	static xPos = -719;
	static BACKGROUND_COUNTER = 0;
	static EXTENSION_TURN = 0;
	//#endregion

	/**
	 * Creates a new BackgroundObject instance and positions it in the background sequence.
	 * @param {string} imagePath - The path to the image used for this background segment.
	 */
	constructor(imagePath) {
		super(BackgroundObject.xPos, 0, 480, 720, 0);
		this.loadImage(imagePath);
		BackgroundObject.xPos += 719;
		BackgroundObject.BACKGROUND_COUNTER++;

		if (
			BackgroundObject.BACKGROUND_COUNTER == ImgHub.BACKGROUND.START.length + ImgHub.BACKGROUND.EXTENSION.length ||
			(BackgroundObject.EXTENSION_TURN > 0 && (BackgroundObject.BACKGROUND_COUNTER - ImgHub.BACKGROUND.START.length) % 6 == 0)
		) {
			BackgroundObject.EXTENSION_TURN++;
		}
	}
}
