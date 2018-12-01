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

  harvest() {
    let source = Game.getObjectById(this.creep.memory.sourceId);

    if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(source);
    }
  }

  tick() {
    if (!this.creep.isFull) {
      this.harvest();
    } else {
      this.deliver();
    }
  }
}

roles[ROLE_HARVESTER] = Harvester;
