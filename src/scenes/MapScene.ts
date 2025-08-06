import { InputActions, InputPhases, InputState } from "./InputState";

export class MapScene extends Phaser.Scene {

    player: Phaser.GameObjects.Rectangle;

    inputState: InputState;

    moveAxis: Phaser.Math.Vector2;
    playerVelocity: Phaser.Math.Vector2;
    playerSpeed: number;

    constructor() {
        super("MapScene");
    }

    preload() {
        // this.scene.launch("InputState");
        this.inputState = this.scene.get("InputState") as InputState;
    }

    create() {
        this.player = this.add.rectangle(0, 0, 16, 16, 0xFF0000);
        this.moveAxis = new Phaser.Math.Vector2(0, 0);
        this.playerVelocity = new Phaser.Math.Vector2(0, 0);
        this.playerSpeed = 1.5;
        this.inputState.addListener(this.onActionsUpdated);
    }

    update() {
        let pos = this.player.getCenter();
        this.player.setPosition(pos.x + this.playerVelocity.x, pos.y + this.playerVelocity.y);
    }

    private onActionsUpdated = (action: InputActions, phase: InputPhases) => {
        let moved = false;

        if (action == InputActions.MoveDown) {
            if (phase == InputPhases.Started) {
                this.moveAxis.y += 1;
            }
            else {
                this.moveAxis.y -= 1;
            }
            moved = true;
        }
        else if (action == InputActions.MoveUp) {
            if (phase == InputPhases.Started) {
                this.moveAxis.y -= 1;
            }
            else {
                this.moveAxis.y += 1;
            }
            moved = true;
        }
        else if (action == InputActions.MoveLeft) {
            if (phase == InputPhases.Started) {
                this.moveAxis.x -= 1;
            }
            else {
                this.moveAxis.x += 1;
            }
            moved = true;
        }
        else if (action == InputActions.MoveRight) {
            if (phase == InputPhases.Started) {
                this.moveAxis.x += 1;
            }
            else {
                this.moveAxis.x -= 1;
            }
            moved = true;
        }

        if (moved) {
            this.playerVelocity = this.moveAxis.clone();
            this.playerVelocity.normalize();
            this.playerVelocity.scale(this.playerSpeed);
        }
    }

}