import { AudioHub, MyAudio } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { Mushroom } from "./mushroom.class.js";

/**
 * Represents a small chicken enemy.
 */
export class SmallMushroom extends Mushroom {
	offset = {
		top: 12,
		right: 4,
		bottom: 1,
		left: 4,
	};

	mumbelingAudio = new MyAudio("./sounds/mushroom/mushroom-mumbeling-2.mp3", 1, -0.12, true);
	deadAudio = AudioHub.MUSHROOM.DEAD;

	/**
	 * Creates a SmallMushroom instance.
	 * @param {number} x_ - Initial x position of the chicken.
	 * @param {number} speed_ - Movement speed of the chicken.
	 */
	constructor(x_, speed_) {
		super(x_, 375, 40, 50, speed_, ImgHub.ENEMIES.MUSHROOM_SMALL.WALK, ImgHub.ENEMIES.MUSHROOM_SMALL.DEAD);
	}
}
