/**
 * Central reference and UI utility class.
 *
 * Provides static access to frequently used DOM elements
 * and helper methods for toggling their visibility and state.
 */
export class Ref {
	//#region properties
	static header = document.getElementById("header");
	static canvas = document.getElementById("canvas");
	static rotateMsg = document.getElementById("rotateMessage");
	static wrprCanvas = document.getElementById("wrprCanvas");
	static levelInfo = document.getElementById("level");
	static btnInfo = document.getElementById("btnInfo");
	static btnMute = document.getElementById("btnMute");
	static impressum = document.getElementById("sectImpressum");
	static btnStart = document.getElementById("btnStartGame");
	static btnHome = document.getElementById("btnHome");
	static btnRestart = document.getElementById("btnRestart");
	static btnNextLvl = document.getElementById("btnNextLvl");
	static wrprBtns = document.getElementById("btnsPostGame");

	static mobileBtns = document.getElementById("mobileBtns");
	static btnLeftMobile = document.getElementById("btnLeft");
	static btnRightMobile = document.getElementById("btnRight");
	static btnJumpMobile = document.getElementById("btnJump");
	static btnThrowMobile = document.getElementById("btnThrow");

	static infoDialog = document.getElementById("gameInfo");
	static btnClose = document.getElementById("btnClose");
	static infoKeys = document.getElementById("infoControls");

	//#endregion

	//#region methods

	/**
	 * Adds the "invisible" CSS class to the given element.
	 * @param {HTMLElement} refElement - The element to hide visually without affecting layout.
	 */
	static btnInvisible(refElement) {
		refElement.classList.add("invisible");
	}

	/**
	 * Removes the "invisible" CSS class from the given element.
	 * @param {HTMLElement} refElement - The element to make visible.
	 */
	static btnVisible(refElement) {
		refElement.classList.remove("invisible");
	}

	/**
	 * Adds the "hide" CSS class to the given element.
	 * @param {HTMLElement} refElement - The element to hide from layout flow.
	 */
	static hideElement(refElement) {
		refElement.classList.add("hide");
	}

	/**
	 * Removes the "hide" CSS class from the given element.
	 * @param {HTMLElement} refElement - The element to show.
	 */
	static showElement(refElement) {
		refElement.classList.remove("hide");
	}

	/**
	 * Hides the post-game buttons.
	 */
	static hideBtns() {
		Ref.hideElement(Ref.wrprBtns);
	}

	/**
	 * Shows the post-game buttons.
	 */
	static showBtns() {
		Ref.showElement(Ref.wrprBtns);
	}

	/**
	 * Hides the mobile control buttons.
	 */
	static hideMobileBtn() {
		Ref.hideElement(Ref.mobileBtns);
	}

	/**
	 * Shows the mobile control buttons.
	 */
	static showMobileBtn() {
		Ref.showElement(Ref.mobileBtns);
	}

	/**
	 * Hides the impressum button.
	 */
	static hideImpressum() {
		Ref.hideElement(Ref.impressum);
	}

	/**
	 * Shows the impressum button.
	 */
	static showImpressum() {
		Ref.showElement(Ref.impressum);
	}

	//#endregion
}
