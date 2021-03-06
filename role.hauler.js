'use strict';
const Worker = require('role._worker');

class Hauler extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      case 2:
        return _.flatten([parts(CARRY, 6), parts(MOVE, 3)]);
      case 3:
        return _.flatten([parts(CARRY, 10), parts(MOVE, 5)]);
      case 4:
        return _.flatten([parts(CARRY, 16), parts(MOVE, 8)]);
      case 5:
        return _.flatten([parts(CARRY, 24), parts(MOVE, 12)]);
      case 6:
      case 7:
      case 8:
        return _.flatten([parts(CARRY, 30), parts(MOVE, 15)]);
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
