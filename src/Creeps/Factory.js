const Farmer = require('Creeps.Roles.Farmer');

const roles = {
  'farmer': Farmer
}

class Factory {
  constructor(room) {
    this.spawn = null;
    this.room = room;
    for(let spawnName in Game.spawns) {
      if(room.name === Game.spawns[spawnName].room.name) {
        this.spawn = Game.spawns[spawnName];
      }
    }
    this.showNotifications();
  }

  create(pType) {
    if(this.spawn) {
      let Type = roles[pType];
      let level = [];
      while(this.spawn.canCreateCreep(Type.level) === OK) {
        level.push.apply(null, Type.level);
      }

      if(level.length !== 0) {
        let name = this.spawn.createCreep(level, undefined, {role: pType});
      }
    }
  }

  showNotifications() {
    if(this.spawn && this.spawn.spawning) {
      this.room.visual.rect(1, 1, 5, 1.5, {opacity: 0.1});
      this.room.visual.text('🛠️ ' + this.spawn.spawning.name + ' (' + (1 - this.spawn.spawning.remainingTime / this.spawn.spawning.needTime).toFixed(1) + ')', 2, 2, {opacity: 0.8});
    }
  }
}

module.exports = Factory
