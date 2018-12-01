'use strict';
const CreepBase = require('role._base');

class Harvester extends CreepBase {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      case 2:
        return _.flatten([parts(WORK, 5), parts(MOVE, 2)]);
      default:
        return DEFAULT_CREEP_BODY;
    }
  }

  findStorage() {
    const storages = this.creep.room.find(FIND_MY_STRUCTURES, {filter: structure => structure.storesEnergy && !structure.isFull});
    const storage = _.first(storages);

    if (storage) {
      this.creep.memory.storageId = storage.id;
    } else {
      console.log('ERR: All storages are full');
    }

    return storage;
  }

  tick() {
    const creep = this.creep;

    if (!creep.isFull) {
      let source = Game.getObjectById(creep.memory.sourceId);

      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    } else {
      let storage;

      if (!creep.memory.storageId) {
        storage = this.findStorage();

        if (!storage) {
          return;
        }
      } else {
        storage = getObjectById(creep.memory.storageId);
      }

      let actionResult = creep.transfer(storage, RESOURCE_ENERGY);

      switch (actionResult) {
        case ERR_NOT_IN_RANGE:
          creep.moveTo(storage);
          break;
        case ERR_FULL:
          delete creep.memory.storageId;
          break;
      }
    }
  }
}

roles[ROLE_HARVESTER] = Harvester;
