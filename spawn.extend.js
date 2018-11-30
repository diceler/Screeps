Spawn.prototype.tick = function () {
  if (this.spawning || this.room.energyAvailable < 200) {
    return;
  }

  if (_.size(this.room.memory.spawnQueue)) {
    const request = this.room.memory.spawnQueue.sort((a, b) => a - b).shift();
    const {role, memory} = request;

    // If the creep couldn't be created due to lack of resources, add it to the queue again.
    if (this.spawnCreep(role, memory) === ERR_NOT_ENOUGH_RESOURCES) {
      this.room.memory.spawnQueue.push(request);
    }
  }
};

Spawn.prototype.__spawnCreep = Spawn.prototype.spawnCreep;
Spawn.prototype.spawnCreep = function (role, memory) {
  const body = this.getCreepBody(role);

  if (!body) {
    return ERR_NOT_ENOUGH_RESOURCES;
  }

  return this.__spawnCreep(body, `${role.substring(5)}_${Game.time}`, {memory});
};

Spawn.prototype.getCreepBody = function (role) {
  let rcl = this.room.controller.level;
  let body = CREEP_BODY[role](rcl);

  while (rcl > 0 && !this.canCreateCreep(body)) {
    body = rcl > 0 ? CREEP_BODY[role](--rcl) : undefined;
  }

  return body;
};

Spawn.prototype.canCreateCreep = function (body) {
  return _.sum(_.map(body, bodyPart => BODYPART_COST[bodyPart])) <= this.room.energyAvailable;
};
