'use strict';
const CreepBase = require('role._base');

class Harvester extends CreepBase {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      case 2:
        return _.flatten([parts(WORK, 5), parts(MOVE, 2)]);
      default:
        return DEFAULT_CREEP_BODY;
    }
  }

  tick() {
    const creep = this.creep;
    let source = Game.getObjectById(creep.memory.sourceId);

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }
}

roles[ROLE_HARVESTER] = Harvester;
