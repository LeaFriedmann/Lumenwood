import { AudioHub, MyAudio } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { Mushroom } from "./mushroom.class.js";

/**
 * Represents a normal-sized chicken enemy.
 */
export class NormalMushroom extends Mushroom {
	offset = {
		top: 12,
		right: 8,
		bottom: 1,
		left: 8,
	};

	mumbelingAudio = new MyAudio("./sounds/mushroom/mushroom-mumbeling-1.mp3", 1, -0.12, true);
	deadAudio = AudioHub.MUSHROOM.DEAD2;

	/**
	 * Creates a NormalMushroom instance.
	 * @param {number} x_ - Initial x position of the chicken.
	 * @param {number} speed_ - Movement speed of the chicken.
	 */
	constructor(x_, speed_) {
		super(x_, 358, 60, 69, speed_, ImgHub.ENEMIES.MUSHROOM_NORMAL.WALK, ImgHub.ENEMIES.MUSHROOM_NORMAL.DEAD);
	}
}
