StructureController.prototype.tick = function () {
  const allSourcesAtFullCapacity = _.every(this.room.sources, sourceId => Game.getObjectById(sourceId).isAtFullCapacity);

  if (allSourcesAtFullCapacity || this.ticksToDowngrade <= 1000) {
    if (!this.hasEnoughProgressForRcl) {
      this.placeRequest({
        type: REQUEST.UPGRADER,
        objectId: this.id,
      });
    }
  }
};
