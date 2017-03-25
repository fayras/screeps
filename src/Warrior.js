const Role = require('Role');

class Warrior extends Role {
  static spawn(level = Warrior.LV1) {
    if(!Memory.warriors) {
      Memory.warriors = [];
    }

    if(Memory.warriors.length < Warrior.max && Game.spawns.first.canCreateCreep(level) == OK) {
      let name = Game.spawns.first.createCreep(level, undefined, {role: 'Warrior'});

      Memory.warriors.push(name);
    }
  }

  static run() {
    Warrior.spawn(Warrior.LV3);
    for(let creepName of Memory.warriors) {
      Warrior.execute(creepName);
    }
  }

  static execute(name) {
    let creep = Game.creeps[name];
    if(!creep) {
      Memory.warriors.splice(Memory.warriors.indexOf(name), 1);
      return;
    }

    var hostiles = Game.rooms.E13S86.find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0) {
      var username = hostiles[0].owner.username;
      Game.notify(`User ${username} spotted in room ${roomName}`);
      creep.attack(hostiles[0]);
    } else {
      creep.moveTo(36, 25);
    }
  }
}

Warrior.LV3 = [MOVE, MOVE, MOVE, ATTACK, ATTACK, TOUGH, TOUGH];
Warrior.max = 1;

module.exports = Warrior
