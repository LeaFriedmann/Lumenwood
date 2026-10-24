import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Base class for all game entities with health, gravity, and combat behavior.
 * Extends MovableObject and adds energy, damage handling, and physics logic.
 */
export class Entity extends MovableObject {
	//#region properties

	speedY = 0;
	acceleration = 2.5;
	groundY;
	energy;
	healthReduction;
	lastHit = 0;
	animationWalk;
	animationDead;

	//#endregion

	/**
	 * Creates an Entity instance with movement, health, and animation setup.
	 * @param {number} x_ - Initial x position.
	 * @param {number} y_ - Initial y position.
	 * @param {number} height_ - Entity height.
	 * @param {number} width_ - Entity width.
	 * @param {number} speed_ - Movement speed.
	 * @param {number} energy_ - Initial health/energy value.
	 * @param {number} healthReduction_ - Damage taken per hit.
	 * @param {string[]} animationWalk_ - Walking animation frames.
	 * @param {string[]} animationDead_ - Death animation frames.
	 */
	constructor(x_, y_, height_, width_, speed_, energy_, healthReduction_, animationWalk_, animationDead_) {
		super(x_, y_, height_, width_, speed_);

		this.x = x_;
		this.y = y_;
		this.height = height_;
		this.width = width_;
		this.speed = speed_;
		this.energy = energy_;
		this.healthReduction = healthReduction_;
		this.animationWalk = animationWalk_;
		this.animationDead = animationDead_;

		this.loadImage(this.animationWalk[0]);
		this.loadImages(this.animationWalk);
		this.loadImages(this.animationDead);

		IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
	}

	//#region methods

	/**
	 * Reduces entity energy when hit and records hit time.
	 */
	hit() {
		this.energy -= this.healthReduction;

		if (this.energy < 0) {
			this.energy = 0;
		} else {
			this.lastHit = new Date().getTime();
		}
	}

	/**
	 * Checks whether the entity is currently in a hurt state.
	 * @returns {boolean} True if recently hit.
	 */
	isHurt() {
		let timePassed = new Date().getTime() - this.lastHit;
		timePassed = timePassed / 1000;
		return timePassed < 0.5;
	}

	/**
	 * Checks whether the entity is dead.
	 * @returns {boolean} True if energy is zero.
	 */
	isDead() {
		return this.energy == 0;
	}

	/**
	 * Checks if death animation delay has passed.
	 * @returns {boolean} True if dead animation should stop.
	 */
	deadAnimationStop(afterTime) {
		let timePassed = new Date().getTime() - this.lastHit;
		return timePassed > afterTime;
	}

	/**
	 * Applies gravity to the entity until it reaches the ground.
	 */
	applyGravity = () => {
		if ((this.isAboveGround() || this.speedY > 0) && !this.isDead()) {
			this.y -= this.speedY;
			this.speedY -= this.acceleration;

			if (this.y >= this.groundY) {
				this.y = this.groundY;
				this.speedY = 0;
			}
		}
	};

	/**
	 * Checks whether the entity is above ground level.
	 * @returns {boolean} True if entity is in the air.
	 */
	isAboveGround() {
		return this.y < this.groundY;
	}

	animationEnd(imgArr) {
		return this.currentImage + 1 == imgArr.length;
	}

	//#endregion
}
