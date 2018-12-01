'use strict';

class CreepBase {
  constructor(creep) {
    this.creep = creep;
  }

  static findConstruct(role) {
    switch (role) {
      case ROLE_HARVESTER:
        return roles[ROLE_HARVESTER];
    }
  }
}

module.exports = CreepBase;
