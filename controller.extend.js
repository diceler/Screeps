'use strict';

StructureController.prototype.tick = function () {
  if (!this.hasSufficientUpgraders) {
    this.room.createSpawnRequest(this.id, ROLE_UPGRADER);
  }
};
