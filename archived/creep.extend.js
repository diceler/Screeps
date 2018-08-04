const Harvester = require('role.harvester');
const Upgrader = require('role.upgrader');

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
    this.deleteRequests();
  }

  switch (this.memory.role) {
    case ROLE.HARVESTER:
      Harvester.tick(this);
      break;
    case ROLE.UPGRADER:
      Upgrader.tick(this);
      break;
    default:
      break;
  }
};
