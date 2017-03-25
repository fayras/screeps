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
}

module.exports = Factory
