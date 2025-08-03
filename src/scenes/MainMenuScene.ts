import { InputActions, InputPhases, InputState } from "./InputState";

export class MainMenuScene extends Phaser.Scene {

    gameTitle: Phaser.GameObjects.Text;
    gamePrompt: Phaser.GameObjects.Text;

    titlePosition = new Phaser.Math.Vector2();
    xSpeed = 1.5;

    inputState: InputState;

    constructor() {
        super("MainMenuScene");
    }

    preload() {
        this.scene.launch("InputState");
        this.inputState = this.scene.get("InputState") as InputState;
    }

    create() {
        this.gameTitle = this.add.text(0, 0, "pacwarriorJS");
        this.titlePosition.set((this.game.scale.width - this.gameTitle.displayWidth) / 2, (this.game.scale.height - this.gameTitle.displayHeight) / 2);

        this.gamePrompt = this.add.text(0, 0, "Press [ SPACE ] to start");
        this.gamePrompt.x = (this.game.scale.width - this.gamePrompt.displayWidth) / 2;
        this.gamePrompt.y = this.game.scale.height - this.gamePrompt.displayHeight - 10;

        this.inputState.addListener(this.onActionsUpdated);
    }

    update() {
        this.titlePosition.x += this.xSpeed;

        this.gameTitle.setPosition(this.titlePosition.x, this.titlePosition.y);

        if (this.gameTitle.getTopRight().x >= this.game.scale.width
            || this.gameTitle.getTopLeft().x < 0) {
            this.xSpeed *= -1;
        }
    }

    private onActionsUpdated = (action: InputActions, phase: InputPhases) => {
        if (action == InputActions.Confirm && phase == InputPhases.Started) {
            this.inputState.removeListener(this.onActionsUpdated);

            this.scene.start("MapScene");
        }
    }
}