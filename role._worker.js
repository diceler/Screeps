'use strict';
const CreepBase = require('role._base');

class Worker extends CreepBase {
  constructor(creep) {
    super(creep);
  }
  
  findStorage() {
    const storages = this.creep.room.find(FIND_MY_STRUCTURES, {filter: structure => structure.storesEnergy && !structure.isFull});
    const storage = _.first(storages);

    if (storage) {
      this.creep.memory.storageId = storage.id;
    }

    return storage;
  }

  deliver() {
    let storage;

    if (!this.creep.memory.storageId) {
      storage = this.findStorage();
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
}

module.exports = Worker;
