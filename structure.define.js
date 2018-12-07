'use strict';

Object.defineProperty(Structure.prototype, 'memory', {
  configurable: true,
  get: function () {
    if (!Memory.structures) {
      Memory.structures = {};
    }

    if (!_.isObject(Memory.structures)) {
      return undefined;
    }

    return Memory.structures[this.id] = Memory.structures[this.id] || {};
  },
  set: function (value) {
    if (!Memory.structures) {
      Memory.structures = {};
    }

    if (!_.isObject(Memory.structures)) {
      throw new Error('Could not set structure memory');
    }

    Memory.structures[this.id] = value;
  }
});

Object.defineProperty(Structure.prototype, 'rclHitsMin', {
  configurable: true,
  get: function () {
    if (this.structureType === STRUCTURE_WALL) {
      switch (this.room.controller.level) {
        case 2:
          return 10000;
        case 3:
          return 50000;
        case 4:
          return 100000;
        case 5:
          return 500000;
        default:
          return 1000000;
      }
    } else {
      return this.hitsMax
    }
  }
});

Object.defineProperty(Structure.prototype, 'storesEnergy', {
  configurable: true,
  get: function () {
    if (!this._storesEnergy) {
      if (!this.storeCapacity) {
        this._storesEnergy = !!this.energyCapacity;
      } else {
        this._storesEnergy = true;
      }
    }

    return this._storesEnergy;
  }
});

Object.defineProperty(Structure.prototype, 'isFull', {
  configurable: true,
  get: function () {
    if (!this._isFull) {
      if (!this.storeCapacity) {
        this._isFull = this.energy === this.energyCapacity;
      } else {
        this._isFull = _.sum(this.store) === this.storeCapacity;
      }
    }

    return this._isFull;
  }
});

Object.defineProperty(Structure.prototype, 'isEmpty', {
  configurable: true,
  get: function () {
    if (!this._isEmpty) {
      if (!this.storeCapacity) {
        this._isEmpty = this.energy === 0;
      } else {
        this._isEmpty = _.sum(this.store) === 0;
      }
    }

    return this._isEmpty;
  }
});
