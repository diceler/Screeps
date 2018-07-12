Object.defineProperty(Room.prototype, 'constructionSites', {
  configurable: true,
  get: function () {
    if (!this._constructionSites) {
      this._constructionSites = _.groupBy(_.filter(Game.constructionSites, {room: {name: this.name}}), 'structureType');
    }

    return this._constructionSites;
  }
});

Object.defineProperty(Room.prototype, 'structures', {
  configurable: true,
  get: function () {
    if (!this._structures) {
      this._structures = _.groupBy(this.find(FIND_STRUCTURES), 'structureType');
    }

    return this._structures;
  }
});

Object.defineProperty(Room.prototype, 'creeps', {
  configurable: true,
  get: function () {
    if (!this._creeps) {
      this._creeps = _.groupBy(_.filter(Game.creeps, {room: {name: this.name}}), 'memory.role');
    }

    return this._creeps;
  }
});

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
