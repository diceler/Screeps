'use strict';
const CreepBase = require('role._base');

class Worker extends CreepBase {
  constructor(creep) {
    super(creep);
  }

  get allowedToRecharge() {
    const anyUnoccupiedSources = _.some(this.creep.room.sources, {occupied: false});

    if (anyUnoccupiedSources) {
      return false;
    } else {
      const {energyAvailable, energyCapacityAvailable} = this.creep.room;
      // If current energy is >= to 25% of the total current energy availability allow it to recharge.
      // return Math.floor((energyAvailable / energyCapacityAvailable) * 100) >= 25;

      // If current available energy is at minimum 200 allow creep to recharge.
      return (energyCapacityAvailable - energyAvailable) > MIN_ENERGY_AVAILABLE;
    }
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
      storage = this.findStorage(structure => structure.storesEnergy && !structure.isFull && structure.structureType !== STRUCTURE_CONTAINER);
    } else {
      storage = getObjectById(this.creep.memory.storageId);
    }

    if (storage) {
      let actionResult = this.creep.transfer(storage, RESOURCE_ENERGY);

      switch (actionResult) {
        case ERR_NOT_IN_RANGE:
          this.creep.moveTo(storage);
          break;
        case OK:
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
        case OK:
        case ERR_NOT_ENOUGH_RESOURCES:
          delete this.creep.memory.storageId;
          break;
      }
    }
  }
}

module.exports = Worker;
