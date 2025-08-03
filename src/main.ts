import Phaser from "phaser";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { MapScene } from "./scenes/MapScene";
import { InputState } from "./scenes/InputState";

const gameConfig = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    scene: [
        MainMenuScene,
        MapScene,
        InputState,
    ]
}

const game = new Phaser.Game(gameConfig);