'use strict';

Room.prototype.loop = function () {
  // Check if sources need harvesters.
  const sources = this.sources.map(sourceId => getObjectById(sourceId)).filter(source => !source.occupied);

  if (_.size(sources)) {
    _.forEach(sources, source => {
      this.createSpawnRequest(source.id, ROLE_HARVESTER, {sourceId: source.id});
    });
  } else {
    // If all sources are occupied, check if the Controller needs upgraders.
    if (this.controller.ticksSinceUpgrade >= CONTROLLER_LAST_UPGRADED_LIMIT || !this.controller.sufficientUpgraders) {
      this.createSpawnRequest(this.controller.id, ROLE_UPGRADER);
    }
  }
};

Room.prototype.createSpawnRequest = function (requesterId, role, memory = {}) {
  if (!requesterId || !role || !_.isObject(memory)) {
    console.log('ERR', `Can't create spawn request for ${role} in ${this.name}`);
    return ERR_INVALID_ARGS;
  }

  this.memory.spawnQueue = this.memory.spawnQueue || [];

  if (!_.some(this.memory.spawnQueue, {requesterId})) {
    this.memory.spawnQueue.push({
      requesterId,
      role,
      memory: _.assign({}, memory, {base: this.name, role}),
      priority: SPAWN_PRIORITY[role],
      created: Game.time,
    });

    return OK;
  }

  return ERR_NAME_EXISTS;
};
