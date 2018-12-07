'use strict';

StructureTower.prototype.tick = function () {
  // Tower actions cost 10 energy. Skip tick if current energy is less than that.
  if (this.energy < 10) {
    return;
  }

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
    const damagedStructures = _.filter(this.room.structures, structure => structure.hits < structure.hitsMax)
      .sort((a, b) => a.hitsMax - b.hitsMax);

    if (_.size(damagedStructures)) {
      this.repair(_.first(damagedStructures));
    }
  }
};
