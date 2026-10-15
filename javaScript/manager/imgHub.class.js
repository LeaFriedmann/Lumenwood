/**
 * Provides a centralized registry of all image asset paths used in the game.
 */
export class ImgHub {
    static PEPE = {
        IDLE: [
            "./img/character-fox/idle/idle 1.png",
            "./img/character-fox/idle/idle 2.png",
            "./img/character-fox/idle/idle 3.png",
            "./img/character-fox/idle/idle 4.png",
            "./img/character-fox/idle/idle 5.png",
            "./img/character-fox/idle/idle 6.png",
            "./img/character-fox/idle/idle 7.png",
            "./img/character-fox/idle/idle 8.png",
            "./img/character-fox/idle/idle 9.png",
            "./img/character-fox/idle/idle 10.png",
        ],
        SLEEPING: [
            "./img/character-fox/sleep/sleep 1.png",
            "./img/character-fox/sleep/sleep 2.png",
            "./img/character-fox/sleep/sleep 3.png",
            "./img/character-fox/sleep/sleep 4.png",
            "./img/character-fox/sleep/sleep 5.png",
            "./img/character-fox/sleep/sleep 6.png",
            "./img/character-fox/sleep/sleep 7.png",
            "./img/character-fox/sleep/sleep 8.png",
            "./img/character-fox/sleep/sleep 9.png",
            "./img/character-fox/sleep/sleep 10.png",
        ],
        WALK: [
            "./img/character-fox/walk/Run 1.png",
            "./img/character-fox/walk/Run 2.png",
            "./img/character-fox/walk/Run 3.png",
            "./img/character-fox/walk/Run 4.png",
            "./img/character-fox/walk/Run 5.png",
            "./img/character-fox/walk/Run 6.png",
            "./img/character-fox/walk/Run 7.png",
            "./img/character-fox/walk/Run 8.png",
            "./img/character-fox/walk/Run 9.png",
            "./img/character-fox/walk/Run 10.png",
            "./img/character-fox/walk/Run 11.png",
            "./img/character-fox/walk/Run 12.png",
            "./img/character-fox/walk/Run 13.png",
            "./img/character-fox/walk/Run 14.png",
            "./img/character-fox/walk/Run 15.png",
            "./img/character-fox/walk/Run 16.png",
        ],
        JUMP: [
            "./img/character-fox/jump/Jump 1.png",
            "./img/character-fox/jump/Jump 2.png",
            "./img/character-fox/jump/Jump 3.png",
            "./img/character-fox/jump/Jump 4.png",
            "./img/character-fox/jump/Jump 5.png",
            "./img/character-fox/jump/Jump 6.png",
            "./img/character-fox/jump/Jump 7.png",
            "./img/character-fox/jump/Jump 8.png",
            "./img/character-fox/jump/Jump 9.png",
        ],
        HURT: ["./img/character-fox/hurt/hurt 1.png", "./img/character-fox/hurt/hurt 2.png", "./img/character-fox/hurt/hurt 3.png"],
        DEAD: [
            "./img/character-fox/dead/dead 1.png",
            "./img/character-fox/dead/dead 2.png",
            "./img/character-fox/dead/dead 3.png",
            "./img/character-fox/dead/dead 4.png",
            "./img/character-fox/dead/dead 5.png",
            "./img/character-fox/dead/dead 6.png",
        ],
    };

    static ENEMIES = {
        CHICKEN_NORMAL: {
            WALK: [
                "./img/enemies_mushrooms/walk-2/mushroom-walk-1.png",
                "./img/enemies_mushrooms/walk-2/mushroom-walk-2.png",
            ],
            DEAD: ["./img/enemies_mushrooms/dead-2/dead 1.png", "./img/enemies_mushrooms/dead-2/dead 2.png", "./img/enemies_mushrooms/dead-2/dead 1.png", "./img/enemies_mushrooms/dead-2/dead 2.png", "./img/enemies_mushrooms/dead-2/dead 1.png", "./img/enemies_mushrooms/dead-2/dead 2.png"],
        },
        CHICKEN_SMALL: {
            WALK: [
                "./img/enemies_mushrooms/walk/mushroom-walk-1.png",
                "./img/enemies_mushrooms/walk/mushroom-walk-2.png",
            ],
            DEAD: ["./img/enemies_mushrooms/dead/dead 1.png", "./img/enemies_mushrooms/dead/dead 1.png", "./img/enemies_mushrooms/dead/dead 2.png", "./img/enemies_mushrooms/dead/dead 2.png", "./img/enemies_mushrooms/dead/dead 2.png", "./img/enemies_mushrooms/dead/dead 2.png"],
        },
        ENDBOSS: {
            WALK: [
                // "./img/endboss/walk/boss-walk-2.png",
                "./img/endboss/walk/boss-walk-3.png",
                "./img/endboss/walk/boss-walk-4.png",
                "./img/endboss/walk/boss-walk-5.png",
                "./img/endboss/walk/boss-walk-6.png",
                "./img/endboss/walk/boss-walk-7.png",
                "./img/endboss/walk/boss-walk-8.png"
            ],
            ALERT: [
                "./img/endboss/alert/boss-alert-1.png",
                "./img/endboss/alert/boss-alert-2.png",
                "./img/endboss/alert/boss-alert-3.png",
                "./img/endboss/alert/boss-alert-4.png",
                "./img/endboss/alert/boss-alert-5.png"
            ],
            ATTACK: [
                "./img/endboss/attack/boss-attack-1.png",
                "./img/endboss/attack/boss-attack-2.png",
                "./img/endboss/attack/boss-attack-3.png",
                "./img/endboss/attack/boss-attack-4.png",
                "./img/endboss/attack/boss-attack-5.png"
            ],
            HURT: [
                "./img/endboss/hurt/boss-hurt-1.png",
                "./img/endboss/hurt/boss-hurt-2.png",
                "./img/endboss/hurt/boss-hurt-3.png",
                "./img/endboss/hurt/boss-hurt-4.png",
                "./img/endboss/hurt/boss-hurt-5.png",
                "./img/endboss/hurt/boss-hurt-6.png",
                "./img/endboss/hurt/boss-hurt-7.png"
            ],
            DEAD: [
                "./img/endboss/dead/boss-dead-1.png",
                "./img/endboss/dead/boss-dead-2.png",
                "./img/endboss/dead/boss-dead-3.png",
                "./img/endboss/dead/boss-dead-4.png",
                "./img/endboss/dead/boss-dead-5.png",
                "./img/endboss/dead/boss-dead-6.png",
                "./img/endboss/dead/boss-dead-7.png"
            ],
        },
    };

