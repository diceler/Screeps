'use strict';

Object.defineProperty(Room.prototype, 'sources', {
  configurable: true,
  get: function () {
    if (!this._sources) {
      if (!this.memory.sources) {
        this.memory.sources = _.map(this.find(FIND_SOURCES), 'id');
      }

      this._sources = this.memory.sources.map(id => Game.getObjectById(id));
    }

    return this._sources;
  }
});

Object.defineProperty(Room.prototype, 'containers', {
  configurable: true,
  get: function () {
    if (!this._containers) {
      if (Game.time % 500 === 0 || !this.memory.containers) {
        this.memory.containers = _.map(this.find(FIND_STRUCTURES, {filter: ({structureType}) => structureType === STRUCTURE_CONTAINER}), 'id');
      }

      this._containers = this.memory.containers.map(id => Game.getObjectById(id));
    }

    return this._containers;
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
