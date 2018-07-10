Source.prototype.tick = function () {
  if (!this.isAtFullCapacity) {
    this.placeRequest({
      type: REQUEST.HARVESTER,
      objectId: this.id,
    });
  }
};

Source.prototype.__linkTo = Source.prototype.linkTo;
Source.prototype.linkTo = function (target, type) {
  if (Source.prototype.__linkTo(target, type) === OK) {
    this.memory.capacity = this.memory.capacity - 1;
  }
};
