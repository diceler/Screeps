'use strict';
const Worker = require('role._worker');

class Hauler extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      case 8:
      case 7:
      case 6:
      case 5:
      case 4:
      case 3:
        return _.flatten([parts(CARRY, 5), parts(MOVE, 5)]);
      default:
        return _.flatten([parts(CARRY, 2), parts(MOVE, 2)]);
    }
  }

  collect() {
    const harvester = getObjectById(this.creep.memory.harvesterId);

    if (!harvester) {
      // TODO: Recycle instead down the line.
      this.creep.suicide();
      return;
    }

    if (this.creep.ticksToLive === 1) {
      harvester.memory.hasPickup = false;
    }

    const source = _.find(this.creep.room.sources, 'id', harvester.memory.sourceId);

    if (source.container) {
      if (this.creep.withdraw(source.container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(source.container);
      }

      return;
    }

    if (harvester.transfer(this.creep, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(harvester);
    }
  }

  tick() {
    if (this.creep.memory.hauling && this.creep.isEmpty) {
      this.creep.memory.hauling = false;
    }

    if (!this.creep.memory.hauling && this.creep.isFull) {
      this.creep.memory.hauling = true;
    }

    if (this.creep.memory.hauling) {
      this.deliver();
    } else {
      this.collect();
    }
  }
}

roles[ROLE_HAULER] = Hauler;
