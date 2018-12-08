'use strict';
const Worker = require('role._worker');

class Upgrader extends Worker {
  constructor(creep) {
    super(creep);
    this.controller = creep.room.controller;
  }

  static body(rcl) {
    switch (rcl) {
      case 2:
        return _.flatten([parts(WORK, 4), parts(CARRY, 1), parts(MOVE, 2)]);
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
      if (this.controller.signedByMe) {
        if (this.creep.upgradeController(this.controller) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(this.controller);
        }
      } else {
        if (this.creep.signController(this.controller, `Occupied by ${Memory.USERNAME}`) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(this.controller);
        }
      }
    } else {
      if (this.controller.container && !this.controller.container.isEmpty) {
        if (this.creep.withdraw(this.controller.container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(this.controller.container);
        }

        return;
      }

      if (this.allowedToRecharge) {
        this.recharge();
      }
    }
  }
}

roles[ROLE_UPGRADER] = Upgrader;
