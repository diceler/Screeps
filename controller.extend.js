StructureController.prototype.tick = function () {
  const allSourcesAtFullCapacity = _.every(this.room.sources, sourceId => Game.getObjectById(sourceId).isAtFullCapacity);

  if (this.ticksToDowngrade <= 1000 || allSourcesAtFullCapacity) {
    const hasUpgraders = _.some(Game.creeps, creep => !!_.find(creep.links, {
      type: LINK.UPGRADER,
      id: this.id
    }));

    if (!hasUpgraders) {
      this.placeRequest({
        type: REQUEST.UPGRADER,
        objectId: this.id,
      });
    }
  }
};
