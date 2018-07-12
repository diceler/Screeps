const Harvester = require('role.harvester');

Creep.prototype.loop = function () {
  if (this.spawning) {
    if (this.memory.linkTo) {
      const target = Game.getObjectById(this.memory.linkTo.objectId);

      if (this.linkTo(target, this.memory.linkTo.type) === OK) {
        delete this.memory.linkTo;
      }
    }

    return;
  }

  if (this.ticksToLive === 1) {
    this.unlinkAll();
    this.deleteMyRequests();
  }

  switch (this.memory.role) {
    case ROLE.HARVESTER:
      Harvester.tick(this);
      break;
    default:
      break;
  }
};
