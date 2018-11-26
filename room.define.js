Object.defineProperty(Room.prototype, 'sources', {
  configurable: true,
  get: function () {
    if (!this._sources) {
      if (!Memory.sources) {
        Memory.sources = {};
        const sources = _.map(this.find(FIND_SOURCES), source => source.id);
        _.forEach(sources, sourceId => {
          Memory.sources[sourceId] = {
            roomName: this.name,
          };
        });
      }

      this._sources = _.filter(Object.keys(Memory.sources), sourceId => Memory.sources[sourceId].roomName === this.name);
    }

    return this._sources;
  }
});
