'use strict';
const Worker = require('role._worker');

class Upgrader extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      default:
        return _.flatten([parts(WORK, 2), parts(CARRY, 1), parts(MOVE, 1)]);
    }
  }

  get allowedToRecharge() {
    // If current energy is >= to 25% of the total current energy availability allow it to recharge.
    const {energyAvailable, energyCapacityAvailable} = this.creep.room;
    const enoughEnergyAvailable = Math.floor((energyAvailable / energyCapacityAvailable) * 100) >= 25;

    if (!this._canRecharge) {
      this._canRecharge = enoughEnergyAvailable;
    }

    return this._canRecharge;
  }

  tick() {
    if (this.creep.memory.upgrading && this.creep.isEmpty) {
      this.creep.memory.upgrading = false;
    }

    if (!this.creep.memory.upgrading && this.creep.isFull) {
      this.creep.memory.upgrading = true;
      delete this.creep.memory.storageId;
    }

    if (this.creep.memory.upgrading) {
      const controller = this.creep.room.controller;

      if (controller.signedByMe) {
        if (this.creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(controller);
        }
      } else {
        if (this.creep.signController(controller, `Occupied by ${Memory.USERNAME}`) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(controller);
        }
      }
    } else {
      if (this.allowedToRecharge) {
        this.recharge();
      }
    }
  }
}

roles[ROLE_UPGRADER] = Upgrader;
