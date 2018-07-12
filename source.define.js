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

Object.defineProperty(Source.prototype, 'isEmpty', {
  configurable: true,
  get: function () {
    if (!this._isEmpty) {
      this._isEmpty = this.energy === 0;
    }

    return this._isEmpty;
  }
});

Object.defineProperty(Source.prototype, 'isAtFullCapacity', {
  configurable: true,
  get: function () {
    if (!this._isAtFullCapacity) {
      if (!this.memory.maxCapacity) {
        let capacity = 0;
        _.forEach([this.pos.x - 1, this.pos.x, this.pos.x + 1], x => {
          _.forEach([this.pos.y - 1, this.pos.y, this.pos.y + 1], y => {
            if (Game.map.getTerrainAt(x, y, this.pos.roomName) !== TERRAIN_WALL) {
              capacity++;
            }
          }, this);
        }, this);

        this.memory.maxCapacity = capacity;
        this.memory.ticksToUpdate = 0;
      }

      if (this.memory.ticksToUpdate === 0) {
        const linkedHarvesters = _.filter(Game.creeps, creep => !!_.find(creep.links, {
          type: LINK.HARVESTER,
          id: this.id
        }));
        const totalWorkParts = _.sum(linkedHarvesters, creep => _.size(_.filter(creep.body, 'type', WORK)));

        this.memory.harvestedPerTick = totalWorkParts * HARVEST_POWER;
        this.memory.capacity = _.size(linkedHarvesters);
        this.memory.ticksToUpdate = 10;
      } else {
        --this.memory.ticksToUpdate;
      }

      this._isAtFullCapacity = this.memory.capacity === this.memory.maxCapacity || this.memory.harvestedPerTick >= MAX_HARVEST_POWER;
    }

    return this._isAtFullCapacity;
  }
});
