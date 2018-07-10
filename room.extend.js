Room.prototype.loop = function () {
  if (Memory.sources) {
    _.forEach(Object.keys(Memory.sources), sourceId => {
      Game.getObjectById(sourceId).tick();
    });
  } else {
    Memory.sources = {};
    const sources = _.map(this.find(FIND_SOURCES), source => source.id);
    _.forEach(sources, sourceId => {
      Memory.sources[sourceId] = {};
    });
  }
};
