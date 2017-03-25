const Role = require('Role');
const Builder = require('Builder');

class Harvester extends Role {
  static spawn(level = Harvester.LV1) {
    if(Memory.harvesters.length < Harvester.max && Game.spawns.first.canCreateCreep(level) == OK) {
      let name = Game.spawns.first.createCreep(level, undefined, {role: 'Harvester'});

      if(!Memory.harvesters) {
        Memory.harvesters = [];
      }

      Memory.harvesters.push(name);
    }
  }

  static run() {
    Harvester.spawn(Harvester.LV3);
    for(let creepName of Memory.harvesters) {
      Harvester.execute(creepName);
    }
  }

  static execute(name) {
    let creep = Game.creeps[name];
    if(!creep) {
      Memory.harvesters.splice(Memory.harvesters.indexOf(name), 1);
      return;
    }

    if(creep.memory.harvesting && creep.carry.energy == 0) {
      creep.memory.harvesting = false;
      creep.say('🔄 harvest');
    }
    if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
      creep.memory.harvesting = true;
    }

    if(!creep.memory.harvesting) {
      var source = creep.pos.findClosestByRange(FIND_SOURCES);
      if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          if(structure.structureType == STRUCTURE_CONTAINER) {
            //return _.sum(structure.store) < structure.storeCapacity;
          }
          return (structure.structureType == STRUCTURE_EXTENSION
            || structure.structureType == STRUCTURE_SPAWN
            || structure.structureType == STRUCTURE_TOWER)
            && structure.energy < structure.energyCapacity;
        }
      });
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      } else {
        Builder.execute(name);
      }
    }
  }
}

module.exports = Harvester
