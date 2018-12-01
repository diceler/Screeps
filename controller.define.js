Object.defineProperty(StructureController.prototype, 'ticksSinceUpgrade', {
  configurable: true,
  get: function () {
    return Game.time - (this.memory.lastUpgradeTime || CONTROLLER_LAST_UPGRADED_LIMIT);
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
