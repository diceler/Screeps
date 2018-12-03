'use strict';

Object.defineProperty(ConstructionSite.prototype, 'memory', {
  configurable: true,
  get: function () {
    if (!Memory.constructionSite) {
      Memory.constructionSite = {};
    }

    if (!_.isObject(Memory.constructionSite)) {
      return undefined;
    }

    return Memory.constructionSite[this.id] = Memory.constructionSite[this.id] || {};
  },
  set: function (value) {
    if (!Memory.constructionSite) {
      Memory.constructionSite = {};
    }

    if (!_.isObject(Memory.constructionSite)) {
      throw new Error('Could not set structure memory');
    }

    Memory.constructionSite[this.id] = value;
  }
});

Object.defineProperty(ConstructionSite.prototype, 'created', {
  configurable: true,
  get: function () {
    if (!this._created) {
      if (!this.memory.created) {
        this.memory.created = Game.tick - 1; // Set 'created' to 1 tick ago due to tick life cycle.
      }

      this._created = this.memory.created;
    }

    return this._created;
  }
});

Object.defineProperty(ConstructionSite.prototype, 'ticksSinceProgress', {
  configurable: true,
  get: function () {
    return Game.time - (this.memory.lastProgressTime || this.created);
  }
});
