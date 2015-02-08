var game = new Phaser.Game(800, 600, Phaser.AUTO, 'function RUBI()', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('background','assets/background.jpg');
    game.load.image('player','assets/rubi.png');

}

var player;
var cursors;

function create() {

    game.add.tileSprite(0, 0, 2000, 1333, 'background');

    game.world.setBounds(0, 0, 2000, 1333);

    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);

}

function update() {

    player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}