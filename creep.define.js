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

Object.defineProperty(Creep.prototype, 'isStuck', {
  configurable: true,
  get: function () {
    // Set defaults
    this.memory.isStuck = this.memory.isStuck || false;
    this.memory.stuckCount = this.memory.stuckCount || 0;
    this.memory.lastPos = this.memory.lastPos || this.pos;

    // Set values
    this.memory.stuckCount = this.pos.sameAs(this.memory.lastPos) ? this.memory.stuckCount + 1 : 0;
    this.memory.isStuck = this.memory.stuckCount === MAX_STUCK;

    return this.memory.isStuck;
  }
});

Object.defineProperty(Creep.prototype, 'links', {
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
