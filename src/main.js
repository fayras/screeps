const clearMemory = require('clearMemory');
const Builder = require('Builder');
const Harvester = require('Harvester');
const Upgrader = require('Upgrader');
const Warrior = require('Warrior');

module.exports.loop = function () {
  clearMemory();

  var tower = Game.getObjectById('58d4599a974b725b4f94049c');
  if(tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.structureType == STRUCTURE_RAMPART ? structure.hits < structure.hitsMax * 0.01 : structure.hits < structure.hitsMax
    });
    if(closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
      tower.attack(closestHostile);
    }
  }

  if(Game.spawns.first.spawning) {
    Game.spawns.first.room.visual.rect(1, 1, 5, 1.5, {opacity: 0.1});
    Game.spawns.first.room.visual.text('🛠️ ' + Game.spawns.first.spawning.name + ' (' + Game.spawns.first.spawning.remainingTime / Game.spawns.first.spawning.needTime + ')', 2, 2, {opacity: 0.8});
  }

  Builder.run();
  Upgrader.run();
  Harvester.run();
  Warrior.run();
}
