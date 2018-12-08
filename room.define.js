'use strict';

Object.defineProperty(Room.prototype, 'sources', {
  configurable: true,
  get: function () {
    if (!this._sources) {
      if (!this.memory.sources) {
        this.memory.sources = _.map(this.find(FIND_SOURCES), 'id');
      }

      this._sources = this.memory.sources.map(id => getObjectById(id));
    }

    return this._sources;
  }
});

Object.defineProperty(Room.prototype, 'hostiles', {
  configurable: true,
  get: function () {
    if (!this._hostiles) {
      this._hostiles = this.find(FIND_HOSTILE_CREEPS);
    }

    return this._hostiles;
  }
});

Object.defineProperty(Room.prototype, 'creeps', {
  configurable: true,
  get: function () {
    if (!this._creeps) {
      this._creeps = _.groupBy(_.filter(Game.creeps, 'memory.base', this.name), 'memory.role');
    }

    return this._creeps;
  }
});

Object.defineProperty(Room.prototype, 'structures', {
  configurable: true,
  get: function () {
    if (!this._structures) {
      if (Game.time % 100 === 0 || !this.memory.structures) {
        this.memory.structures = _.map(this.find(FIND_STRUCTURES), 'id');
      }

      this._structures = this.memory.structures.map(id => getObjectById(id));
    }

    return this._structures;
  }
});
