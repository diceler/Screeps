'use strict';

StructureTower.prototype.tick = function () {
  if (_.size(this.room.hostiles)) {
    let hostile;

    if (this.memory.hostileId) {
      hostile = getObjectById(this.memory.hostileId)
    } else {
      hostile = _.first(this.room.hostiles);
      this.memory.hostileId = hostile.id;
    }

    if (hostile) {
      if (this.attack(hostile) === ERR_INVALID_TARGET) {
        delete this.memory.hostileId;
      }
    }
  } else {
    let structure;

    if (!this.memory.structureId) {
      const decayedContainers = _.filter(this.room.structures, structure => structure.structureType === STRUCTURE_CONTAINER && structure.hits < structure.hitsMax);

      if (_.size(decayedContainers)) {
        structure = _.first(decayedContainers);
        this.memory.structureId = structure.id;
      }
    } else {
      structure = getObjectById(this.memory.structureId);
    }

    if (structure) {
      if (this.repair(structure) === ERR_INVALID_TARGET) {
        delete this.memory.structureId;
      }
    }
  }
};
