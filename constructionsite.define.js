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
