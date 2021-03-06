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
      const linkedCreeps = _.filter(Game.creeps, {room: {name: this.room.name}, memory: {sourceId: this.id}});
      const totalWorkParts = _.sum(linkedCreeps, creep => _.size(_.filter(creep.body, 'type', WORK)));
      const harvestPower = totalWorkParts * HARVEST_POWER;
      this._occupied = (_.size(linkedCreeps) >= this.slots || harvestPower >= MAX_HARVEST_POWER);
      // this._occupied = _.some(Game.creeps, {room: {name: this.room.name}, memory: {role: ROLE_HARVESTER, sourceId: this.id}});
    }

    return this._occupied;
  }
});

Object.defineProperty(Source.prototype, 'container', {
  configurable: true,
  get: function () {
    if (!this._container) {
      if (!this.memory.containerId) {
        const containers = _.filter(this.room.structures, 'structureType', STRUCTURE_CONTAINER);

        if (_.size(containers)) {
          const container = _.find(containers, ({pos}) => pos.isNearTo(this.pos));

          if (container) {
            this.memory.containerId = container.id;
            container.isWithdrawOnly = true;
          }
        }
      }

      this._container = getObjectById(this.memory.containerId);
    }

    return this._container;
  }
});
