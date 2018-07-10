Room.prototype.loop = function () {
  if (this.sources) {
    _.forEach(this.sources, sourceId => {
      Game.getObjectById(sourceId).tick();
    });
  }
};
