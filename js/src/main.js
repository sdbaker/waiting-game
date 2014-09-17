var gameInstance = new Phaser.Game(640, 480, Phaser.AUTO, 'appRoot');
gameInstance.state.add('main', waitingGameApp);
gameInstance.state.start('main');