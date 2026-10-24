import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { CollectableAcorn } from "./collectable-acorn.class.js";
import { Endboss } from "./endboss.class.js";
import { Entity } from "./entity.class.js";
import { GameState } from "./game-state.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

/**
 * Represents a throwable acorn object that can move, rotate,
 * splash on impact, and interact with the game world.
 */
export class ThrowableObject extends Entity {
    //#region properties
    offset = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    };

    speedY = 27;
    groundY = 450 - this.height;
    currentSplashImg = 0;
    throwDirection;
    audioPlayed;
    //#endregion

    /**
     * Creates a new throwable object instance.
     *
     * @param {number} x_ - Initial x position.
     * @param {number} y_ - Initial y position.
     * @param {"left"|"right"} direction_ - Direction in which the object is thrown.
     */
    constructor(x_, y_, direction_) {
        super(x_, y_, 70, 70, 10, 100, 100, ImgHub.ACORN.ROTATION, ImgHub.ACORN.EXPLOSION);

        this.throwDirection = direction_;

        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.movement, 25);
        IntervalHub.startInterval(this.animate, 1000 / 60);
    }

    //#region methods

    /**
     * Moves the object horizontally while it is airborne.
     * The movement direction depends on the throw direction.
     */
    movement = () => {
        if (this.inAir()) {
            if (this.throwDirection == "right") {
                this.moveRight();
            } else if (this.throwDirection == "left") {
                this.moveLeft();
            }
        }
    };

    /**
     * Plays the rotation animation while the object is in the air.
     * Switches to the splash animation once the object collides.
     */
    animate = () => {
        if (this.inAir()) {
            this.playAnimation("throw", this.animationWalk, 20);
        } else if (this.splashed()) {
            this.playSplashAnimation();
        }
    };

    /**
     * Checks whether the object is currently airborne.
     *
     * @returns {boolean} True if the object is above the ground and not destroyed.
     */
    inAir() {
        return this.isAboveGround() && !this.isDead();
    }

    /**
     * Checks whether the object has splashed.
     *
     * @returns {boolean} True if the object hit the ground or an enemy.
     */
    splashed() {
        return !this.isAboveGround() || this.isDead();
    }

    /**
     * Plays the splash animation once and removes the object afterward.
     * Also handles sound playback and acorn respawn logic.
     */
    playSplashAnimation() {
        if (!this.animationEnd(ImgHub.ACORN.EXPLOSION)) {
            this.playAnimation("splash", this.animationDead, 20);

            if (!this.audioPlayed) {
                AudioHub.playOne(AudioHub.ACORN_BREAK);

                CollectableAcorn.availableAcorns--;

                if (CollectableAcorn.availableAcorns == 0 && (!GameState.WON || !GameState.LOST)) {
                    CollectableAcorn.xPos = 300;
                    Level.acornRespawn();
                }

                this.audioPlayed = true;
            }
        } else {
            this.removeObj(Level.ThrowableObjects);
        }
    }

    //#endregion
}
