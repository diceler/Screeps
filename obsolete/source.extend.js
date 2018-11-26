Source.prototype.tick = function () {
  if (!this.hasHarvester) {
    this.placeRequest({
      type: REQUEST.HARVESTER,
      objectId: this.id,
    });
  }
};
