'use strict';

Room.prototype.loop = function () {
  // Check if unoccupiedSources need harvesters.
  const unoccupiedSources = _.filter(this.sources, {occupied: false});

  if (_.size(unoccupiedSources)) {
    _.forEach(unoccupiedSources, source => {
      this.createSpawnRequest(source.id, ROLE_HARVESTER, {sourceId: source.id});
    });
  } else {
    // Check if controller in room has sufficient upgraders.
    if (!this.controller.hasSufficientUpgraders) {
      this.createSpawnRequest(this.name, ROLE_UPGRADER);
    }

    // Check if room has enough builders.
    const constructionSitesInRoom = _.size(_.filter(Game.constructionSites, 'room.name', this.name));

    if (constructionSitesInRoom) {
      const notEnoughBuilders = (constructionSitesInRoom / 10) > _.size(this.creeps[ROLE_BUILDER]);

      if (notEnoughBuilders) {
        this.createSpawnRequest(this.name, ROLE_BUILDER);
      }
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

  if (!_.some(this.memory.spawnQueue, {requesterId, role})) {
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
