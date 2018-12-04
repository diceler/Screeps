'use strict';

Room.prototype.loop = function () {
  // Check if unoccupiedSources need harvesters.
  const unoccupiedSources = _.filter(this.sources, {occupied: false});

  if (_.size(unoccupiedSources)) {
    _.forEach(unoccupiedSources, source => {
      this.createSpawnRequest(source.id, ROLE_HARVESTER, {sourceId: source.id});
    });
  }

  if (!this.controller.hasSufficientUpgraders) {
    this.createSpawnRequest(this.id, ROLE_UPGRADER);
  }

  if (this.find(FIND_CONSTRUCTION_SITES)) {
    if (!_.size(this.creeps[ROLE_BUILDER])) {
      this.createSpawnRequest(this.id, ROLE_BUILDER);
    }
  }

  // TODO: Loop through containers and run their .tick.
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
