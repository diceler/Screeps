Object.defineProperty(StructureController.prototype, 'hasUpgrader', {
  configurable: true,
  get: function () {
    if (!this._hasUpgrader) {
      this._hasUpgrader= _.some(Game.creeps, creep => !!_.find(creep.links, {
        type: LINK.UPGRADER,
        id: this.id
      }));
    }

    return this._hasUpgrader;
  }
});

Object.defineProperty(StructureController.prototype, 'hasStorage', {
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
