import { ImgHub } from "../manager/imgHub.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Coin } from "./coin.class.js";
import { CollectableBottle } from "./collectable-bottle.class.js";
import { CollectableObject } from "./collectable-object.class.js";
import { Endboss } from "./endboss.class.js";
import { NormalChicken } from "./normal-chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";

/**
 * Represents a game level configuration including enemies, collectibles, and environment objects.
 */
export class Level {
    //#region properties

    /**
     * Configuration values that define level difficulty and spawn behavior.
     */
    levelConfig = {
        repetition: {
            chicken: 0,
            smallChicken: 0,
            background: 0,
            clouds: 0,
            coins: 10,
            collectableBottle: 10,
        },
        health: {
            chicken: 0,
            character: 0,
        },
        speed: {
            chicken: 0,
            smallChicken: 0,
            endboss: 0,
        },
        healthReduction: {
            endboss: 0,
        },
    };

    clouds = [];
    backgroundObjects = [];

    static enemies = [];
    static endboss;
    static END_X;
    static ThrowableObjects = [];
    static currentLevel = 1;

    //#endregion

    /**
     * Creates a Level instance and initializes all level objects.
     * @param {number} levelNumber_ - The number of the level to generate.
     */
    constructor() {
        Level.getLevelLocalStorage();
        this.setLevelConfig();
        this.getLevelEnd();
        this.addBackground();
        this.addClouds();
        this.addEnemies();
        this.addCollectables();
    }

    //#region methods

    //#region level config

    /**
     * Initializes configuration values based on the current level number.
     */
    setLevelConfig() {

        this.levelConfig.repetition.chicken = Level.currentLevel + 4;
        this.levelConfig.repetition.smallChicken = Level.currentLevel + 5;
        this.levelConfig.repetition.background = this.getBackgrRepeat(Level.currentLevel);
        this.levelConfig.repetition.clouds = 6;

        this.levelConfig.health.chicken = 20;
        this.levelConfig.health.character = Level.currentLevel + 100;

        this.levelConfig.speed.chicken = Level.currentLevel / 10 + Math.random() * Level.currentLevel;
        this.levelConfig.speed.smallChicken = Level.currentLevel / 5 + Math.random() * Level.currentLevel;
        this.levelConfig.speed.endboss = this.speedEndboss();

        this.levelConfig.healthReduction.endboss = this.healthReductEndboss(Level.currentLevel);
        
    }

    /**
     * Determines how often background tiles should repeat based on level number.
     * @param {number} levelNr - Level number.
     * @returns {number} Number of background repetitions.
     */
    getBackgrRepeat(levelNr) {
        if (levelNr < 6) {
            return 4;
        }
        if (levelNr < 11) {
            return 6;
        }
        if (levelNr < 16) {
            return 8;
        }
        if (levelNr < 21) {
            return 10;
        } else {
            return 12;
        }
    }

    /**
     * Determines how much health reduction the endboss receives.
     * @param {number} levelNr - Level number.
     * @returns {number} Health reduction value.
     */
    healthReductEndboss(levelNr) {
        if (levelNr < 6) {
            return 20;
        } else {
            return 10;
        }
    }

    /**
     * Calculates the movement speed of the endboss, capped at a maximum value.
     * @returns {number} Endboss speed.
     */
    speedEndboss() {
        const calculated = Level.currentLevel / 10 + Math.random() * Level.currentLevel;

        if (calculated < 10) {
            return calculated;
        } else {
            return 10;
        }
    }

    /**
     * Calculates the maximum X position of the level.
     */
    getLevelEnd() {
        Level.END_X = this.levelConfig.repetition.background * 719 - 719 - 650;
    }

    //#endregion

    //#region local storage
    static setLevelLocalStorage(){
        localStorage.setItem('Level', Level.currentLevel);
    }

    static getLevelLocalStorage(){
        const localLevel = Number(localStorage.getItem('Level'));

        if (localLevel && localLevel != null) {
            Level.currentLevel = localLevel;
        }
    }
    //#endregion

