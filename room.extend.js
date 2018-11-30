'use strict';

Room.prototype.loop = function () {
  _.forEach(this.sources, sourceId => {
    const source = getObjectById(sourceId);

    if (!source.occupied) {
      this.createSpawnRequest(ROLE_HARVESTER, {sourceId}, sourceId);
    }
  });
};

Room.prototype.createSpawnRequest = function (role, memory, requesterId) {
  if (!role || !_.isObject(memory)) {
    console.log('ERR', `Can't create spawn request for ${role} in ${this.name}`);
    return ERR_INVALID_ARGS;
  }

  this.memory.spawnQueue = this.memory.spawnQueue || [];

  if (!_.find(this.memory.spawnQueue, {requesterId})) {
    this.memory.spawnQueue.push({
      requesterId,
      role,
      memory: _.assign({}, memory, {base: this.name}),
      priority: SPAWN_PRIORITY[role],
    });

    return OK;
  }

  return ERR_NAME_EXISTS;
};
