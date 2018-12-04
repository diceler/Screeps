'use strict';
const Worker = require('role._worker');

class Builder extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      default:
        return [parts(WORK, 2), parts(CARRY, 1), parts(MOVE, 1)];
    }
  }

  tick() {
    if (this.creep.memory.building && this.creep.isEmpty) {
      this.creep.memory.building = false;
    }

    if (!this.creep.memory.building && this.creep.isFull) {
      this.creep.memory.building = true;
    }

    if (this.creep.memory.building) {
      let constructionSite;

      if (!this.creep.memory.csId) {
        const constructionSites = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        constructionSite = _.first(constructionSites);
        this.creep.memory.csId = constructionSite.id;
      } else {
        constructionSite = getObjectById(this.creep.memory.csId);
      }

      if (constructionSite) {
        if (this.creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(constructionSite);
        }
      } else {
        delete this.creep.memory.csId;
      }
    } else {
      this.recharge();
    }
  }
}

roles[ROLE_BUILDER] = Builder;
