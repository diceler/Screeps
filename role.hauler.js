'use strict';
const Worker = require('role._worker');

class Hauler extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      case 3:
        return _.flatten([parts(CARRY, 5), parts(MOVE, 5)]);
      default:
        return _.flatten([parts(CARRY, 1), parts(MOVE, 1)]);
    }
  }

  collect() {
    const harvester = getObjectById(this.creep.memory.harvesterId);

    if (!harvester) {
      this.creep.suicide();
      return;
    }

    if (this.creep.ticksToLive === 1) {
      harvester.memory.hasPickup = false;
    }

    if (harvester.transfer(this.creep, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(harvester);
    }
  }

  tick() {
    if (!this.creep.isFull) {
      this.collect();
    } else {
      this.deliver();
    }
  }
}

roles[ROLE_HAULER] = Hauler;
