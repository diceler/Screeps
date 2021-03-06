'use strict';
const Military = require('role._military');

class Defender extends Military {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      default:
        return _.flatten([parts(ATTACK, 2), parts(MOVE, 2), parts(TOUGH, 4)]);
    }
  }

  tick() {
    let hostile;

    if (!this.creep.memory.hostileId) {
      hostile = _.first(this.creep.room.hostiles);
      this.creep.memory.hostileId = _.get(hostile, 'id', undefined);
    } else {
      hostile = getObjectById(this.creep.memory.hostileId);
    }

    if (hostile) {
      let actionResult = this.creep.attack(hostile);

      switch (actionResult) {
        case ERR_NOT_IN_RANGE:
          this.creep.moveTo(hostile);
          break;
        case ERR_INVALID_TARGET:
          delete this.creep.memory.hostileId;
          break;
      }
    } else {
      delete this.creep.memory.hostileId;
    }
  }
}

roles[ROLE_DEFENDER] = Defender;
