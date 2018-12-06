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
        return _.flatten([parts(WORK, 1), parts(CARRY, 1), parts(MOVE, 1)]);
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

  // buildContainer() {
  //   const constructionSite = getObjectById(this.creep.memory.csId);
  //
  //   if (constructionSite) {
  //     if (this.creep.memory.building && this.creep.isEmpty) {
  //       this.creep.memory.building = false;
  //     }
  //
  //     if (!this.creep.memory.building && this.creep.isFull) {
  //       this.creep.memory.building = true;
  //     }
  //
  //     if (this.creep.memory.building) {
  //       this.creep.build(constructionSite);
  //     } else {
  //       this.harvest();
  //     }
  //   } else {
  //     delete this.creep.memory.csId;
  //   }
  // }

  tick() {
    if (!this.creep.isFull) {
      this.harvest();
    } else {
      if (!this.hasPickup) {
        this.creep.room.createSpawnRequest(this.creep.id, ROLE_HAULER, {harvesterId: this.creep.id});
        this.deliver();
      }
    }


    // if (_.every(this.creep.room.sources, 'occupied') && this.creep.memory.csId) {
    //   this.buildContainer();
    // } else {
    //   if (!this.creep.isFull) {
    //     this.harvest();
    //   } else {
    //     if (this.creep.memory.containerId) {
    //       const container = getObjectById(this.creep.memory.containerId);
    //
    //       if (container) {
    //         if (this.creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    //           this.creep.moveTo(container);
    //         }
    //       } else {
    //         delete this.creep.memory.containerId;
    //       }
    //     } else {
    //       const containersOnMe = _.filter(this.creep.pos.lookFor(LOOK_STRUCTURES), 'structureType', STRUCTURE_CONTAINER);
    //
    //       if (_.size(containersOnMe)) {
    //         this.creep.memory.containerId = _.first(containersOnMe).id;
    //       } else {
    //         const constructionSitesOnMe = _.filter(this.creep.pos.lookFor(LOOK_CONSTRUCTION_SITES), 'structureType', STRUCTURE_CONTAINER);
    //
    //         if (_.size(constructionSitesOnMe)) {
    //           this.creep.memory.csId = _.first(constructionSitesOnMe).id;
    //         } else {
    //           this.creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
    //         }
    //       }
    //     }
    //   }
    // }
  }
}

roles[ROLE_HARVESTER] = Harvester;
