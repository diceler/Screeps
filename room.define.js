Object.defineProperty(Room.prototype, 'constructionSites', {
  configurable: true,
  get: function () {
    if (_.isUndefined(this._constructionSites)) {
      this._constructionSites = _.groupBy(_.filter(Game.constructionSites, {room: {name: this.name}}), 'structureType');
    }

    return this._constructionSites;
  }
});

Object.defineProperty(Room.prototype, 'structures', {
  configurable: true,
  get: function () {
    if (_.isUndefined(this._structures)) {
      this._structures = _.groupBy(this.find(FIND_STRUCTURES), 'structureType');
    }

    return this._structures;
  }
});

Object.defineProperty(Room.prototype, 'creeps', {
  configurable: true,
  get: function () {
    if (_.isUndefined(this._creeps)) {
      this._creeps = _.groupBy(_.filter(Game.creeps, {room: {name: this.name}}), 'memory.role');
    }

    return this._creeps;
  }
});
