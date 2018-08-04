Object.defineProperty(Creep.prototype, 'isFull', {
  configurable: true,
  get: function () {
    return _.sum(this.carry) === this.carryCapacity;
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
