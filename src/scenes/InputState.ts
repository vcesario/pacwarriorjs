export class InputState extends Phaser.Scene {

    actionMap: Record<InputActions, [InputPhases, Number]> = {
        [InputActions.MoveUp]: [InputPhases.Ended, 0],
        [InputActions.MoveDown]: [InputPhases.Ended, 0],
        [InputActions.MoveLeft]: [InputPhases.Ended, 0],
        [InputActions.MoveRight]: [InputPhases.Ended, 0],
        [InputActions.Confirm]: [InputPhases.Ended, 0]
    };

    listeners: ((action: InputActions, phase: InputPhases) => void)[] = [];

    constructor() {
        super("InputState");
    }

    create() {
        console.log("Scene InputState initialized.");

        for (let action of Object.values(InputActions)) {

            for (let phase of Object.values(InputPhases)) {

                this.actionMap[action] = [phase, 0];
            }
        }

        var keySpace = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySpace?.addListener("down", () => this.setActionStarted(InputActions.Confirm), this);
        keySpace?.addListener("up", () => this.setActionEnded(InputActions.Confirm), this);

        var keyS = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyS?.addListener("down", () => this.setActionStarted(InputActions.MoveDown), this);
        keyS?.addListener("up", () => this.setActionEnded(InputActions.MoveDown), this);
        var keyDown = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyDown?.addListener("down", () => this.setActionStarted(InputActions.MoveDown), this);
        keyDown?.addListener("up", () => this.setActionEnded(InputActions.MoveDown), this);

        var keyW = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyW?.addListener("down", () => this.setActionStarted(InputActions.MoveUp), this);
        keyW?.addListener("up", () => this.setActionEnded(InputActions.MoveUp), this);
        var keyUp = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyUp?.addListener("down", () => this.setActionStarted(InputActions.MoveUp), this);
        keyUp?.addListener("up", () => this.setActionEnded(InputActions.MoveUp), this);

        var keyA = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyA?.addListener("down", () => this.setActionStarted(InputActions.MoveLeft), this);
        keyA?.addListener("up", () => this.setActionEnded(InputActions.MoveLeft), this);
        var keyLeft = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyLeft?.addListener("down", () => this.setActionStarted(InputActions.MoveLeft), this);
        keyLeft?.addListener("up", () => this.setActionEnded(InputActions.MoveLeft), this);

        var keyD = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyD?.addListener("down", () => this.setActionStarted(InputActions.MoveRight), this);
        keyD?.addListener("up", () => this.setActionEnded(InputActions.MoveRight), this);
        var keyRight = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyRight?.addListener("down", () => this.setActionStarted(InputActions.MoveRight), this);
        keyRight?.addListener("up", () => this.setActionEnded(InputActions.MoveRight), this);
    }

    update() {

    }

    addListener(listener: (action: InputActions, phase: InputPhases) => void) {
        this.listeners.push(listener);
    }

    removeListener(listener: (action: InputActions, phase: InputPhases) => void) {
        let index = this.listeners.indexOf(listener);
        if (index == -1) {
            return;
        }
        this.listeners.splice(index, 1);
    }

    private setActionStarted(action: InputActions) {
        this.actionMap[action] = [InputPhases.Started, this.game.getFrame()];

        for (let listener of this.listeners) {
            listener(action, InputPhases.Started);
        }
    }

    private setActionEnded(action: InputActions) {
        this.actionMap[action] = [InputPhases.Ended, this.game.getFrame()];

        for (let listener of this.listeners) {
            listener(action, InputPhases.Ended);
        }
    }
}

export enum InputActions {
    MoveUp = "MoveUp",
    MoveDown = "MoveDown",
    MoveLeft = "MoveLeft",
    MoveRight = "MoveRight",
    Confirm = "Confirm",
}

export enum InputPhases {
    Started = "Started",
    Ended = "Ended",
}