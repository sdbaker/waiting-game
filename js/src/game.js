define(['phaser', 'lodash', 'player', 'restaurant'], function(Phaser, _, Player, Restaurant){

    var WaitingGameApp = {};

    WaitingGameApp.init = function(h, w, mode, targetElement){
        WaitingGameApp.gameInstance = new Phaser.Game(h, w, mode, targetElement,{
            preload: WaitingGameApp.preload,
            create: WaitingGameApp.load,
            update: WaitingGameApp.update,
            render: WaitingGameApp.render
        });
    };

    WaitingGameApp.preload = function(){
        //Load all assets here
        //WaitingGameApp.gameInstance.load.image('ground', 'res/img/principalGreen.png');
        //WaitingGameApp.gameInstance.load.spritesheet('torso', 'res/img/torso2.png', 32, 32);

    };

    WaitingGameApp.load = function(){
        //1st time load
        WaitingGameApp.gameInstance.world.setBounds(0,0,1000,1000);

        //Sprites
        WaitingGameApp.groundSprite = WaitingGameApp.gameInstance.add.tileSprite(0,0,1024,768, 'ground');

        //Keyboard init
        WaitingGameApp.cursors = WaitingGameApp.gameInstance.input.keyboard.createCursorKeys();

        //Camera init
        WaitingGameApp.gameInstance.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);

        //Objects
        WaitingGameApp.player = new Player(WaitingGameApp);
        WaitingGameApp.restaurant = new Restaurant(WaitingGameApp);

        WaitingGameApp.setUpIntro();

    };

    WaitingGameApp.update = function(){
        //Update data & collide stuff

        if(WaitingGameApp.player)
            WaitingGameApp.player.update();
        //restaurant has tables, tables have patrons, only need to call update at top level
        if(WaitingGameApp.restaurant)
            WaitingGameApp.restaurant.update();

        if(WaitingGameApp.player.isAlive){
            //Check to see if player touched any patrons
            WaitingGameApp.gameInstance.physics.arcade.collide(
                WaitingGameApp.restaurant.patrons,
                WaitingGameApp.player.sprite,
                WaitingGameApp.player.playerHitPatron,
                null,
                WaitingGameApp.player);
            //Check to see if player hit any servers
            WaitingGameApp.gameInstance.physics.arcade.collide(
                WaitingGameApp.restaurant.servers,
                WaitingGameApp.player.sprite,
                WaitingGameApp.player.playerHitServer,
                null,
                WaitingGameApp.player);
            //Check to see if player hit any stations
            WaitingGameApp.gameInstance.physics.arcade.collide(
                WaitingGameApp.restaurant.stations,
                WaitingGameApp.player.sprite,
                WaitingGameApp.player.playerHitStation,
                null,
                WaitingGameApp.player);
        }

        //Keep ground tile centered on camera
        WaitingGameApp.groundSprite.tilePosition.x = -WaitingGameApp.gameInstance.camera.x;
        WaitingGameApp.groundSprite.tilePosition.y = -WaitingGameApp.gameInstance.camera.y;

    };

    WaitingGameApp.render = function(){
        //Draw all the things. Usually all this is done inside the objects.

    };

    WaitingGameApp.setUpIntro = function(){
        if(!WaitingGameApp.logo){
            WaitingGameApp.logo = WaitingGameApp.gameInstance.add.sprite(0,200,'logo');
            WaitingGameApp.logo.fixedtoCamera = true;
        }
        WaitingGameApp.gameInstance.camera.focusOnXY(0,0);
        WaitingGameApp.gameInstance.input.onDown.add(WaitingGameApp.removeLogo, this);
    };

    WaitingGameApp.removeLogo = function(){
        WaitingGameApp.gameInstance.input.onDown.remove(WaitingGameApp.removeLogo, WaitingGameApp.gameInstance);
        WaitingGameApp.logo.kill();
        WaitingGameApp.startNewRound();
    };

    WaitingGameApp.startNewRound = function(){

    };

    return WaitingGameApp;
});

