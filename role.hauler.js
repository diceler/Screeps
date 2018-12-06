'use strict';
const Worker = require('role._worker');

class Hauler extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      case 3:
        return _.flatten([parts(CARRY, 5), parts(MOVE, 5)]);
      default:
        return _.flatten([parts(CARRY, 1), parts(MOVE, 1)]);
    }
  }

  collect() {
    const harvester = getObjectById(this.creep.memory.harvesterId);

    if (!harvester) {
      // TODO: Recycle instead down the line.
      this.creep.suicide();
      return;
    }

    if (this.creep.ticksToLive === 1) {
      harvester.memory.hasPickup = false;
    }

    if (harvester.transfer(this.creep, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(harvester);
    }
  }

  store() {
    let storage;

    if (!this.creep.memory.storageId) {
      const storages = _.filter(this.creep.room.structures, structure => structure.storesEnergy && !structure.isFull);
      const myStorageStructures = [
        STRUCTURE_EXTENSION,
        STRUCTURE_SPAWN,
        STRUCTURE_STORAGE,
        // TODO: Add other STRUCTURE types as I level up.
      ];
      const anyMyStorages = _.some(storages, ({structureType}) => _.some(myStorageStructures, 'structureType', structureType));

      if (anyMyStorages) {
        storage = _.first(storages);
        this.creep.memory.storageId = storage.id;
      } else {
        const anyContainers = _.some(storages, 'structureType', STRUCTURE_CONTAINER);

        if (anyContainers) {
          storage = _.first(_.filter(storages, 'structureType', STRUCTURE_CONTAINER));
          this.creep.memory.storageId = storage.id;
        }
      }
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
    } else {
      delete this.creep.memory.storageId;
    }
  }

  tick() {
    if (!this.creep.isFull) {
      this.collect();
    } else {
      this.store();
    }
  }
}

roles[ROLE_HAULER] = Hauler;
