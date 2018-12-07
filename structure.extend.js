'use strict';

Structure.prototype.loop = function () {
  if (_.isFunction(this.tick)) {
    this.tick();
  }
};

Structure.prototype.getRclHitsMin = function () {
  if (this.structureType === STRUCTURE_WALL || this.structureType === STRUCTURE_RAMPART) {
    switch (this.room.controller.level) {
      case 2:
        return WALL_RCL_2_HITS_MIN;
      case 3:
        return WALL_RCL_3_HITS_MIN;
      case 4:
        return WALL_RCL_4_HITS_MIN;
      case 5:
        return WALL_RCL_5_HITS_MIN;
      default:
        return WALL_RCL_6_HITS_MIN;
    }
  }

  return this.hitsMax;
};
