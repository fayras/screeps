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
}

module.exports = Factory
