define(['phaser', 'lodash'], function(Phaser, _){

  var Restaurant = function(){
    this.tables = [];
    this.patrons = [];
    this.servers = [];
    this.stations = [];
  }

  Restaurant.prototype = {
    update: function(){
      
    }
  }

  return Restaurant;

})