/**
 * Represents a drawable object that can be rendered on a canvas.
 * Provides basic image handling, caching, and drawing functionality.
 */
export class DrawableObject {
	//#region properties
	x;
	y;
	img;
	height;
	width;
	imgCache = {};
	currentImg = 0;
	visible = true;
	//#endregion

	/**
	 * Creates a new DrawableObject instance.
	 * @param {number} x_ - X position of the object.
	 * @param {number} y_ - Y position of the object.
	 * @param {number} height_ - Height of the object.
	 * @param {number} width_ - Width of the object.
	 */
	constructor(x_, y_, height_, width_) {
		this.x = x_;
		this.y = y_;
		this.height = height_;
		this.width = width_;
	}

	//#region methods

	/**
	 * Loads a single image and assigns it as the current image of the object.
	 * @param {string} path - Path to the image file.
	 */
	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	/**
	 * Loads multiple images and stores them in an internal cache for later use.
	 * @param {string[]} arr - Array of image paths to load.
	 */
	loadImages(arr) {
		arr.forEach((path) => {
			const img = new Image();
			img.src = path;
			this.imgCache[path] = img;
		});
	}

	/**
	 * Draws the object onto a canvas rendering context.
	 * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
	 */
	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	//#endregion
}
