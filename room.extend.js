'use strict';

Room.prototype.loop = function () {
  // Check if unoccupiedSources need harvesters.
  const unoccupiedSources = _.filter(this.sources, {occupied: false});

  if (_.size(unoccupiedSources)) {
    _.forEach(unoccupiedSources, source => {
      this.requestCreep(source.id, ROLE_HARVESTER, {sourceId: source.id});
    });
  } else {
    // Check if controller in room has sufficient upgraders.
    if (!this.controller.hasSufficientUpgraders) {
      this.requestCreep(this.name, ROLE_UPGRADER);
    }

    // Check if room has enough builders.
    const constructionSitesInRoom = _.filter(Game.constructionSites, 'room.name', this.name);

    if (_.size(constructionSitesInRoom)) {
      const totalCost = _.sum(constructionSitesInRoom, 'progressTotal');
      const totalBuildersInRoom = _.size(this.creeps[ROLE_BUILDER]);
      const tooHighCost = (totalCost / MAX_COST_PER_BUILDER) > totalBuildersInRoom;
      const tooManySites = (_.size(constructionSitesInRoom) / MAX_CS_PER_BUILDER) > totalBuildersInRoom;
      const notEnoughBuilders = tooHighCost || tooManySites;

      if (notEnoughBuilders) {
        this.requestCreep(this.name, ROLE_BUILDER);
      }
    }

    // Spawn Fillers if Room.storage exists.
    if (this.controller.level >= 4) {
      if (this.storage) {
        const fillersInRoom = _.size(this.creeps[ROLE_FILLER]);

        if (!fillersInRoom) {
          this.requestCreep(this.name, ROLE_FILLER);
        }
      }
    }
  }

  // TODO: Loop through containers and run their .tick.
};

Room.prototype.requestCreep = function (requesterId, role, memory = {}) {
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
      created: Game.time, // Not used for anything atm.
    });

    return OK;
  }

  return ERR_NAME_EXISTS;
};
