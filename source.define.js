Object.defineProperty(Source.prototype, 'memory', {
  configurable: true,
  get: function () {
    if (_.isUndefined(Memory.sources)) {
      Memory.sources = {};
    }

    if (!_.isObject(Memory.sources)) {
      return undefined;
    }

    return Memory.sources[this.id] = Memory.sources[this.id] || {};
  },
  set: function (value) {
    if (_.isUndefined(Memory.sources)) {
      Memory.sources = {};
    }

    if (!_.isObject(Memory.sources)) {
      throw new Error('Could not set source memory');
    }

    Memory.sources[this.id] = value;
  }
});

Object.defineProperty(Source.prototype, 'isEmpty', {
  configurable: true,
  get: function () {
    if (_.isUndefined(this._isEmpty)) {
      this._isEmpty = this.energy === 0;
    }

    return this._isEmpty;
  }
});
