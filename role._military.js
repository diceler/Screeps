'use strict';
const CreepBase = require('role._base');

class Military extends CreepBase {
  constructor(creep) {
    super(creep);
  }

  findHostile() {
    const hostiles = this.creep.room.find(FIND_HOSTILE_CREEPS);
    const hostile = _.first(hostiles);

    if (hostile) {
      this.creep.memory.hostileId = hostile.id;
    }

    return hostile;
  }
}

module.exports = Military;
