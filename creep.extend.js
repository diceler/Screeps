Creep.prototype.loop = function () {
  if (this.spawning) {
    return;
  }

  this.role.tick();
};

Creep.prototype.__upgradeController = Creep.prototype.upgradeController;
Creep.prototype.upgradeController = function (target) {
  if (target instanceof StructureController) {
    const actionResult = this.__upgradeController(target);

    if (actionResult === OK) {
      target.updateUpgradeTime();
    }

    return actionResult;
  }

  return ERR_INVALID_TARGET;
};
