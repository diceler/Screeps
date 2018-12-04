'use strict';
const Worker = require('role._worker');

class Harvester extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      case 3:
        return _.flatten([parts(WORK, 5), parts(MOVE, 1)]);
      default:
        return _.flatten([parts(WORK, 2), parts(CARRY, 1), parts(MOVE, 1)]);
    }
  }

  get hasPickup() {
    if (!this._hasPickup) {
      if (!this.creep.memory.hasPickup) {
        this.creep.memory.hasPickup = _.some(Game.creeps, {memory: {harvesterId: this.creep.id}});
      }

      this._hasPickup = this.creep.memory.hasPickup;
    }

    return this._hasPickup;
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
      if (this.creep.memory.containerId) {
        const container = getObjectById(this.creep.memory.containerId);

        if (container) {
          if (container instanceof StructureContainer) {
            if (this.creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              this.creep.moveTo(container);
            }
          } else if (container instanceof ConstructionSite) {
            if (this.creep.build(container)) {
              this.creep.moveTo(container);
            }
          }
        } else {
          delete this.creep.memory.containerId;
        }
      } else {
        const containersOnMe = _.filter(this.creep.pos.lookFor(LOOK_STRUCTURES), 'type', STRUCTURE_CONTAINER);

        if (_.size(containersOnMe)) {
          this.creep.memory.containerId = _.first(containersOnMe).id;
        } else {
          const constructionSitesOnMe = _.filter(this.creep.pos.lookFor(LOOK_CONSTRUCTION_SITES), 'type', STRUCTURE_CONTAINER);

          if (_.size(constructionSitesOnMe)) {
            this.creep.memory.containerId = _.first(constructionSitesOnMe).id;
          } else {
            this.creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
          }
        }
      }

      // if (!this.hasPickup) {
      //   this.creep.room.createSpawnRequest(this.creep.id, ROLE_HAULER, {harvesterId: this.creep.id});
      //   this.deliver();
      // }
    }
  }
}

roles[ROLE_HARVESTER] = Harvester;
