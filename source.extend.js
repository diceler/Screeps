Source.prototype.tick = function () {
  if (!this.isAtFullCapacity) {
    this.placeRequest({
      type: REQUEST.HARVESTER,
      objectId: this.id,
    });
  }
};
