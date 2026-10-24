import { ImgHub } from "../manager/imgHub.class.js";
import { CollectableObject } from "./collectable-object.class.js";

/**
 * Represents a collectible acorn object in the game.
 * Extends CollectableObject and defines specific behavior and positioning for acorn collectibles.
 */
export class CollectableAcorn extends CollectableObject {
    //#region properties
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
    static availableAcorns = 0;
    //#endregion

    /**
     * Creates a new CollectableAcorn instance positioned randomly within a defined gap.
     * Increases the global acorn counter and updates the x-position for next instance.
     */
    constructor() {
        super(CollectableAcorn.xPos + Math.random() * CollectableAcorn.gap, 390, 30, 30, ImgHub.ACORN.ON_GROUND);
        CollectableAcorn.xPos += CollectableAcorn.gap;
        CollectableAcorn.availableAcorns++;
    }
}
