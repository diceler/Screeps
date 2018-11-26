Creep.prototype.loop = function () {
  if (this.spawning) {
    if (this.memory.linkTo) {
      const {type, targetId} = this.memory.linkTo;
      const target = getObjectById(targetId);

      let linkType;

      switch (type) {
        case REQUEST_HARVESTER:
          linkType = LINK_ENERGY_SOURCE;
          break;
        default:
          linkType = undefined;
          break;
      }

      if (this.linkTo(target, linkType) === OK) {
        delete this.memory.linkTo;
      }
    }

    return;
  }

  if (this.isFatigued) {
    return;
  }

  if (this.ticksToLive === 1) {
    this.unlinkAll();
  }
};
