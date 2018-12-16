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
      return energyAvailable > MIN_ENERGY_AVAILABLE;
    }
  }

  findStorage(predicate) {
    const storages = _.filter(this.creep.room.structures, predicate)
    // Prioritize STRUCTURE_CONTAINER last always.
      .sort((a, b) => {
        const ab = [a, b];

        if (_.every(ab, 'structureType', STRUCTURE_CONTAINER)) {
          return 0;
        }

        let noneAreContainers = _.every(ab, ({structureType}) => structureType !== STRUCTURE_CONTAINER);

        if (noneAreContainers) {
          const diff = a.storage - b.storage;
          return diff < 0 ? -1 : diff > 0 ? 1 : 0;
        }

        return a.structureType === STRUCTURE_CONTAINER ? 1 : -1;
      });
    const storage = _.first(storages);

    if (storage) {
      this.creep.memory.storageId = storage.id;
    }

    return storage;
  }

  deliver() {
    let storage = _.size(this.creep.room.creeps[ROLE_FILLER]) ? this.creep.room.storage : undefined;

    // In cases of attacks make sure towers are fed energy.
    if (_.size(this.creep.room.hostiles) && !_.size(this.creeps[ROLE_FILLER])) {
      storage = _.find(this.creep.room.structures, structure => structure.structureType === STRUCTURE_TOWER && structure.energy < 500);
    }

    if (!storage) {
      if (!this.creep.memory.storageId) {
        storage = this.findStorage(structure => structure.storesEnergy && !structure.isFull && !structure.isWithdrawOnly);
      } else {
        storage = getObjectById(this.creep.memory.storageId);
      }
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
    let storage = this.creep.room.storage;

    if (!this.creep.memory.storageId) {
      storage = this.findStorage(structure => _.some([STRUCTURE_SPAWN, STRUCTURE_EXTENSION], type => structure.structureType === type) && !structure.isEmpty);
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
