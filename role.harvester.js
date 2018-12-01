'use strict';

module.exports = class Harvester extends CreepBase {
  constructor(creep) {
    super(creep);
    this.base = creep.memory.base;
  }

  static body = function (rcl) {
    switch (rcl) {
      case 2:
        return _.flatten([parts(WORK, 5), parts(MOVE, 2)]);
      default:
        return DEFAULT_CREEP_BODY;
    }
  }
};
