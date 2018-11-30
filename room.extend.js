'use strict';

Room.prototype.loop = function () {
  _.forEach(this.sources, sourceId => {
    const source = getObjectById(sourceId);

    if (!source.occupied) {
      this.createSpawnRequest(sourceId, ROLE_HARVESTER, {sourceId});
    }
  });
};

Room.prototype.createSpawnRequest = function (requesterId, role, memory) {
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
