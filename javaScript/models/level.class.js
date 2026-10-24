import { ImgHub } from "../manager/imgHub.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Cloud } from "./cloud.class.js";
import { Firefly } from "./firefly.class.js";
import { CollectableAcorn } from "./collectable-acorn.class.js";
import { CollectableObject } from "./collectable-object.class.js";
import { Endboss } from "./endboss.class.js";
import { NormalMushroom } from "./normal-mushroom.class.js";
import { SmallMushroom } from "./small-mushroom.class.js";

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
			mushroom: 0,
			smallMushroom: 0,
			background: 0,
			clouds: 0,
			fireflys: 10,
			collectableAcorn: 10,
		},
		health: {
			mushroom: 0,
			character: 0,
		},
		speed: {
			mushroom: 0,
			smallMushroom: 0,
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
		this.levelConfig.repetition.mushroom = Level.currentLevel + 4;
		this.levelConfig.repetition.smallMushroom = Level.currentLevel + 5;
		this.levelConfig.repetition.background = this.getBackgrRepeat(Level.currentLevel);
		this.levelConfig.repetition.clouds = 6;

		this.levelConfig.health.mushroom = 20;
		this.levelConfig.health.character = Level.currentLevel + 100;

		this.levelConfig.speed.mushroom = Level.currentLevel / 10 + Math.random() * Level.currentLevel;
		this.levelConfig.speed.smallMushroom = Level.currentLevel / 5 + Math.random() * Level.currentLevel;
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
	static setLevelLocalStorage() {
		localStorage.setItem("Level", Level.currentLevel);
	}

	static getLevelLocalStorage() {
		const localLevel = Number(localStorage.getItem("Level"));

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
	 * Creates and adds all enemy objects including mushrooms and the endboss.
	 */
	addEnemies() {
		for (let i = 0; i < this.levelConfig.repetition.smallMushroom; i++) {
			Level.enemies.push(this.createSmallMushroom());
		}

		for (let i = 0; i < this.levelConfig.repetition.mushroom; i++) {
			Level.enemies.push(this.createMushroom());
		}

		const endboss = new Endboss(Level.END_X, this.levelConfig.speed.endboss, this.levelConfig.healthReduction.endboss);

		Level.endboss = endboss;
		Level.enemies.push(endboss);
	}

	/**
	 * Creates a normal mushroom enemy instance.
	 * @returns {NormalMushroom} Mushroom instance.
	 */
	createMushroom() {
		return new NormalMushroom(300 + Math.random() * Level.END_X, this.levelConfig.speed.mushroom);
	}

	/**
	 * Creates a small mushroom enemy instance.
	 * @returns {SmallMushroom} Small mushroom instance.
	 */
	createSmallMushroom() {
		return new SmallMushroom(300 + Math.random() * Level.END_X, this.levelConfig.speed.smallMushroom);
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
	 * Creates and adds all firefly and acorn collectibles.
	 */
	addCollectables() {
		this.addFireflys();
		this.addAcorns();
	}

	/**
	 * Creates and distributes firefly collectibles across the level.
	 */
	addFireflys() {
		Firefly.gap = (Level.END_X - 400) / this.levelConfig.repetition.fireflys;

		for (let index = 0; index < this.levelConfig.repetition.fireflys; index++) {
			CollectableObject.arrAll.push(this.firefly());
		}
	}

	/**
	 * Creates and distributes acorn collectibles across the level.
	 */
	addAcorns() {
		CollectableAcorn.gap = (Level.END_X - 400) / this.levelConfig.repetition.collectableAcorn;

		for (let index = 0; index < this.levelConfig.repetition.collectableAcorn; index++) {
			CollectableObject.arrAll.push(this.acorn());
		}
	}

	/**
	 * Respawns acorns after all are used.
	 */
	static acornRespawn() {
		CollectableAcorn.gap = (Level.END_X - 400) / 10;

		for (let index = 0; index < 10; index++) {
			CollectableObject.arrAll.push(new CollectableAcorn());
		}
	}

	/**
	 * Creates a acorn collectible.
	 * @returns {CollectableAcorn} Acorn instance.
	 */
	acorn() {
		return new CollectableAcorn();
	}

	/**
	 * Creates a firefly collectible.
	 * @returns {Firefly} Firefly instance.
	 */
	firefly() {
		return new Firefly();
	}

	//#endregion
	//#endregion
}
