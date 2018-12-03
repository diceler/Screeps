'use strict';

StructureController.prototype.tick = function () {
  const hasDowngradeMinBeenReached_and_hasThereBeenNoInteraction = (this.ticksToDowngradeMinReached && this.ticksSinceUpgrade >= NO_INTERACTION_TICK_LIMIT);
  const hasThereBeenNoInteraction_and_insufficientUpgraders = (this.ticksSinceUpgrade >= NO_INTERACTION_TICK_LIMIT && !this.sufficientUpgraders);

  if (hasDowngradeMinBeenReached_and_hasThereBeenNoInteraction || hasThereBeenNoInteraction_and_insufficientUpgraders) {
    this.room.createSpawnRequest(this.id, ROLE_UPGRADER);
  }
};

StructureController.prototype.updateUpgradeTime = function () {
  this.memory.lastUpgradeTime = Game.time;
};