    //#region spawn objects

    /**
     * Creates and adds all background parts for the level.
     */
    addBackground() {
        for (let index = 0; index < this.levelConfig.repetition.background; index++) {
            if (index < ImgHub.BACKGROUND.START.length) {
                this.backgroundObjects.push(this.addBackgrPart(ImgHub.BACKGROUND.START[index]));
            } else {
                this.backgroundObjects.push(
                    this.addBackgrPart(
                        ImgHub.BACKGROUND.EXTENSION[
                            index - ImgHub.BACKGROUND.START.length - ImgHub.BACKGROUND.EXTENSION.length * BackgroundObject.EXTENSION_TURN
                        ],
                    ),
                );
            }
        }
    }

    /**
     * Creates a background object for a specific background part.
     * @param {string} part - Background part identifier.
     * @returns {BackgroundObject} Background object instance.
     */
    addBackgrPart(part) {
        return new BackgroundObject(part);
    }

    /**
     * Creates and adds all enemy objects including chickens and the endboss.
     */
    addEnemies() {
        for (let i = 0; i < this.levelConfig.repetition.smallChicken; i++) {
            Level.enemies.push(this.createSmallChicken());
            // console.log(i);
            
        }
        
        for (let i = 0; i < this.levelConfig.repetition.chicken; i++) {
            Level.enemies.push(this.createChicken());
            // console.log(i);
            
        }

        const endboss = new Endboss(Level.END_X, this.levelConfig.speed.endboss, this.levelConfig.healthReduction.endboss);

        Level.endboss = endboss;
        Level.enemies.push(endboss);
        // console.log(Level.enemies.length);
        
    }

    /**
     * Creates a normal chicken enemy instance.
     * @returns {NormalChicken} Chicken instance.
     */
    createChicken() {
        return new NormalChicken(300 + Math.random() * Level.END_X, this.levelConfig.speed.chicken);
    }

    /**
     * Creates a small chicken enemy instance.
     * @returns {SmallChicken} Small chicken instance.
     */
    createSmallChicken() {
        return new SmallChicken(300 + Math.random() * Level.END_X, this.levelConfig.speed.smallChicken);
    }

    /**
     * Creates and adds all cloud objects.
     */
    addClouds() {
        for (let i = 0; i < this.levelConfig.repetition.clouds; i++) {
            this.clouds.push(this.createCloud());
        }
    }

    /**
     * Creates a cloud instance.
     * @returns {Cloud} Cloud instance.
     */
    createCloud() {
        return new Cloud();
    }

    /**
     * Creates and adds all coin and bottle collectibles.
     */
    addCollectables() {
        this.addCoins();
        this.addBottles();
    }

    /**
     * Creates and distributes coin collectibles across the level.
     */
    addCoins() {
        Coin.gap = (Level.END_X - 400) / this.levelConfig.repetition.coins;

        for (let index = 0; index < this.levelConfig.repetition.coins; index++) {
            CollectableObject.arrAll.push(this.coin());
        }
    }

    /**
     * Creates and distributes bottle collectibles across the level.
     */
    addBottles() {
        CollectableBottle.gap = (Level.END_X - 400) / this.levelConfig.repetition.collectableBottle;

        for (let index = 0; index < this.levelConfig.repetition.collectableBottle; index++) {
            CollectableObject.arrAll.push(this.bottle());
        }
    }

    /**
     * Respawns bottles after all are used.
     */
    static bottleRespawn() {
        CollectableBottle.gap = (Level.END_X - 400) / 10;

        for (let index = 0; index < 10; index++) {
            CollectableObject.arrAll.push(new CollectableBottle());
        }
    }

    /**
     * Creates a bottle collectible.
     * @returns {CollectableBottle} Bottle instance.
     */
    bottle() {
        return new CollectableBottle();
    }

    /**
     * Creates a coin collectible.
     * @returns {Coin} Coin instance.
     */
    coin() {
        return new Coin();
    }

    //#endregion
    //#endregion
}
