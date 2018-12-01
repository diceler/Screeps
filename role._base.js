'use strict';

module.exports = class CreepBase {
  constructor(creep) {
    this.creep = creep;
  }

  static findConstruct = function (role) {
    switch (role) {
      case ROLE_HARVESTER:
        return Harvester;
    }
  }
};
