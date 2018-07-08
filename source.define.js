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

Object.defineProperty(Source.prototype, 'isAtFullCapacity', {
  configurable: true,
  get: function () {
    if (_.isUndefined(this._isAtFullCapacity)) {
      if (_.isUndefined(this.memory.capacity)) {
        let capacity = 0;
        _.forEach([this.pos.x - 1, this.pos.x, this.pos.x + 1], x => {
          _.forEach([this.pos.y - 1, this.pos.y, this.pos.y + 1], y => {
            if (Game.map.getTerrainAt(x, y, this.pos.roomName) !== TERRAIN_WALL) {
              capacity++;
            }
          }, this);
        }, this);

        this.memory.capacity = capacity;
      }

      this._isAtFullCapacity = _.size(_.filter(this.links, {type: LINK_HARVESTER})) >= this.memory.capacity;
    }

    return this._isAtFullCapacity;
  }
});

Object.defineProperty(Source.prototype, 'links', {
  configurable: true,
  get: function () {
    if (_.isUndefined(this._links)) {
      this.memory.links = this.memory.links || [];
      this._links = this.memory.links;
    }

    return this._links;
  },
  set: function (value) {
    this.memory.links = this.memory.links || [];

    const link = _.find(this.memory.links, {id: value.id});

    if (_.isUndefined(link)) {
      this.memory.links.push(value);
    }
  }
});

Object.defineProperty(Source.prototype, 'hasDepot', {
  configurable: true,
  get: function () {
    if (_.isUndefined(this._hasDepot)) {
      this.memory.hasDepot = !_.isUndefined(_.find(this.links, {type: LINK_DEPOT}));
      this._hasDepot = this.memory.hasDepot;
    }

    return this._hasDepot;
  }
});
