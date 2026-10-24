import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { Ref } from "../manager/ref.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Endboss } from "./endboss.class.js";
import { Entity } from "./entity.class.js";
import { GameState } from "./game-state.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

/**
 * Represents the main playable character in the game.
 * Handles movement, animation states and interactions with the other Entities.
 */
export class Character extends Entity {
    //#region properties
    animationJump = ImgHub.PEPE.JUMP;
    animationIdle = ImgHub.PEPE.IDLE;
    animationSleep = ImgHub.PEPE.SLEEPING;
    animationHurt = ImgHub.PEPE.HURT;

    offset = {
        top: 90,
        right: 70,
        bottom: 40,
        left: 70,
    };

    idleCounter = 0;
    groundY = 460 - this.height;
    //#endregion

    /**
     * Creates a new Character instance and initializes animations and game loops.
     */
    constructor() {
        super(120, 160, 242, 180, 10, 100, 10, ImgHub.PEPE.WALK, ImgHub.PEPE.DEAD);

        this.loadImages(this.animationJump);
        this.loadImages(this.animationHurt);
        this.loadImages(this.animationIdle);
        this.loadImages(this.animationSleep);

        IntervalHub.startInterval(this.movement, 1000 / 25);
        IntervalHub.startInterval(this.animate, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.resetValues, 1000 / 60);
    }

    //#region methods

    /**
     * Handles character movement, jumping, and camera updates based on keyboard input.
     */
    movement = () => {
        if (Keyboard.RIGHT && this.x < Level.END_X && this.endbossNotPassed() && !this.isDead() && !Level.endboss.isDead()) {
            this.moveRight();
            this.otherDirection = false;
        }

        if (Keyboard.LEFT && this.x > 50 && !this.isDead() && !Level.endboss.isDead()) {
            this.moveLeft();
            this.otherDirection = true;
        }

        if (Keyboard.UP && !this.isAboveGround()) {
            this.jump();
            AudioHub.playOne(AudioHub.CHARACTER.JUMP);
        }

        World.CAMERA_X = -this.x + 100;
    };

    /**
     * Determines whether the character has not passed the endboss position.
     * @returns {boolean} True if the endboss has not been passed.
     */
    endbossNotPassed() {
        return Level.endboss.rX > this.rX + this.rW;
    }

    /**
     * Handles animation state transitions including dead, hurt, jump, walk, idle, and sleep states.
     */
    animate = () => {
        if (this.isDead()) {
            if (!this.deadAnimationStop(800)) {
                this.playAnimation("dead", this.animationDead, 7);
                if (!AudioHub.CHARACTER.DEAD.isPlaying) {
                    AudioHub.playOne(AudioHub.CHARACTER.DEAD);
                }
            } else {
                IntervalHub.stopAllIntervals();
                GameState.LOST = true;
                GameState.showOutro();
            }
        } else if (this.isHurt()) {
            this.playAnimation("hurt", this.animationHurt, 14);
            if (!AudioHub.CHARACTER.DAMAGE.isPlaying) {
                AudioHub.playOne(AudioHub.CHARACTER.DAMAGE);
            }
        } else if (this.isAboveGround()) {
            this.playAnimation("jump", this.animationJump, 10);
        } else if ((Keyboard.RIGHT || Keyboard.LEFT) && !Level.endboss.isDead()) {
            this.playAnimation("walk", this.animationWalk, 14);
            if (!AudioHub.CHARACTER.RUN.isPlaying) {
                AudioHub.playOne(AudioHub.CHARACTER.RUN);
            }
        } else if (this.sleepTime() && !this.idleCounter == 0) {
            this.playAnimation("sleep", this.animationSleep, 10);
            if (!AudioHub.CHARACTER.SNORING.isPlaying) {
                AudioHub.playOne(AudioHub.CHARACTER.SNORING);
            }
        } else {
            this.playAnimation("idle", this.animationIdle, 10);
            if (this.idleCounter == 0) {
                this.startIdleCounter();
            }
        }
    };

    /**
     * Resets temporary states such as idle time and sound effects depending on movement and conditions.
     */
    resetValues = () => {
        if (this.isAboveGround() || Keyboard.LEFT || Keyboard.RIGHT || Keyboard.D || this.isHurt()) {
            this.resetIdleCounter();
            AudioHub.stopOne(AudioHub.CHARACTER.SNORING);
        }

        if (Level.END_X - this.x < 200 && !Endboss.startWalking) {
            Endboss.isAlert = true;
        }

        if (!this.isHurt()) {
            AudioHub.stopOne(AudioHub.CHARACTER.DAMAGE);
        }

        if ((!Keyboard.LEFT && !Keyboard.RIGHT) || this.isHurt() || this.isDead() || this.isAboveGround()) {
            AudioHub.stopOne(AudioHub.CHARACTER.RUN);
        }
    };

    /**
     * Checks whether the character is currently moving downward.
     * @returns {boolean} True if falling.
     */
    jumpsDown() {
        return this.speedY < 0;
    }

    /**
     * Makes the character jump by setting vertical speed.
     */
    jump() {
        this.speedY = 25;
    }

    //#region methods idle/sleep

    /**
     * Checks whether the character has been idle for more than 8 seconds.
     * @returns {boolean} True if idle time exceeds threshold.
     */
    sleepTime() {
        let timePassed = new Date().getTime() - this.idleCounter;
        timePassed = timePassed / 1000;
        return timePassed > 8;
    }

    /**
     * Starts the idle timer.
     */
    startIdleCounter() {
        this.idleCounter = new Date().getTime();
    }

    /**
     * Resets the idle timer.
     */
    resetIdleCounter() {
        this.idleCounter = 0;
    }

    //#endregion

    //#endregion
}