    static BACKGROUND = {
        FIRST_LAYER: ["./img/5_background/layers/1_first_layer/1.png", "./img/5_background/layers/1_first_layer/2.png"],
        SECOND_LAYER: ["./img/5_background/layers/2_second_layer/1.png", "./img/5_background/layers/2_second_layer/2.png"],
        THIRD_LAYER: ["./img/5_background/layers/3_third_layer/1.png", "./img/5_background/layers/3_third_layer/2.png"],
        AIR: ["./img/5_background/layers/air.png"],
        CLOUDS: ["./img/5_background/layers/4_clouds/1.png", "./img/5_background/layers/4_clouds/2.png"],
        ALL_LAYERS: [
            "./img/5_background/layers/air.png",
            "./img/5_background/layers/3_third_layer/2.png",
            "./img/5_background/layers/2_second_layer/2.png",
            "./img/5_background/layers/1_first_layer/2.png",
            "./img/5_background/layers/air.png",
            "./img/5_background/layers/3_third_layer/1.png",
            "./img/5_background/layers/2_second_layer/1.png",
            "./img/5_background/layers/1_first_layer/1.png",
        ],
        START: [
            "./img/background/start/background-1.png",
            "./img/background/back-2.jpg",
            "./img/background/start/background-3.png",
            "./img/background/start/background-4.png",
            "./img/background/start/background-5.png",
            "./img/background/start/background-6.png",
            "./img/background/start/background-7.png",
            "./img/background/start/background-8.png",
        ],
        EXTENSION: [
            "./img/background/extension/backgr-extension-1.png",
            "./img/background/extension/backgr-extension-2.png",
            "./img/background/extension/backgr-extension-3.png",
            "./img/background/extension/backgr-extension-4.png",
            "./img/background/extension/backgr-extension-5.png",
            "./img/background/extension/backgr-extension-6.png",
        ],
    };

    static BOTTLE = {
        ROTATION: [
            "./img/acorn/rotation/rotate 1.png",
            "./img/acorn/rotation/rotate 2.png",
            "./img/acorn/rotation/rotate 3.png",
            "./img/acorn/rotation/rotate 4.png",
        ],
        SPLASH: [
            "./img/acorn/explosion/explode 1.png",
            "./img/acorn/explosion/explode 2.png",
            "./img/acorn/explosion/explode 3.png",
            "./img/acorn/explosion/explode 4.png",
            "./img/acorn/explosion/explode 5.png",
            "./img/acorn/explosion/explode 6.png",
        ],
        ON_GROUND: ["./img/acorn/acorn.png"],
        NORMAL: ["./img/6_salsa_bottle/salsa_bottle.png"],
    };

    static STATUSBAR = {
        COIN: [
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-00.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-10.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-20.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-30.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-40.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-50.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-60.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-70.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-80.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-90.png",
            "./img/7_statusbars/statusbar_firefly/statusbar-firefly-100.png",
        ],
        HEALTH: [
            "./img/7_statusbars/statusbar_fox/statusbar-fox-00.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-10.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-20.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-30.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-40.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-50.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-60.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-70.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-80.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-90.png",
            "./img/7_statusbars/statusbar_fox/statusbar-fox-100.png",
        ],
        BOTTLE: [
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-00.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-10.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-20.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-30.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-40.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-50.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-60.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-70.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-80.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-90.png",
            "./img/7_statusbars/statusbar_acorn/statusbar-acorn-100.png",
            
        ],
        ENEMY: [
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-00.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-10.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-20.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-30.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-40.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-50.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-60.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-70.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-80.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-90.png",
            "./img/7_statusbars/statusbar_endboss/statusbar-enboss-100.png",
        ],
    };

    static COIN = [
        "./img/firefly/firefly 1.png",
        "./img/firefly/firefly 2.png",
        "./img/firefly/firefly 3.png",
        "./img/firefly/firefly 4.png",
        "./img/firefly/firefly 5.png",
        "./img/firefly/firefly 6.png",
        "./img/firefly/firefly 7.png",
        "./img/firefly/firefly 8.png",
        "./img/firefly/firefly 9.png",
        "./img/firefly/firefly 10.png",
        "./img/firefly/firefly 11.png",
    ];

    static STARTSCREEN = ["./img/9_intro_outro_screens/start/startscreen_1.png"];

    static RESULT = {
        W0N: ["./img/You won, you lost/You Win A.png", "./img/You won, you lost/You win B.png"],
        LOST: ["./img/You won, you lost/Game over A.png", "./img/You won, you lost/You lost b.png"],
    };
}
