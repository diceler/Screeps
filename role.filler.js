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
      let target = getObjectById(this.creep.memory.fillId);

      if (!target) {
        if (!this.creep.memory.fillId) {
          const structuresInRoom = _.groupBy(this.creep.room.structures, 'structureType');
          let structures;

          switch (this.creep.memory.fill) {
            case STRUCTURE_EXTENSION:
              structures = structuresInRoom[STRUCTURE_EXTENSION] || structuresInRoom[STRUCTURE_SPAWN];
              break;
            case STRUCTURE_TOWER:
              structures = structuresInRoom[STRUCTURE_TOWER];
              break;
            case STRUCTURE_CONTAINER:
              structures = structuresInRoom[STRUCTURE_CONTAINER];
              break;
          }

          target = _.first(structures);
          this.creep.memory.fillId = _.get(target, 'id', undefined);
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
            delete this.creep.memory.fillId;
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
