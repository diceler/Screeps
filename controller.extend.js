StructureController.prototype.tick = function () {
  if (this.ticksToDowngrade <= 1000) {
    const hasUpgraders = _.some(Game.creeps, creep => !_.isUndefined(_.find(creep.links, {
      type: LINK.UPGRADER,
      id: this.id
    })));

    if (!hasUpgraders) {
      this.placeRequest({
        type: REQUEST.UPGRADER,
        objectId: this.id,
      });
    }
  }
};
