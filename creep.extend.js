Creep.prototype.loop = function () {
  if (this.spawning) {
    return;
  }

  this.role.tick();
};

Creep.prototype.__upgradeController = Creep.prototype.upgradeController;
Creep.prototype.upgradeController = function (target) {
  if (target instanceof StructureController) {
    target.updateUpgradeTime();
    return this.__upgradeController(target);
  }

  return ERR_INVALID_TARGET;
};
