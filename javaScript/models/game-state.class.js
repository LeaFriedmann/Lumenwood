import { world } from "../game.js";
import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { Ref } from "../manager/ref.class.js";
import { Render } from "../manager/render.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Cloud } from "./cloud.class.js";
import { Firefly } from "./firefly.class.js";
import { CollectableAcorn } from "./collectable-acorn.class.js";
import { CollectableObject } from "./collectable-object.class.js";
import { DrawableObject } from "./drawable-objects.class.js";
import { Endboss } from "./endboss.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

/**
 * Manages global game state such as start screen, win/lose conditions, and level transitions.
 */
export class GameState extends DrawableObject {
	//#region properties

	static WON = false;
	static LOST = false;
	static GAME_ONGOING = false;
	static outro;
	static startscreen = true;

	//#endregion

	/**
	 * Creates a GameState drawable object.
	 * @param {number} x_ - X position.
	 * @param {number} y_ - Y position.
	 * @param {number} height_ - Height of the image.
	 * @param {number} width_ - Width of the image.
	 * @param {string} img_ - Image source.
	 */
	constructor(x_, y_, height_, width_, img_) {
		super(x_, y_, height_, width_);
		this.loadImage(img_);
	}

	//#region methods

	/**
	 * Creates the "win" outro screen.
	 * @returns {GameState} Win screen instance.
	 */
	static wonOutro() {
		return new GameState(206, 90, 300, 308, ImgHub.RESULT.W0N[0]);
	}

	/**
	 * Creates the "lost" outro screen.
	 * @returns {GameState} Lost screen instance.
	 */
	static lostOutro() {
		return new GameState(206, 131, 218, 308, ImgHub.RESULT.LOST[0]);
	}

	/**
	 * Resets all global game values after a match ends.
	 */
	static gameReset() {
		BackgroundObject.xPos = -719;
		BackgroundObject.turn = 0;

		GameState.WON = false;
		GameState.LOST = false;

		Cloud.xPos = 0;

		Firefly.collected = 0;
		CollectableAcorn.collected = 0;

		Firefly.gap = 0;
		CollectableAcorn.gap = 0;

		Firefly.xPos = 300;
		CollectableAcorn.xPos = 300;

		Endboss.isAlert = false;
		Endboss.startWalking = false;
		Endboss.attack = false;

		GameState.outro = "";

		Level.enemies = [];
		Level.endboss = "";
		Level.ThrowableObjects = [];

		CollectableObject.arrAll = [];
		CollectableAcorn.availableAcorns = 0;

		World.CAMERA_X = 0;

		world.splice(0);
	}

	/**
	 * Displays the outro screen depending on win or loss state.
	 * Also updates UI elements and stops audio.
	 */
	static showOutro() {
		if (GameState.WON) {
			GameState.outro = GameState.wonOutro();
			AudioHub.playOne(AudioHub.VICTORY);
			Ref.showElement(Ref.btnNextLvl);
		} else if (GameState.LOST) {
			GameState.outro = GameState.lostOutro();
			AudioHub.playOne(AudioHub.DEFEAT);
			Ref.hideElement(Ref.btnNextLvl);
		}

		Ref.hideMobileBtn();
		Ref.showBtns();
		Ref.btnVisible(Ref.btnInfo);

		GameState.GAME_ONGOING = false;

		AudioHub.stopAll();
	}

	/**
	 * Advances to the next level.
	 */
	static nextLvl() {
		Level.currentLevel++;
		Level.setLevelLocalStorage();
	}

	/**
	 * Starts a new level and initializes the game world.
	 */
	static startLevel() {
		GameState.startscreen = false;

		GameState.gameReset();

		Ref.btnInvisible(Ref.btnInfo);

		setTimeout(() => {
			AudioHub.playOne(AudioHub.BACKGROUND_MUSIC);
		}, 1000);

		world.push(new World(Ref.canvas, new Level()));

		Render.currentLvl();

		GameState.GAME_ONGOING = true;
	}

	//#endregion
}
