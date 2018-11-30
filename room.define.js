'use strict';

Object.defineProperty(Room.prototype, 'sources', {
  configurable: true,
  get: function () {
    if (!this._sources) {
      if (!this.memory.sources) {
        this.memory.sources = this.find(FIND_SOURCES).map(source => source.id);
      }

      this._sources = this.memory.sources;
    }

    return this._sources;
  }
});
