'use strict';
const Worker = require('role._worker');

class Harvester extends Worker {
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

  harvest() {
    let source = Game.getObjectById(this.creep.memory.sourceId);

    if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(source);
    }
  }

  tick() {
    if (!this.creep.isFull) {
      this.harvest();
    } else {
      this.deliver();
    }
  }
}

roles[ROLE_HARVESTER] = Harvester;
