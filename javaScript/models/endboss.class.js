import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Entity } from "./entity.class.js";
import { GameState } from "./game-state.class.js";

/**
 * Represents the endboss enemy
 * Controls its own movement, animations, and audio reactions.
 */
export class Endboss extends Entity {
	//#region properties

	animationHurt = ImgHub.ENEMIES.ENDBOSS.HURT;
	animationAlert = ImgHub.ENEMIES.ENDBOSS.ALERT;
	animationAtack = ImgHub.ENEMIES.ENDBOSS.ATTACK;

	offset = {
		top: 90,
		right: 220,
		bottom: 50,
		left: 160,
	};

	static isAlert = false;
	static startWalking = false;
	static attack = false;

	//#endregion

	/**
	 * Creates an Endboss instance with animations, movement, and audio setup.
	 * @param {number} x_ - Initial x position.
	 * @param {number} speed_ - Movement speed.
	 * @param {number} healthReduction_ - Damage received per hit.
	 */
	constructor(x_, speed_, healthReduction_) {
		super(x_, 60, 400, 558, speed_, 100, healthReduction_, ImgHub.ENEMIES.ENDBOSS.WALK, ImgHub.ENEMIES.ENDBOSS.DEAD);

		this.loadImage(this.animationAlert[0]);
		this.loadImages(this.animationAlert);
		this.loadImages(this.animationHurt);
		this.loadImages(this.animationWalk);
		this.loadImages(this.animationAtack);

		IntervalHub.startInterval(this.move, 1000 / 15);
		IntervalHub.startInterval(this.animate, 1000 / 60);
		IntervalHub.startInterval(this.resetAudio, 1000 / 60);
	}

	//#region methods

	/**
	 * Handles endboss movement logic.
	 */
	move = () => {
		if (Endboss.startWalking && !Endboss.attack && !this.isDead() && !this.isHurt()) {
			this.moveLeft();
			if (!AudioHub.ENDBOSS_WALK.isPlaying) {
				AudioHub.playOne(AudioHub.ENDBOSS_WALK);
			}
		} else {
			AudioHub.stopOne(AudioHub.ENDBOSS_WALK);
		}
	};

	/**
	 * Controls animation state switching based on current behavior.
	 */
	animate = () => {
		if (this.isHurt()) {
			this.playAnimation("hurt", this.animationHurt, 10);
			if (!AudioHub.ENDBOSS_HURT.isPlaying) {
				AudioHub.playOne(AudioHub.ENDBOSS_HURT);
			}
		} else if (Endboss.attack) {
			this.playAnimation("attack", this.animationAtack, 10);
			if (!AudioHub.ENDBOSS_ATTACK.isPlaying) {
				AudioHub.playOne(AudioHub.ENDBOSS_ATTACK);
			}
		} else if (this.isDead()) {
			if (!this.deadAnimationStop(1250)) {
				this.playAnimation("dead", this.animationDead, 10);
				if (!AudioHub.ENDBOSS_DEAD.isPlaying) AudioHub.playOne(AudioHub.ENDBOSS_DEAD);
			} else {
				IntervalHub.stopAllIntervals();
				GameState.WON = true;
				GameState.showOutro();
			}
		} else if (Endboss.isAlert) {
			if (this.animationEnd(this.animationAlert)) {
				Endboss.isAlert = false;
				Endboss.startWalking = true;
			}
			this.playAnimation("alert", this.animationAlert, 4);

			if (!AudioHub.ENDBOSS_APPROACH.isPlaying) {
				AudioHub.playOne(AudioHub.ENDBOSS_APPROACH);
			}
		} else if (Endboss.startWalking) {
			this.playAnimation("walk", this.animationWalk, 5);
		}
	};

	/**
	 * Resets hurt audio state when the endboss is no longer hurt.
	 */
	resetAudio = () => {
		if (!this.isHurt()) {
			AudioHub.stopOne(AudioHub.ENDBOSS_HURT);
		}
	};

	//#endregion
}
