'use strict';

Room.prototype.loop = function () {
  this.sources;
};

Room.prototype.createSpawnRequest = function (role, memory) {
  if (!role || !_.isObject(memory)) {
    console.log('ERR', `Can't create spawn request for ${role} in ${this.name}`);
    return ERR_INVALID_ARGS;
  }

  this.memory.spawnQueue = this.memory.spawnQueue || [];

  this.memory.spawnQueue.push({
    role,
    memory,
    base: this.name,
    priority: SPAWN_PRIORITY[role],
  });
};
