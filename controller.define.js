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
