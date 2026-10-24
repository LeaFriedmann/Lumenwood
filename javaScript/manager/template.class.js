/**
 * Provides reusable HTML template snippets for UI components.
 */
export class Template {
	/**
	 * Returns the HTML markup for the mute button icon.
	 * @returns {string} HTML string containing the mute button image.
	 */
	static btnMute() {
		return /*html*/ `
            <img src="./img/icons/mute.png" alt="mute button">
        `;
	}

	/**
	 * Returns the HTML markup for the sound button icon.
	 * @returns {string} HTML string containing the sound button image.
	 */
	static soundBtn() {
		return /*html*/ `
            <img src="./img/icons/sound.png" alt="sound button">
        `;
	}
}
