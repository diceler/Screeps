Object.defineProperty(Source.prototype, 'memory', {
  configurable: true,
  get: function () {
    if (!Memory.sources) {
      Memory.sources = {};
    }

    if (!_.isObject(Memory.sources)) {
      return undefined;
    }

    return Memory.sources[this.id] = Memory.sources[this.id] || {};
  },
  set: function (value) {
    if (!Memory.sources) {
      Memory.sources = {};
    }

    if (!_.isObject(Memory.sources)) {
      throw new Error('Could not set source memory');
    }

    Memory.sources[this.id] = value;
  }
});

Object.defineProperty(Source.prototype, 'slots', {
  configurable: true,
  get: function () {
    if (!this._slots) {
      if (!this.memory.slots) {
        let slots = 0;
        _.forEach([this.pos.x - 1, this.pos.x, this.pos.x + 1], x => {
          _.forEach([this.pos.y - 1, this.pos.y, this.pos.y + 1], y => {
            if (Game.map.getTerrainAt(x, y, this.pos.roomName) !== TERRAIN_WALL) {
              slots++;
            }
          }, this);
        }, this);

        this.memory.slots = slots;
      }

      this._slots = this.memory.slots;
    }

    return this._slots;
  }
});
