Spawn.prototype.tick = function () {
  if (this.room.energyAvailable < 200) {
    return;
  }

  const request = this.requests.next();

  if (request) {
    let role;

    switch (request.type) {
      case REQUEST_HARVESTER:
        role = ROLE_HARVESTER;
        break;
      default:
        role = undefined;
        break;
    }

    if (role) {
      this.spawnCreep(role, {
        role,
        linkTo: request.targetId,
      });
    }
  }
};

Spawn.prototype.__spawnCreep = Spawn.prototype.spawnCreep;
Spawn.prototype.spawnCreep = function (role, memory) {
  const body = this.getCreepBody(role);

  if (!body) {
    return ERR_NOT_ENOUGH_RESOURCES;
  }

  return this.__spawnCreep(body, `${role}_${Game.time}`, {memory});
};

Spawn.prototype.getCreepBody = function (role) {
  let rcl = this.room.controller.level;
  let body = this.bodyTypes[role](rcl);

  while (rcl > 0 && !this.canCreateCreep(body)) {
    body = rcl > 0 ? this.bodyTypes[role](--rcl) : undefined;
  }

  return body;
};

Spawn.prototype.canCreateCreep = function (body) {
  return _.sum(_.map(body, bodyPart => BODYPART_COST[bodyPart])) <= this.room.energyAvailable;
};

Spawn.prototype.bodyTypes = {
  [ROLE_UPGRADER]: rcl => {
    switch (rcl) {
      case 1:
        return workerUnitBuild(2, 1, 1);
      case 2:
        return workerUnitBuild(2, 4, 2);
      case 3:
        return workerUnitBuild(4, 6, 2);
      case 4:
        return workerUnitBuild(5, 10, 5);
      default:
        return workerUnitBuild(10, 10, 5);
    }
  },
  [ROLE_BUILDER]: rcl => {
    switch (rcl) {
      case 1:
        return workerUnitBuild(1, 2, 1);
      case 2:
        return workerUnitBuild(2, 4, 2);
      case 3:
        return workerUnitBuild(4, 6, 2);
      default:
        return workerUnitBuild(5, 10, 5);
    }
  },
  [ROLE_HARVESTER]: rcl => {
    switch (rcl) {
      case 1:
      case 2:
        return workerUnitBuild(1, 1, 1);
      default:
        return workerUnitBuild(5, 1, 5);
    }
  },
  [ROLE_HAULER]: rcl => {
    switch (rcl) {
      case 1:
      case 2:
        return workerUnitBuild(0, 4, 2);
      default:
        return workerUnitBuild(0, 8, 8);
    }
  },
};

function workerUnitBuild(workParts, carryParts, moveParts) {
  function addBodyParts(part, amount) {
    let partialBody = [];
    let increment = 0;

    if (amount === 0) {
      return partialBody;
    }

    while (increment < amount) {
      partialBody.push(part);
      increment++;
    }

    return partialBody;
  }

  return _.flatten([addBodyParts(WORK, workParts), addBodyParts(CARRY, carryParts), addBodyParts(MOVE, moveParts)]);
}
