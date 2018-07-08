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
  const pathLength = _.size(this.memory._move.path);

  const opts = _.assign({
    reusePath: this.isStuck ? 0 : pathLength,
    noPathFinding: !this.isStuck && pathLength > 0,
  }, options);

  this.__moveTo(target, opts);
};

Creep.prototype.linkTo = function (target, type) {
  if (!target) {
    return ERR_NOT_FOUND;
  }

  // Are we already linked?
  if (_.find(this.links, {id: target.id})) {
    return OK;
  }

  // Is target linkable?
  if (_.isUndefined(target.links)) {
    return ERR_INVALID_ARGS;
  }

  // Link target to me
  this.links = {type, id: target.id};
  // Link me to target
  target.links = {type, id: this.id};

  return OK;
};

Creep.prototype.unlink = function (target) {
  if (!target || !_.find(this.links, {id: target.id})) {
    return ERR_NOT_FOUND;
  }

  // Is target linkable?
  if (_.isUndefined(target.links)) {
    return ERR_INVALID_ARGS;
  }

  // Unlink target from me
  this.memory.links = _.reject(this.links, {id: target.id});
  // Unlink me from target
  target.memory.links = _.reject(target.links, {id: this.id});

  return OK;
};
