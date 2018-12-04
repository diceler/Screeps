'use strict';
const CreepBase = require('role._base');

class Worker extends CreepBase {
  constructor(creep) {
    super(creep);
  }

  findStorage(predicate) {
    const storages = _.filter(this.creep.room.structures, predicate);
    const storage = _.first(storages);

    if (storage) {
      this.creep.memory.storageId = storage.id;
    }

    return storage;
  }

  deliver() {
    let storage;

    if (!this.creep.memory.storageId) {
      storage = this.findStorage(structure => structure.storesEnergy && !structure.isFull);
    } else {
      storage = getObjectById(this.creep.memory.storageId);
    }

    if (storage) {
      let actionResult = this.creep.transfer(storage, RESOURCE_ENERGY);

      switch (actionResult) {
        case ERR_NOT_IN_RANGE:
          this.creep.moveTo(storage);
          break;
        case ERR_FULL:
          delete this.creep.memory.storageId;
          break;
      }
    }
  }

  recharge() {
    let storage;

    if (!this.creep.memory.storageId) {
      storage = this.findStorage(structure => structure.storesEnergy && !structure.isEmpty && structure.structureType !== STRUCTURE_TOWER);
    } else {
      storage = getObjectById(this.creep.memory.storageId);
    }

    if (storage) {
      let actionResult = this.creep.withdraw(storage, RESOURCE_ENERGY);

      switch (actionResult) {
        case ERR_NOT_IN_RANGE:
          this.creep.moveTo(storage);
          break;
        case ERR_NOT_ENOUGH_RESOURCES:
          delete this.creep.memory.storageId;
          break;
      }
    }
  }
}

module.exports = Worker;
