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
    const damagedStructures = _.filter(this.room.structures, structure => !structure.rclHitsMin || structure.hits < structure.hitsMax)
    // Sort STRUCTURE_WALL at bottom always.
      .sort((a, b) => {
        const ab = [a, b];

        if (_.every(ab, 'structureType', STRUCTURE_WALL)) {
          return 0;
        }

        let noneAreWalls = _.every(ab, ({structureType}) => structureType !== STRUCTURE_WALL);

        if (noneAreWalls) {
          const diff = a.getRclHitsMin() - b.getRclHitsMin();
          return diff < 0 ? -1 : diff > 0 ? 1 : 0;
        }

        return a.structureType === STRUCTURE_WALL ? 1 : -1;
      });

    if (_.size(damagedStructures)) {
      this.repair(_.first(damagedStructures));
    }
  }
};
