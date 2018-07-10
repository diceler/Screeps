Room.prototype.loop = function () {
  if (this.sources) {
    _.forEach(Object.keys(this.sources), sourceId => {
      Game.getObjectById(sourceId).tick();
    });
  }
};
