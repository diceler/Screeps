const Harvester = require('role.harvester');

Creep.prototype.loop = function () {
  if (this.spawning) {
    return;
  }

  switch (this.memory.role) {
    case ROLE.HARVESTER:
      Harvester.tick(this);
      break;
    default:
      break;
  }
};

Creep.prototype.__moveTo = Creep.prototype.moveTo;
Creep.prototype.moveTo = function (target, options) {
  if (this.isFatigued) {
    return ERR_TIRED;
  }

  const pathLength = _.size(_.get(this.memory._move, 'path', null));

  const opts = _.assign({
    reusePath: this.isStuck ? 0 : pathLength,
    noPathFinding: !this.isStuck && pathLength > 0,
  }, options);

  this.__moveTo(target, opts);
};
