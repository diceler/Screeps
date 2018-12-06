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
      return Math.floor(harvestersInRoom / 2) <= upgraders;
    }

    return true;
  }
});
