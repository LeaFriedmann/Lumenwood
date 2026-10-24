import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Coin } from "./coin.class.js";
import { CollectableBottle } from "./collectable-bottle.class.js";
import { CollectableObject } from "./collectable-object.class.js";
import { Endboss } from "./endboss.class.js";
import { Entity } from "./entity.class.js";
import { GameState } from "./game-state.class.js";
import { Level } from "./level.class.js";
import { NormalChicken } from "./normal-chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

/**
 * Represents the main game world.
 * Handles rendering, collision detection, game state updates,
 * collectible management, and throwable object interactions.
 */
export class World {
    //#region properties

    character = new Character();
    canvas;
    ctx;

    statusbarHealth = new StatusBar(30, 0, ImgHub.STATUSBAR.HEALTH, 100);
    statusbarEndboss;
    statusbarBottle = new StatusBar(30, 45, ImgHub.STATUSBAR.BOTTLE, 0);
    statusbarCoin = new StatusBar(30, 90, ImgHub.STATUSBAR.COIN, 0);

    static CAMERA_X = 0;
    static level;

    //#endregion

    /**
     * Creates a new game world instance.
     *
     * @param {HTMLCanvasElement} canvas - The canvas used for rendering.
     * @param {Level} level - The current game level.
     */
    constructor(canvas, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        World.level = level;

        this.draw();

        IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
        IntervalHub.startInterval(this.checkThrowObjects, 1000 / 25);
        IntervalHub.startInterval(this.startEnemyAudio, 1000 / 25)
    }

    //#region methods

    //#region methods collision

    /**
     * Executes all collision checks in the game world.
     */
    checkCollisions = () => {
        this.collisionTop();
        this.collisionCharacter();
        this.collisionBottle();
        this.checkCollecktables();
        this.startEnemyAudio();
    };

    /**
     * Checks collisions between throwable bottles and enemies.
     */
    collisionBottle() {
        Level.ThrowableObjects.forEach((bottle) => {
            this.collisionEnemies(bottle);
        });
    }

