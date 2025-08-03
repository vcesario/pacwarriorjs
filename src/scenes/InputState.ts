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