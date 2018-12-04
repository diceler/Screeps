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
      this.recharge()
    }
  }
}

roles[ROLE_UPGRADER] = Upgrader;
