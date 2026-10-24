import { Level } from "../models/level.class.js";
import { AudioHub } from "./audio-hub.clas.js";
import { Ref } from "./ref.class.js";
import { Template } from "./template.class.js";

/**
 * Handles rendering updates for UI components.
 */
export class Render {
	/**
	 * Updates the mute/unmute button UI based on the current audio state.
	 */
	static btnSound() {
		if (AudioHub.SOUND_ON) {
			Ref.btnMute.innerHTML = "";
			Ref.btnMute.innerHTML = Template.soundBtn();
		} else {
			Ref.btnMute.innerHTML = "";
			Ref.btnMute.innerHTML = Template.btnMute();
		}
	}

	/**
	 * Updates the displayed current level information in the UI.
	 * Sets the text content of the level info element to the current level.
	 */
	static currentLvl() {
		Ref.levelInfo.innerText = "";
		Ref.levelInfo.innerText = "Level: " + Level.currentLevel;
	}

	static styleSoundBtn() {
		!AudioHub.SOUND_ON ? Ref.btnMute.classList.remove("soundOn") : Ref.btnMute.classList.remove("soundMuted");
		!AudioHub.SOUND_ON ? Ref.btnMute.classList.add("soundMuted") : Ref.btnMute.classList.add("soundOn");
	}
}
