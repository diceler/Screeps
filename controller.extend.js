'use strict';

StructureController.prototype.tick = function () {
  if (this.ticksToDowngradeMinReached && this.ticksSinceUpgrade > CONTROLLER_LAST_UPGRADED_LIMIT) {
    this.room.createSpawnRequest(this.id, ROLE_UPGRADER);
  }
};

StructureController.prototype.updateUpgradeTime = function () {
  this.memory.lastUpgradeTime = Game.time;
};