    /**
     * Checks whether a bottle collides with enemies and applies damage.
     *
     * @param {ThrowableObject} bottle - The thrown bottle object.
     */
    collisionEnemies(bottle) {
        Level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy)) {
                if (enemy instanceof Endboss && !Endboss.startWalking) {
                    return;
                }
                if (!bottle.isDead()) {
                    enemy.hit();
                    bottle.hit();

                    if (enemy instanceof Endboss) {
                        this.statusbarEndboss.setPercentage(enemy.energy);
                    }
                }
            }
        });
    }

    /**
     * Checks collisions between the character and enemies.
     * Applies damage to the character if necessary.
     */
    collisionCharacter() {
        Level.enemies.forEach((enemy) => {
            if (
                this.character.isColliding(enemy) &&
                !this.character.jumpsDown() &&
                !enemy.isDead() &&
                !this.character.isHurt() &&
                !Level.endboss.isDead()
            ) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);

                if (enemy instanceof Endboss) {
                    Endboss.attack = true;

                    setTimeout(() => {
                        Endboss.attack = false;
                    }, 1000);
                }
            }
        });
    }

    /**
     * Checks whether the character jumps onto enemies
     * and defeats them from above.
     */
    collisionTop() {
        Level.enemies.forEach((enemy) => {
            if (this.jumpOnEnemy(enemy)) {
                if (this.killableByJump(enemy)) {
                    enemy.hit();                    
                }
                if (this.notKillableByJump(enemy) && !this.character.isHurt()) {
                    this.character.hit();
                    this.character.jump();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            } 
        });
    }

    jumpOnEnemy(enemy){
        return this.character.isColliding(enemy) && this.character.jumpsDown();
    }

    /**
     * Determines whether an enemy can be defeated by jumping on it.
     *
     * @param {Entity} enemy - The enemy to check.
     * @returns {boolean} True if the enemy can be defeated by jumping.
     */
    killableByJump(enemy) {
        return enemy instanceof SmallChicken;
    }

    notKillableByJump(enemy){
        return enemy instanceof NormalChicken;
    }

    /**
     * Checks collisions between the character and collectable objects.
     * Updates counters and status bars accordingly.
     */
    checkCollecktables() {
        CollectableObject.arrAll.forEach((collectable) => {
            if (this.character.isColliding(collectable)) {
                if (collectable instanceof CollectableBottle) {
                    AudioHub.playOne(AudioHub.COLLECT.BOTTLE);

                    CollectableBottle.collected++;
                    collectable.removeCollectable();

                    this.statusbarBottle.setPercentage(CollectableBottle.collected * 10);
                } else {
                    AudioHub.playOne(AudioHub.COLLECT.COIN);

                    Coin.collected++;
                    collectable.removeCollectable();

                    this.statusbarCoin.setPercentage(Coin.collected * 10);
                }
            }
        });
    }

    //#endregion

    /**
     * Checks whether the player can throw a bottle
     * and creates a throwable object if possible.
     */
    checkThrowObjects = () => {
        if (Keyboard.D && this.bottleAvailable()) {
            if (this.character.otherDirection) {
                this.addThrowableObject("left");
            } else {
                this.addThrowableObject("right");
            }
            AudioHub.playOne(AudioHub.THROW);
            CollectableBottle.collected--;

            this.statusbarBottle.setPercentage(CollectableBottle.collected * 10);
        }
    };

    /**
     * Determines whether a throwable bottle is currently available.
     *
     * @returns {boolean} True if a bottle can be thrown.
     */
    bottleAvailable() {
        return Level.ThrowableObjects.length < 1 && CollectableBottle.collected > 0 && !Level.endboss.isDead();
    }

    /**
     * Creates and adds a new throwable object to the level.
     *
     * @param {"left"|"right"} direction - The throw direction.
     */
    addThrowableObject(direction) {
        Level.ThrowableObjects.push(new ThrowableObject(this.character.rX, this.character.rY, direction));
    }
    
    startEnemyAudio = () => {
        Level.enemies.forEach(enemy => {
            if (enemy.x - this.character.x < 600 && this.killableByJump(enemy)) {
                enemy.startAudio();
            }
        });
    }

    //#region methods draw

    /**
     * Renders the complete game world onto the canvas.
     * Continuously updates using requestAnimationFrame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(World.CAMERA_X, 0);

        this.addObjectsToMap(World.level.backgroundObjects);
        this.addObjectsToMap(World.level.clouds);

        if (GameState.GAME_ONGOING) {
            this.drawGameObjects();
        } else if (GameState.LOST || GameState.WON) {
            this.drawOutro();
        } else if (GameState.startscreen) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.ctx.translate(-World.CAMERA_X, 0);

        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws all active game objects while the game is running.
     */
    drawGameObjects() {
        if (!this.statusbarEndboss && Endboss.isAlert) {
            this.statusbarEndboss = new StatusBar(450, 0, ImgHub.STATUSBAR.ENEMY, 100);
        }

        this.ctx.translate(-World.CAMERA_X, 0);

        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);

        if (this.statusbarEndboss) {
            this.addToMap(this.statusbarEndboss);
        }

        this.ctx.translate(World.CAMERA_X, 0);

        // this.addToMap(Level.endboss);
        this.addToMap(this.character);
        this.addObjectsToMap(CollectableObject.arrAll);
        this.addObjectsToMap(Level.enemies);
        this.addObjectsToMap(Level.ThrowableObjects);
    }

    /**
     * Draws the outro or end screen.
     */
    drawOutro() {
        this.ctx.translate(-World.CAMERA_X, 0);

        this.addToMap(GameState.outro);

        this.ctx.translate(World.CAMERA_X, 0);
    }

    /**
     * Draws multiple objects onto the canvas.
     *
     * @param {Array<Entity>} objects - The objects to render.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single object onto the canvas.
     * Flips the image if the object changes direction.
     *
     * @param {Entity} mo - The drawable object.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // if (mo instanceof Entity) {
        //     mo.drawFrame(this.ctx);
        //     mo.drawRealFrame(this.ctx);
        // }

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an object horizontally before rendering.
     *
     * @param {Entity} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);

        mo.x = mo.x * -1;
    }

    /**
     * Restores the original orientation after rendering.
     *
     * @param {Entity} mo - The flipped object.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;

        this.ctx.restore();
    }

    //#endregion
    //#endregion
}
