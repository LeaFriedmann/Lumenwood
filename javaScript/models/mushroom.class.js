import { AudioHub } from "../manager/audio-hub.clas.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Entity } from "./entity.class.js";
import { Level } from "./level.class.js";

/**
 * Represents a mushroom enemy entity in the game.
 * Handles movement, animation, and death behavior including sound playback and removal.
 * Extends Entity.
 */
export class Mushroom extends Entity {
	//#region properties
	audioPlayed = false;
	mumbelingAudio;
	deadAudio;
	//#endregion

	/**
	 * Creates a new Mushroom enemy instance and starts its animation and movement loops.
	 * @param {number} x_ - X position.
	 * @param {number} y_ - Y position.
	 * @param {number} width_ - Width of the mushroom.
	 * @param {number} height_ - Height of the mushroom.
	 * @param {number} speed_ - Movement speed.
	 * @param {string[]} animationWalk_ - Walking animation frames.
	 * @param {string[]} animationDead_ - Death animation frames.
	 */
	constructor(x_, y_, width_, height_, speed_, animationWalk_, animationDead_) {
		super(x_, y_, height_, width_, speed_, 100, 100, animationWalk_, animationDead_);

		IntervalHub.startInterval(this.animate, 1000 / 60);
		IntervalHub.startInterval(this.move, 1000 / 25);
		IntervalHub.startInterval(this.stopAudio, 1000 / 60);
	}

	/**
	 * Handles animation states (walking or dead) and triggers sound/effects on death.
	 */
	animate = () => {
		if (this.isDead()) {
			this.playAnimation("dead", this.animationDead, 7);
			if (this.isDead && !this.audioPlayed) {
				AudioHub.playOne(this.deadAudio);
				this.audioPlayed = true;
			}
			setTimeout(() => {
				this.removeObj(Level.enemies);
			}, 450);
		} else {
			this.playAnimation("walk", this.animationWalk, 7);
		}
	};

	/**
	 * Moves the mushroom to the left if it is still alive.
	 */
	move = () => {
		if (!this.isDead()) {
			this.moveLeft();
		}
	};

	startAudio() {
		if (!this.mumbelingAudio.isPlaying && !this.isDead() && this.x > 0) {
			AudioHub.playOne(this.mumbelingAudio);
			AudioHub.allSounds.push(this.mumbelingAudio);
		}
	}

	stopAudio = () => {
		if ((this.isDead() && this.mumbelingAudio.isPlaying) || this.x < 0) {
			AudioHub.stopOne(this.mumbelingAudio);
			this.removeAudio(AudioHub.allSounds, this.mumbelingAudio);
		}
	};

	removeAudio(arr, audio) {
		const index = arr.indexOf(audio);
		if (index > -1) {
			arr.splice(index, 1);
		}
	}
}
