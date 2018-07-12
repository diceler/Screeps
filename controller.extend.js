StructureController.prototype.tick = function () {
  const allSourcesGettingHarvested = _.every(this.room.sources, sourceId => Game.getObjectById(sourceId).hasHarvester);

  if ((allSourcesGettingHarvested || this.ticksToDowngrade <= 1000) && !this.hasUpgrader) {
    this.placeRequest({
      type: REQUEST.UPGRADER,
      objectId: this.id,
    });
  }
};
