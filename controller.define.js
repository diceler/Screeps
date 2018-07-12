Object.defineProperty(StructureController.prototype, 'hasEnoughProgressForRcl', {
  configurable: true,
  get: function () {
    let requiredProgress = 0;

    switch (this.level) {
      case 1:
      case 2:
        requiredProgress = 4;
        break;
      case 3:
        requiredProgress = 8;
        break;
      default:
        requiredProgress = 15;
        break;
    }

    const linkedUpgraders = _.filter(Game.creeps, creep => !_.isUndefined(_.find(creep.links, {
      type: LINK.UPGRADER,
      id: this.id
    })));
    const totalWorkParts = _.sum(linkedUpgraders, creep => _.size(_.filter(creep.body, 'type', WORK)));

    return totalWorkParts >= requiredProgress;
  }
});
