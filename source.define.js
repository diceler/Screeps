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

Object.defineProperty(Source.prototype, 'hasHarvester', {
  configurable: true,
  get: function () {
    if (!this._hasHarvester) {
      this._hasHarvester= _.some(Game.creeps, creep => !!_.find(creep.links, {
        type: LINK.HARVESTER,
        id: this.id
      }));
    }

    return this._hasHarvester;
  }
});

Object.defineProperty(Source.prototype, 'hasStorage', {
  configurable: true,
  get: function () {
    if (!this._hasStorage) {
      let hasLinkedStorage = _.some(Game.structures, structure => !!_.find(structure.links, {
        type: LINK.STORAGE,
        id: this.id
      }));

      if (!hasLinkedStorage) {
        hasLinkedStorage = _.some(Game.constructionSites, constructionSite => !!_.find(constructionSite.links, {
          type: LINK.STORAGE,
          id: this.id
        }));
      }

      this._hasStorage = hasLinkedStorage;
    }

    return this._hasStorage;
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
      }

      const linkedHarvesters = _.filter(Game.creeps, creep => !_.isUndefined(_.find(creep.links, {
        type: LINK.HARVESTER,
        id: this.id
      })));
      const totalWorkParts = _.sum(linkedHarvesters, creep => _.size(_.filter(creep.body, 'type', WORK)));

      this.memory.harvestPerTick = totalWorkParts * HARVEST_POWER;
      this.memory.capacity = _.size(linkedHarvesters);
      this._isAtFullCapacity = this.memory.capacity >= this.memory.maxCapacity || this.memory.harvestPerTick >= MAX_HARVEST_POWER;
    }

    return this._isAtFullCapacity;
  }
});
