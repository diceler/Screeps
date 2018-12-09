'use strict';
const Worker = require('role._worker');

class Harvester extends Worker {
  constructor(creep) {
    super(creep);
  }

  static body(rcl) {
    switch (rcl) {
      // case 3:
      //   return _.flatten([parts(WORK, 5), parts(MOVE, 1)]);
      default:
        return _.flatten([parts(WORK, 1), parts(CARRY, 1), parts(MOVE, 1)]);
    }
  }

  get hasPickup() {
    if (!this._hasPickup) {
      if (!this.creep.memory.hasPickup) {
        this.creep.memory.hasPickup = _.some(Game.creeps, 'memory.harvesterId', this.creep.id);
      }

      this._hasPickup = this.creep.memory.hasPickup;
    }

    return this._hasPickup;
  }

  tick() {
    const source = _.find(this.creep.room.sources, 'id', this.creep.memory.sourceId);

    if (!this.creep.isFull) {
      if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
        if (this.creep.carryCapacity !== 0) {
          this.creep.moveTo(source);
        } else {
          if (source.container) {
            if (this.creep.moveTo(source.container, {range: 0}) === ERR_NO_PATH) {
              const creepsOnContainer = source.container.pos.lookFor(LOOK_CREEPS);

              if (creepsOnContainer) {
                _.first(creepsOnContainer).moveTo(source, {avoid: [source.container.pos]});
              }
            }
          }
        }
      }
    } else {
      if (!this.hasPickup) {
        this.creep.room.requestCreep(this.creep.id, ROLE_HAULER, {harvesterId: this.creep.id});
      }

      if (source.container) {
        if (_.isEqual(this.creep.pos, source.container.pos)) {
          this.creep.drop(RESOURCE_ENERGY);
        } else if (this.creep.transfer(source.container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(source.container);
        }
      } else if (!this.hasPickup) {
        this.deliver();
      }
    }
  }
}

roles[ROLE_HARVESTER] = Harvester;
