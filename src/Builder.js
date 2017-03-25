const Upgrader = require('Upgrader');

let Builder = {
  spawn(level = Builder.LV1) {
    if(Memory.builders.length < Builder.max && Game.spawns.first.canCreateCreep(level) == OK) {
      let name = Game.spawns.first.createCreep(level, undefined, {role: 'Builder'});
      console.log('Spawning new builder: ' + name);

      if(!Memory.builders) {
        Memory.builders = [];
      }

      Memory.builders.push(name);
    }
  },

  run() {
    Builder.spawn(Builder.LV3);
    for(let creepName of Memory.builders) {
      Builder.execute(creepName);
    }
  },

  execute(name) {
    let creep = Game.creeps[name];
    if(!creep) {
      Memory.builders.splice(Memory.builders.indexOf(name), 1);
      return;
    }

    if(creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }

    if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if(creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if(targets.length) {
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      } else {
        Upgrader.execute(name);
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
}

Builder.LV1 = [WORK, CARRY, MOVE];
Builder.LV2 = [WORK, WORK, CARRY, MOVE, MOVE];
Builder.LV3 = [WORK, WORK, CARRY, MOVE, MOVE, MOVE];
Builder.LV4 = [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE];
Builder.max = 3;

module.exports = Builder
