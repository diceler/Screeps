'use strict';
const Worker = require('role._worker');

class Harvester extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      case 3:
        return _.flatten([parts(WORK, 5), parts(MOVE, 2)]);
      default:
        return DEFAULT_CREEP_BODY;
    }
  }

  get hasPickup() {
    if (!this._hasPickup) {
      if (!this.creep.memory.hasPickup) {
        this.creep.memory.hasPickup = _.some(Game.creeps, {memory: {harvesterId: this.creep.id}});
      }

      this._hasPickup = this.creep.memory.hasPickup;
    }

    return this._hasPickup();
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
      if (!this.hasPickup) {
        this.creep.room.createSpawnRequest(this.creep.id, ROLE_HAULER, {harvesterId: this.creep.id});
        this.deliver();
      }
    }
  }
}

roles[ROLE_HARVESTER] = Harvester;
