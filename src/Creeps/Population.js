const CreepFactory = require('Creeps.Factory');

class Population {
  constructor(room) {
    this.room = room;
    this.factory = new CreepFactory(room);
    this.creeps = this.room.find(FIND_MY_CREEPS);
  }
}

module.exports = Population
