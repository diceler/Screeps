Object.defineProperty(Structure.prototype, 'memory', {
  configurable: true,
  get: function () {
    if (_.isUndefined(Memory.structures)) {
      Memory.structures = {};
    }

    if (!_.isObject(Memory.structures)) {
      return undefined;
    }

    return Memory.structures[this.id] = Memory.structures[this.id] || {};
  },
  set: function (value) {
    if (_.isUndefined(Memory.structures)) {
      Memory.structures = {};
    }

    if (!_.isObject(Memory.structures)) {
      throw new Error('Could not set structure memory');
    }

    Memory.structures[this.id] = value;
  }
});

Object.defineProperty(Structure.prototype, 'isFull', {
  configurable: true,
  get: function () {
    if (_.isUndefined(this._isFull)) {
      if (_.isUndefined(this.store)) {
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
    if (_.isUndefined(this._isEmpty)) {
      if (_.isUndefined(this.store)) {
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
    if (_.isUndefined(this._isWithdrawOnly)) {
      if (_.isUndefined(this.memory.isWithdrawOnly)) {
        this.memory.isWithdrawOnly = false;
      }

      this._isWithdrawOnly = this.memory.isWithdrawOnly;
    }

    return this._isWithdrawOnly;
  },
  set: function (isWithdrawOnly) {
    this.memory.isWithdrawOnly = isWithdrawOnly;
    this._isWithdrawOnly = this.memory.isWithdrawOnly;
  }
});

Object.defineProperty(Structure.prototype, 'links', {
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
