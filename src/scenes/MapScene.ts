export class MapScene extends Phaser.Scene {

    player: Phaser.GameObjects.Rectangle;

    constructor() {
        super("MapScene");
    }

    create() {
        this.player = this.add.rectangle(0, 0, 16, 16, 0xFF0000);

        let keyW = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyW?.addListener("down", this.onActionMoveUpStarted, this);
        let keyA = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyA?.addListener("down", this.onActionMoveLeftStarted, this);
        let keyS = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyS?.addListener("down", this.onActionMoveDownStarted, this);
        let keyD = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyD?.addListener("down", this.onActionMoveRightStarted, this);
    }

    update() {

    }

    onActionMoveUpStarted() {
        this.player.y -= 5;
    }
    
    onActionMoveDownStarted() {
        this.player.y += 5;
    }

    onActionMoveLeftStarted() {
        this.player.x -= 5;
    }

    onActionMoveRightStarted() {
        this.player.x += 5;
    }

}