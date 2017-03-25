class Role {

}

Role.LV1 = [WORK, CARRY, MOVE];
Role.LV2 = [WORK, WORK, CARRY, MOVE, MOVE];
Role.LV3 = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
Role.LV4 = [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE];
Role.max = 3;

module.exports = Role
