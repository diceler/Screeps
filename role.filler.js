'use strict';
const Worker = require('role._worker');

class Filler extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      case 4:
        return _.flatten([parts(CARRY, 16), parts(MOVE, 8)]);
      case 5:
        return _.flatten([parts(CARRY, 24), parts(MOVE, 12)]);
      case 6:
      case 7:
      case 8:
        return _.flatten([parts(CARRY, 30), parts(MOVE, 15)]);
      default:
        return _.flatten([parts(CARRY, 10), parts(MOVE, 5)]);
    }
  }

  tick() {
    if (this.creep.memory.filling && this.creep.isEmpty) {
      this.creep.memory.filling = false;
    }

    if (!this.creep.memory.filling && this.creep.isFull) {
      this.creep.memory.filling = true;
    }

    if (this.creep.memory.filling) {
      let target;

      if (_.size(this.creep.room.hostiles)) {
        target = _.find(this.creep.room.structures, structure => structure.structureType === STRUCTURE_TOWER && structure.energy < 500);
      }

      if (!target) {
        if (!this.creep.memory.targetId) {
          const structures = _.filter(
            this.creep.room.structures,
            ({structureType, isWithdrawOnly, isFull}) =>
              _.some([STRUCTURE_EXTENSION, STRUCTURE_CONTAINER, STRUCTURE_TOWER], structureType) &&
              !isWithdrawOnly && !isFull
          );

          target = _.first(structures);
          this.creep.memory.targetId = _.get(target, 'id', undefined);
        } else {
          target = getObjectById(this.creep.memory.targetId);
        }
      }

      if (target) {
        let actionResult = this.creep.transfer(target, RESOURCE_ENERGY);

        switch (actionResult) {
          case ERR_NOT_IN_RANGE:
            this.creep.moveTo(target);
            break;
          case OK:
          case ERR_FULL:
            delete this.creep.memory.targetId;
            break;
        }
      }
    } else {
      if (this.creep.withdraw(this.creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(this.creep.room.storage);
      }
    }
  }
}

roles[ROLE_FILLER] = Filler;
