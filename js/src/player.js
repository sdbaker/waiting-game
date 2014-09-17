define(['phaser', 'lodash'], function(Phaser, _){

  var Player = function(){
    this.hp = 100;
    this.stress = 1.0;
    this.item = null;
  };

  Player.prototype = {
    update: function(){

    }
    playerHitPatron: function(patronObj){

    },
    playerHitServer: function(serverObj){

    },
    playerHitStation: function(stationObj){
      
    }
  };

  return Player;

});