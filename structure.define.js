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

// Minimum hits a Structure should have at different levels.
Object.defineProperty(Structure.prototype, 'rclHitsMin', {
  configurable: true,
  get: function () {
    if (this.structureType === STRUCTURE_WALL || this.structureType === STRUCTURE_RAMPART) {
      switch (this.room.controller.level) {
        case 2:
          return WALL_RCL_2_HITS_MIN;
        case 3:
          return WALL_RCL_3_HITS_MIN;
        case 4:
          return WALL_RCL_4_HITS_MIN;
        case 5:
          return WALL_RCL_5_HITS_MIN;
        default:
          return WALL_RCL_6_HITS_MIN;
      }
    }

    return this.hitsMax;
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

Object.defineProperty(Structure.prototype, 'storage', {
  configurable: true,
  get: function () {
    if (!this._storage) {
      this._storage = this.storeCapacity ? _.sum(this.store) : this.energy;
    }

    return this._storage;
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

Object.defineProperty(Structure.prototype, 'isWithdrawOnly', {
  configurable: true,
  get: function () {
    return this.memory.withdrawOnly || false;
  },
  set: function (value) {
    this.memory.withdrawOnly = value;
  }
});
