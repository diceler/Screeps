'use strict';

Object.defineProperty(StructureController.prototype, 'ticksSinceUpgrade', {
  configurable: true,
  get: function () {
    return Game.time - (this.memory.lastUpgradeTime || NO_INTERACTION_TICK_LIMIT);
  }
});

Object.defineProperty(StructureController.prototype, 'ticksToDowngradeMinReached', {
  configurable: true,
  get: function () {
    return this.ticksToDowngrade <= CONTROLLER_TICKS_TO_DOWNGRADE_MIN;
  }
});

Object.defineProperty(StructureController.prototype, 'signedByMe', {
  configurable: true,
  get: function () {
    return (this.sign && this.sign.username === Memory.USERNAME);
  }
});

Object.defineProperty(StructureController.prototype, 'sufficientUpgraders', {
  configurable: true,
  get: function () {
    const upgraders = _.size(_.filter(Game.creeps, {room: {name: this.room.name}, memory: {role: ROLE_UPGRADER}}));

    switch (this.level) {
      case 1:
      case 2:
      case 3:
      case 4:
        return upgraders >= 2;
      case 5:
      case 6:
      case 7:
        return upgraders >= 3;
      case 8:
        return upgraders >= 1;
      default:
        return false;
    }
  }
});
