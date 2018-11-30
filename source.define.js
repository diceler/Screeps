'use strict';

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
        const terrain = Game.map.getRoomTerrain(this.room.name);
        let slots = 0;
        _.forEach([this.pos.x - 1, this.pos.x, this.pos.x + 1], x => {
          _.forEach([this.pos.y - 1, this.pos.y, this.pos.y + 1], y => {
            if (terrain.get(x, y) !== TERRAIN_MASK_WALL) {
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

Object.defineProperty(Source.prototype, 'occupied', {
  configurable: true,
  get: function () {
    if (!this._occupied) {
      const creepsInRoom = _.filter(Game.creeps, {room: {name: this.room.name}});
      const linkedCreeps = _.filter(creepsInRoom, creep => _.some(creep.links, {id: this.id}));
      const totalWorkParts = _.sum(linkedCreeps, creep => _.size(_.filter(creep.body, 'type', WORK)));
      const harvestPower = totalWorkParts * HARVEST_POWER;
      this._occupied = (_.size(linkedCreeps) >= this.slots || harvestPower >= MAX_HARVEST_POWER);
    }

    return this._occupied;
  }
});
