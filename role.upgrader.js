'use strict';
const Worker = require('role._worker');

class Upgrader extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      default:
        return DEFAULT_CREEP_BODY;
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

      if (!controller.signedByMe) {
        if (this.creep.signController(controller, `Occupied by ${Memory.USERNAME}`) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(controller);
        }
      }

      if (this.creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(controller);
      }
    } else {
      this.recharge()
    }
  }
}

roles[ROLE_UPGRADER] = Upgrader;
