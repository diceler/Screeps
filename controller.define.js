'use strict';

Object.defineProperty(StructureController.prototype, 'signedByMe', {
  configurable: true,
  get: function () {
    return (this.sign && this.sign.username === Memory.USERNAME);
  }
});

Object.defineProperty(StructureController.prototype, 'hasSufficientUpgraders', {
  configurable: true,
  get: function () {
    const upgraders = _.size(this.room.creeps[ROLE_UPGRADER]);

    if (upgraders === 0) {
      return false;
    }

    const harvestersInRoom = _.size(this.room.creeps[ROLE_HARVESTER]);

    if (harvestersInRoom > 1) {
      return Math.floor(harvestersInRoom / HARVESTERS_PER_UPGRADER) <= upgraders;
    }

    return true;
  }
});

Object.defineProperty(StructureController.prototype, 'container', {
  configurable: true,
  get: function () {
    if (!this._container) {
      if (!this.memory.containerId) {
        const containers = _.filter(this.room.structures, 'structureType', STRUCTURE_CONTAINER);

        if (_.size(containers)) {
          const container = _.find(containers, ({pos}) => pos.inRangeTo(this.pos, 3));

          if (container) {
            this.memory.containerId = container.id;
          }
        }
      }

      return this._container = getObjectById(this.memory.containerId);
    }

    return this._container;
  }
});
