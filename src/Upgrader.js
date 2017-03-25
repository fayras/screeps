let Upgrader = {
  spawn(level = Upgrader.LV1) {
    if(Memory.upgraders.length < Upgrader.max && Game.spawns.first.canCreateCreep(level) == OK) {
      let name = Game.spawns.first.createCreep(level, undefined, {role: 'Upgrade'});

      if(!Memory.upgraders) {
        Memory.upgraders = [];
      }

      Memory.upgraders.push(name);
    }
  },

  run() {
    Upgrader.spawn(Upgrader.LV3);
    for(let creepName of Memory.upgraders) {
      Upgrader.execute(creepName);
    }
  },

  execute(name) {
    let creep = Game.creeps[name];
    if(!creep) {
      Memory.upgraders.splice(Memory.upgraders.indexOf(name), 1);
      return;
    }

    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
}

Upgrader.LV1 = [WORK, CARRY, MOVE];
Upgrader.LV2 = [WORK, WORK, CARRY, MOVE, MOVE];
Upgrader.LV3 = [WORK, WORK, CARRY, MOVE, MOVE, MOVE];
Upgrader.LV4 = [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE];
Upgrader.max = 3;

module.exports = Upgrader
