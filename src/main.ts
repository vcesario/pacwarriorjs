import Phaser from "phaser";
import { MainMenuScene } from "./scenes/MainMenuScene";

const gameConfig = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    scene: [ MainMenuScene ]
}

const game = new Phaser.Game(gameConfig);