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

Object.defineProperty(Room.prototype, 'isBeingAttacked', {
  configurable: true,
  get: function () {
    if (!this._isBeingAttacked) {
      if (!this.memory.isBeingAttacked) {
        this.memory.isBeingAttacked = this.find(FIND_HOSTILE_CREEPS).length > 0;
      }

      this._isBeingAttacked = this.memory.isBeingAttacked;
    }

    return this._isBeingAttacked;
  }
});
