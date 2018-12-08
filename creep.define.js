'use strict';

Object.defineProperty(Creep.prototype, 'isFull', {
  configurable: true,
  get: function () {
    // Some creeps are spawned without CARRY parts.
    return this.carryCapacity > 0 ? _.sum(this.carry) === this.carryCapacity : false;
  }
});

Object.defineProperty(Creep.prototype, 'isEmpty', {
  configurable: true,
  get: function () {
    return _.sum(this.carry) === 0;
  }
});

Object.defineProperty(Creep.prototype, 'isFatigued', {
  configurable: true,
  get: function () {
    return this.fatigue > 0;
  }
});

Object.defineProperty(Creep.prototype, 'role', {
  configurable: true,
  get: function () {
    if (!this._role) {
      this._role = new roles[this.memory.role](this);
    }

    return this._role;
  },
  set: function (value) {
    this.memory.role = value;
  }
});
